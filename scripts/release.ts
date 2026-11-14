import fs from "fs";
import { exec } from "node:child_process";
import { createInterface } from "node:readline/promises";

const PACKAGE_JSON_PATH = "./package.json";
const BUMP_TYPES = ["major", "minor", "patch"] as const;
const SEMVER_PATTERN = /^\d+\.\d+\.\d+$/;

type BumpType = (typeof BUMP_TYPES)[number];

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
    `git fetch --tags --prune --prune-tags && node scripts/changelog.ts`,
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

// Increment a plain `x.y.z` version, e.g. bump("2.12.0", "minor") -> "2.13.0".
const bump = (version: string, type: BumpType): string | undefined => {
  if (!SEMVER_PATTERN.test(version)) return undefined;

  const [major, minor, patch] = version.split(".").map(Number);
  if (type === "major") return `${major + 1}.0.0`;
  if (type === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
};

const askBumpType = async (): Promise<string> => {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(
    "Version bump (patch/minor/major, blank for none): ",
  );
  rl.close();
  return answer;
};

const main = async () => {
  const packageJson = getPackageJson();
  const currentVersion = packageJson.version;
  console.info(`Current project version: ${currentVersion}`);

  const input = (process.argv[2] ?? (await askBumpType())).trim().toLowerCase();
  const bumpType = BUMP_TYPES.find((type) => type === input);

  if (input && !bumpType) {
    console.error(
      "Invalid argument provided. Please use 'major', 'minor', or 'patch'.",
    );
    process.exit(1);
  }

  if (bumpType) {
    const newVersion = bump(currentVersion, bumpType);
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
