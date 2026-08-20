import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projects = defineCollection({
  // Astro 6 requires a loader for content collections.
  // https://docs.astro.build/en/guides/content-collections/#built-in-loaders
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    link: z.string(),
    emoji: z.string(),
  }),
});

// Expose your defined collection to Astro
// with the `collections` export
export const collections = {
  projects,
};
