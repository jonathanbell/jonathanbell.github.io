module.exports = {
	parser: "vue-eslint-parser",
	parserOptions: {
		parser: "@typescript-eslint/parser",
		extraFileExtensions: [
			".vue",
		],
	},
	extends: [
		"standard",
		"plugin:astro/recommended",
		"plugin:vue/vue3-recommended",
	],
	plugins: ["jest"],
	env: {
		"jest/globals": true,
	},
	overrides: [
		{
			// Define the configuration for `.astro` file.
			files: ["*.astro"],
			// Allows Astro components to be parsed.
			parser: "astro-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
				extraFileExtensions: [".astro"],
			},
			rules: {
				// override/add rules settings here, such as:
				// "astro/no-set-html-directive": "error"
			},
		},
	],
	rules: {
		"no-tabs": ["error", { allowIndentationTabs: true }],
		semi: ["error", "always"],
		quotes: ["error", "double"],
		indent: ["error", "tab"],
		"no-console": ["error", { allow: ["warn", "info", "error"] }],
		"comma-dangle": ["error", {
			arrays: "always-multiline",
			objects: "always-multiline",
			imports: "always-multiline",
			exports: "always-multiline",
			functions: "never",
		}],
		"space-before-function-paren": ["error", {
			anonymous: "always",
			named: "never",
			asyncArrow: "always",
		}],
		"vue/html-indent": ["error", "tab", {
			alignAttributesVertically: true,
		}],
		"vue/max-attributes-per-line": ["error", {
			singleline: {
				max: 2,
			},
		}],
	},
};
