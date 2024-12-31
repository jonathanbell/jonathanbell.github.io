module.exports = {
  extends: ["@commitlint/config-conventional"],
  // Ignore commits/PRs created by Dependabot.
  ignores: [(commit) => commit.includes("Signed-off-by: dependabot[bot]")],
};
