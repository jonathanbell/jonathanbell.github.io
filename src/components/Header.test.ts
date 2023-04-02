import Header from "./Header.vue";
import { mount } from "@vue/test-utils";

describe("Header", () => {

	it("mounts and renders a site header with correct link", () => {
		const wrapper = mount(Header);
		const heading = wrapper.find("h1 a");
		expect(heading.text()).toBe("Jonathan Bell");
		expect(heading.attributes("href")).toBe("/");
	});

	it("contains a <nav> item with <a> tags", async () => {
		const wrapper = mount(Header);
		expect(wrapper.find("nav").exists()).toBe(true);

		const nav = wrapper.find("nav");
		const aTags = nav.findAll("a");
		expect(aTags.length).toBeGreaterThan(3);

		expect(aTags.at(0)?.text()).toBe("Home");
	});

});
