import BigAssButton from "./BigAssButton.vue";
import { mount } from "@vue/test-utils";

describe("BigAssButton", () => {
	it("renders a link with the given props", () => {
		const wrapper = mount(BigAssButton, {
			props: {
				link: "https://www.google.com",
				text: "Google",
			},
		});

		const link = wrapper.find("a");
		expect(link.attributes("href")).toBe("https://www.google.com");
		expect(link.text()).toBe("Google");
	});
});
