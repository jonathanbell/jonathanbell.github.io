import CardSection from './CardSection.vue';
import { mount } from '@vue/test-utils';

describe('CardSection', () => {

	it('mounts without issue', () => {
		const wrapper = mount(CardSection, {
			props: {
				sectionTitle: 'Marsellus Wallace',
			}
		});

		const heading = wrapper.find('h2');
		expect(heading.text()).toBe('Marsellus Wallace');

		const section = wrapper.find('section');
		expect(section.attributes('id')).toBe('marsellus-wallace');
	});

});
