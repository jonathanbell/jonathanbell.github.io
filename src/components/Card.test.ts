import Card from "./Card.vue";
import { mount } from "@vue/test-utils";

describe("Card", () => {
	it("mounts and renders with given props", async () => {
		const wrapper = mount(Card, {
			props: {
				heading: "Marsellus Wallace",
				body: "I'm gonna make him an offer he can't refuse.",
				link: "https://www.imdb.com/title/tt0110912/quotes/qt0397881",
				pubDate: "2021-03-20T00:00:00.000Z",
				emoji: null,
			},
		});

		const heading = wrapper.find("h3");
		const time = wrapper.find("time");
		const body = wrapper.find("p");
		const a = wrapper.find("a");

		expect(heading.text()).toBe("Marsellus Wallace →");
		expect(time.text()).toContain("March");
		expect(time.text()).toContain("2021");
		expect(body.text()).toBe("I'm gonna make him an offer he can't refuse.");
		expect(a.attributes("href")).toBe("https://www.imdb.com/title/tt0110912/quotes/qt0397881");
	});
});
