import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";

export async function get(context) {
	const postImportResult = import.meta.glob("./blog/*.md", { eager: true });
	const posts = Object.values(postImportResult);

	const items = posts.map((post) => {
		const p = {
			link: post.url,
			content: sanitizeHtml(post.compiledContent()),
			...post.frontmatter,
		};

		if (p.description === null) {
			p.description = `Jonathan Bell: ${p.title}`;
		}
		return p;
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
