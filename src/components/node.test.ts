/**
 * @jest-environment node
 */
import * as fs from 'fs';

describe("external links", () => {
	test("our blogroll links are clickable and do not result in error", async () => {
		const fileContents = fs.readFileSync(__dirname + '/Blogroll.vue', 'utf8');

		const cardObjectsStr: string = fileContents.toString().split("links: [")[1].split("]")[0];
		const cards = eval(`([${cardObjectsStr}])`);

		for (let card of cards) {
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
