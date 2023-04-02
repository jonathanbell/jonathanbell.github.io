import Footer from './Footer.vue';
import { mount } from '@vue/test-utils';

describe('Footer', () => {

	it('mounts and renders social links', async () => {
		const wrapper = mount(Footer);
		const a = wrapper.findAll('a');

		expect(a.length).toBe(6);
		expect(wrapper.text()).toContain('LinkedIn');
		expect(wrapper.text()).toContain('GitHub');
		expect(wrapper.text()).toContain('Twitter');
		expect(wrapper.text()).toContain('Instagram');
	});

});
