import globals from "globals";
import jsConfig from "@eslint/js";
import tsConfig from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,astro,jsx,tsx}"],
    ignores: ["node_modules/**", "dist/**", "test-results/**"],
  },
  {
    languageOptions: {
      ...jsxA11y.flatConfigs.recommended.languageOptions,
      globals: globals.node,
    },
  },
  jsConfig.configs.recommended,
  ...tsConfig.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-recommended"],
  {
    // Unfortunately, `ignores:[".astro/**"]` doesn't seem to want to work.
    files: [".astro/**"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];
