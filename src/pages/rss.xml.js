import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";

export async function GET (context) {
  const postImportResult = import.meta.glob("./blog/*.md", { eager: true });

  const posts = Object.values(postImportResult).filter(
    (post) => !post.frontmatter.title.includes("DRAFT")
  );

  const items = posts.map((post) => {
    return {
      link: post.url,
      title: post.frontmatter.title,
      pubDate: post.frontmatter.publishDate,
      content: sanitizeHtml(post.compiledContent()),
      description:
        post.frontmatter.description ||
        `Jonathan Bell - ${post.frontmatter.title}`,
    };
  });

  return rss({
    // `<title>` field in output xml
    title: "Jonathan Bell, Software Developer",
    // `<description>` field in output xml
    description: "Jonathan Bell, software developer & photographer from Canada",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    // Array of `<item>`s in output xml
    items,
    // (optional) inject custom xml
    customData: "<language>en</language>",
  });
}
