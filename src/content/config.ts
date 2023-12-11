import { z, defineCollection } from "astro:content";

const projects = defineCollection({
  schema: z.object({
    name: z.string(),
    link: z.string(), // .optional()
    emoji: z.string(),
  }),
});

// Expose your defined collection to Astro
// with the `collections` export
export const collections = {
  projects,
};
