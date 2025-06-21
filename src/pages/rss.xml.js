import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export async function GET(context) {
  const postImportResult = import.meta.glob("./blog/*.md", { eager: true });

  const posts = Object.values(postImportResult).filter(
    (post) => !post.frontmatter.title.includes("DRAFT"),
  );

  const items = posts
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishDate) -
        new Date(a.frontmatter.publishDate),
    )
    .map((post) => {
      let content = "";

      try {
        if (typeof post.compiledContent === "function") {
          const rawCompiledContent = post.compiledContent();
          // Check if `compiledContent` is HTML.
          if (rawCompiledContent && typeof rawCompiledContent === "string") {
            if (
              rawCompiledContent.includes("<") &&
              rawCompiledContent.includes(">")
            ) {
              // Already HTML.
              content = sanitizeHtml(rawCompiledContent, {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
              });
            } else {
              // Still markdown, convert it!
              content = sanitizeHtml(parser.render(rawCompiledContent), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
              });
            }
          }
        }

        if (!content && typeof post.rawContent === "function") {
          const rawContent = post.rawContent();
          if (rawContent && typeof rawContent === "string") {
            // Convert markdown to HTML
            content = sanitizeHtml(parser.render(rawContent), {
              allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
            });
          }
        }

        if (!content) {
          content = "";
        }
      } catch {
        content = post.frontmatter.description || "";
      }

      return {
        link: post.url,
        title: post.frontmatter.title,
        pubDate: post.frontmatter.publishDate,
        content: content,
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
