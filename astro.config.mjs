import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://www.jonathanbell.ca",
  markdown: {
    // https://docs.astro.build/en/guides/markdown-content/#syntax-highlighting
    shikiConfig: {
      // Choose from Shiki's built-in themes
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: "github-light",
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
});
