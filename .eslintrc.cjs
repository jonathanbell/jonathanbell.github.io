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
		"plugin:vue/vue3-recommended",
	],
	plugins: ["jest"],
	env: {
		"jest/globals": true,
	},
	rules: {
		"no-tabs": ["error", { allowIndentationTabs: true }],
		semi: ["error", "always"],
		quotes: ["error", "double"],
		indent: ["error", "tab"],
		"no-console": ["error", { allow: ["warn", "info", "error"] }],
		"comma-dangle": ["error", "always-multiline"],
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
