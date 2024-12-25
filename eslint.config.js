import globals from "globals";
import jsConfig from "@eslint/js";
import tsConfig from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    // https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
    // https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores
    ignores: ["dist/**", "test-results/**", ".astro/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,astro}"],
    languageOptions: {
      ...jsxA11y.flatConfigs.recommended.languageOptions,
      globals: globals.node,
    },
  },
  jsConfig.configs.recommended,
  ...tsConfig.configs.strict,
  ...eslintPluginAstro.configs["flat/recommended"],
  ...eslintPluginAstro.configs["jsx-a11y-recommended"],
  eslintConfigPrettier,
];
