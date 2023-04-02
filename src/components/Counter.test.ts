import Counter from "./Counter.vue";
import { mount } from "@vue/test-utils";

describe("Counter", () => {
	it("mounts and renders social links", async () => {
		const wrapper = mount(Counter);
		expect(wrapper.vm.count).toBe(0);

		const up = wrapper.find("button.up");
		const down = wrapper.find("button.down");

		await up.trigger("click");
		expect(wrapper.vm.count).toBe(1);
		await up.trigger("click");
		expect(wrapper.vm.count).toBe(2);

		await down.trigger("click");
		expect(wrapper.vm.count).toBe(1);
		await down.trigger("click");
		expect(wrapper.vm.count).toBe(0);
		await down.trigger("click");
		expect(wrapper.vm.count).toBe(-1);
	});
});
