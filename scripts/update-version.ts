import semver from "semver";
import prompts from "prompts";
import fs from "fs";
import { exec } from "node:child_process";

const PACKAGE_JSON_PATH = "./package.json";

interface PackageJson {
  version: string;
  [key: string]: Record<string, unknown> | string;
}

const getPackageJson = (): PackageJson => {
  try {
    const packageJson = fs.readFileSync(PACKAGE_JSON_PATH, "utf-8");
    return JSON.parse(packageJson);
  } catch (error) {
    console.error(`Failed to read or parse ${PACKAGE_JSON_PATH}: ${error}`);
    process.exit(1);
  }
};

const writePackageJson = (packageJson: PackageJson): void => {
  try {
    fs.writeFileSync(
      PACKAGE_JSON_PATH,
      JSON.stringify(packageJson, null, 2) + "\n",
      "utf8",
    );
  } catch (error) {
    console.error(`Error writing to ${PACKAGE_JSON_PATH}: ${error}`);
    process.exit(1);
  }
};

const gitAdd = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(`git add ${PACKAGE_JSON_PATH}`, (error) => {
      if (error) {
        console.error(`Error adding ${PACKAGE_JSON_PATH} to Git: ${error}`);
        reject(new Error(`Failed to add ${PACKAGE_JSON_PATH} to git ${error}`));
        return;
      }

      console.log(`Staged ${PACKAGE_JSON_PATH} to Git`);
      resolve();
    });
  });
};

const gitCommit = async (version: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(`git commit -m "chore(release): v${version}"`, (error) => {
      if (error) {
        console.error(`Error committing version ${version}: ${error}`);
        reject(new Error(`Failed to commit version ${version}`));
        return;
      }

      console.log(`Committed version: v${version}`);
      resolve();
    });
  });
};

const gitTag = async (version: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(`git tag -a v${version} -m "v${version}"`, (error) => {
      if (error) {
        console.error(`Error tagging version ${version}: ${error}`);
        reject(new Error(`Failed to tag version ${version}`));
        return;
      }

      console.log(`Tagged version: v${version}`);
      resolve();
    });
  });
};

const generateChangelog = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(
      `git fetch --tags --prune --prune-tags && conventional-changelog -p angular -i CHANGELOG.md -s -r 0`,
      (error) => {
        if (error) {
          console.error(`Error generating changelog: ${error}`);
          reject(new Error(`Failed to generate changelog`));
          return;
        }

        console.log(`Generated changelog`);
        resolve();
      },
    );
  });
};

const gitAddChangelog = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(`git add CHANGELOG.md`, (error) => {
      if (error) {
        console.error(`Error adding CHANGELOG.md to Git: ${error}`);
        reject(new Error(`Failed to add CHANGELOG.md to git`));
        return;
      }

      console.log(`Staged CHANGELOG.md to Git`);
      resolve();
    });
  });
};

const gitPush = async (version: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(`git push origin main && git push origin v${version}`, (error) => {
      if (error) {
        console.error(`Error pushing version ${version}: ${error}`);
        reject(new Error(`Failed to push version ${version}`));
        return;
      }

      console.log(`Pushed commit and tag v${version} to GitHub`);
      resolve();
    });
  });
};

const main = async () => {
  const packageJson = getPackageJson();
  const currentVersion = packageJson.version;
  console.info(`Current project version: ${currentVersion}`);

  const args = process.argv.slice(2);
  let bumpType: "major" | "minor" | "patch" | undefined;

  if (args.length > 0) {
    const arg = args[0].toLowerCase();
    if (arg === "major" || arg === "minor" || arg === "patch") {
      bumpType = arg;
    } else {
      console.error(
        "Invalid argument provided. Please use 'major', 'minor', or 'patch'.",
      );
      process.exit(1);
    }
  }

  if (!bumpType) {
    const promptResponse = await prompts({
      type: "select",
      name: "bumpType",
      message: "What type of version bump would you like to do?",
      choices: [
        { title: "None", value: undefined },
        { title: "Patch", value: "patch" },
        { title: "Minor", value: "minor" },
        { title: "Major", value: "major" },
      ],
    });

    bumpType = promptResponse.bumpType;
  }

  if (bumpType) {
    const newVersion = semver.inc(currentVersion, bumpType);
    if (!newVersion) {
      console.error("❌ Could not increment the version");
      process.exit(1);
    }

    packageJson.version = newVersion;
    console.log(`Bumping version from ${currentVersion} to ${newVersion}`);
    writePackageJson(packageJson);

    try {
      await gitAdd();
      await generateChangelog();
      await gitAddChangelog();
      await gitCommit(newVersion);
      await gitTag(newVersion);
      await gitPush(newVersion);
      console.info(`✅ Successfully released version v${newVersion}`);
    } catch (error) {
      console.error(`Failed to complete release process: ${error}`);
      process.exit(1);
    }
  } else {
    console.info(
      `Version type not selected or provided. Version will not be bumped. Have a nice day.`,
    );
    process.exit(0);
  }
};

main().catch((error) => {
  console.error("An unexpected error occurred", error);
  process.exit(1);
});
