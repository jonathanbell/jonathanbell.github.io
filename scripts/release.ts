import semver from "semver";
import prompts from "prompts";
import fs from "fs";
import { exec } from "node:child_process";

const PACKAGE_JSON_PATH = "./package.json";

interface PackageJson {
  version: string;
  name?: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  [key: string]: unknown;
}

const execAsync = (command: string, description: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(command, (error) => {
      if (error) {
        console.error(`Error ${description}: ${error}`);
        reject(new Error(`Failed to ${description}`));
        return;
      }
      console.log(`${description} completed`);
      resolve();
    });
  });
};

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
  return execAsync(
    `git add ${PACKAGE_JSON_PATH}`,
    `staging ${PACKAGE_JSON_PATH} to Git`,
  );
};

const gitCommit = async (version: string): Promise<void> => {
  return execAsync(
    `git commit -m "chore(release): v${version}"`,
    `committing version v${version}`,
  );
};

const gitTag = async (version: string): Promise<void> => {
  return execAsync(
    `git tag -a v${version} -m "v${version}"`,
    `tagging version v${version}`,
  );
};

const generateChangelog = async (): Promise<void> => {
  return execAsync(
    `git fetch --tags --prune --prune-tags && conventional-changelog -p angular -i CHANGELOG.md -s -r 0`,
    `generating changelog`,
  );
};

const gitAddChangelog = async (): Promise<void> => {
  return execAsync(`git add CHANGELOG.md`, `staging CHANGELOG.md to Git`);
};

const gitPush = async (version: string): Promise<void> => {
  return execAsync(
    `git push origin main && git push origin v${version}`,
    `pushing commit and tag v${version} to GitHub`,
  );
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
