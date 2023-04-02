import PersonalBlock from "./PersonalBlock.vue";
import { mount } from "@vue/test-utils";

describe("PersonalBlock", () => {
	it("mounts and renders a message", () => {
		const wrapper = mount(PersonalBlock);
		expect(wrapper.text()).toContain("is a full-stack web developer");
	});

	it("accepts and displays props appropriately", async () => {
		const wrapper = mount(PersonalBlock);
		await wrapper.setProps({ fullName: "Marsellus Wallace" });

		const screenReaderText = wrapper.find(".screenreader-only");
		expect(screenReaderText.text()).toBe("Marsellus Wallace");
	});

	it("shows details when summary is clicked", async () => {
		const wrapper = mount(PersonalBlock);
		const summary = wrapper.find("summary");
		const detailsContent = wrapper.find("details article");

		expect(detailsContent.isVisible()).toBe(false);
		await summary.trigger("click");
		expect(detailsContent.isVisible()).toBe(true);
		expect(detailsContent.text()).toContain("photo");
	});
});
