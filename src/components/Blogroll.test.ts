import Blogroll from "./Blogroll.vue";
import { mount } from "@vue/test-utils";

describe("Blogroll", () => {
	it("mounts without issue", () => {
		const wrapper = mount(Blogroll);
		const aTags = wrapper.findAll("a");

		expect(wrapper.exists()).toBe(true);
		expect(aTags.length).toBeGreaterThan(5);
		expect(wrapper.text()).toContain("Are You a Real Rock Climber?");
	});
});
