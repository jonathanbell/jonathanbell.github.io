/**
 * @jest-environment node
 */
import * as fs from "fs";
import path from "path";

describe("external links", () => {
	test("our blogroll links are clickable and do not result in error", async () => {
		const p = path.join(__dirname, "Blogroll.vue");
		const fileContents = fs.readFileSync(p, "utf8");

		const cardObjectsStr: string = fileContents.toString().split("links: [")[1].split("]")[0];
		// eslint-disable-next-line no-eval
		const cards = eval(`([${cardObjectsStr}])`);

		for (const card of cards) {
			const a = card.link;
			const url: URL = new URL(a ?? "");

			try {
				const res = await fetch(url.href);
				const status = parseInt(res.status.toString().trim(), 10);
				expect(status).toBeLessThan(400);
			} catch (error) {
				console.warn(`Unable to connect correctly to ${url.href}`);
				console.error(error);
			}
		}
	}, 30000);
});
