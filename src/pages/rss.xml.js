import rss from "@astrojs/rss";

export async function GET(context) {
  const postImportResult = import.meta.glob("./blog/*.md", { eager: true });

  const posts = Object.values(postImportResult)
    .filter((post) => !post.frontmatter.title.includes("DRAFT"))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishDate) -
        new Date(a.frontmatter.publishDate),
    );

  // `compiledContent()` resolves to the post HTML Astro already rendered.
  const items = await Promise.all(
    posts.map(async (post) => ({
      link: post.url,
      title: post.frontmatter.title,
      pubDate: post.frontmatter.publishDate,
      content: await post.compiledContent(),
      description:
        post.frontmatter.description ||
        `Jonathan Bell - ${post.frontmatter.title}`,
    })),
  );

  return rss({
    // `<title>` field in output xml
    title: "Jonathan Bell, Software Developer",
    // `<description>` field in output xml
    description: "Jonathan Bell, software developer & photographer from Canada",
    // Pull in your projects "site"
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    // Array of `<item>`s in output xml
    items,
    // (optional) inject custom xml
    customData: "<language>en</language>",
    // Ensure proper XML declaration
    xmlDeclaration: true,
  });
}
