/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*",
      options: {
        useTabs: false,
        printWidth: 80,
      },
    },
    {
      files: "*.md",
      options: {
        //
      },
    },
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
