import fs from "fs";
import { execFileSync } from "node:child_process";

/**
 * Prepend a section for the `package.json` version to `CHANGELOG.md`, listing
 * every commit since the last tag. Output matches the existing entries:
 *
 * ## 2.13.0 (2026-11-13)
 *
 * * feat: subject ([abc1234](https://github.com/.../commit/abc1234))
 */
const CHANGELOG_PATH = "CHANGELOG.md";
const COMMIT_URL =
  "https://github.com/jonathanbell/jonathanbell.github.io/commit";
const SECTION_GAP = "\n\n\n\n";

const git = (...args: string[]): string =>
  execFileSync("git", args, { encoding: "utf8" }).trim();

const { version } = JSON.parse(fs.readFileSync("package.json", "utf8"));
const changelog = fs.readFileSync(CHANGELOG_PATH, "utf8");

// Re-running for the same version would duplicate the section.
const escaped = version.replaceAll(".", "\\.");
if (new RegExp(`^## (<small>)?${escaped} \\(`, "m").test(changelog)) {
  console.error(`${CHANGELOG_PATH} already has a ${version} section`);
  process.exit(1);
}

const lastTag = git("describe", "--tags", "--abbrev=0");
const commits = git(
  "log",
  "--no-merges",
  `--format=* %s ([%h](${COMMIT_URL}/%h))`,
  `${lastTag}..HEAD`,
);

// Patch releases get a smaller heading, e.g. `## <small>2.9.1 (date)</small>`.
const date = new Date().toISOString().slice(0, 10);
const title = `${version} (${date})`;
const isPatch = !version.endsWith(".0");
const heading = isPatch ? `## <small>${title}</small>` : `## ${title}`;

fs.writeFileSync(
  CHANGELOG_PATH,
  `${heading}\n\n${commits}${SECTION_GAP}${changelog}`,
);
console.log(`Added ${version} to ${CHANGELOG_PATH}`);
