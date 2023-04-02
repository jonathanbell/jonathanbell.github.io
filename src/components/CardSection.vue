<script lang="ts">
import { defineComponent } from 'vue';
import Card from './Card.vue';

export default defineComponent({
	name: 'CardSection',
	components: {
		Card
	},

	data() {
		return {
			id: 1,
		}
	},

	props: {
		sectionTitle: {
			type: String,
			default: '',
		},
	},

	computed: {
		sectionId(): string {
			if (this.sectionTitle === '') {
				return `section-${this.id++}`;
			}
			return this.sectionTitle.toLowerCase().replace(/\s/g, '-');
		}
	}
});
</script>

<template>
	<section :id=sectionId>
		<h2 v-if="sectionTitle !== ''" class="section-header">{{ sectionTitle }}</h2>
		<h2 v-else class="screenreader-only">Links</h2>
		<ul
			:class="sectionTitle !== '' ? 'card-container' : 'card-container--without-heading'">
			<slot />
		</ul>
	</section>
</template>

<style scoped lang="scss">
@import '../styles/breakpoints';
@import '../styles/utils';

section {
	border-top: 1px solid var(--colors-accent-deep-secondary);
	margin: 4rem 0 2rem 0;

	&:first-of-type {
		border-top: none;

		@media (min-width: $breakpoints-medium) {
			border-top: 1px solid var(--colors-accent-deep-secondary);
		}
	}

	h2 {
		text-transform: uppercase;
		font-size: 1.1rem;
		color: var(--colors-brand-base-secondary);
		font-family: system-ui, sans-serif;
		margin-top: 1rem;
		margin-bottom: 2rem;
	}
}

ul {
	list-style: none;
	padding: 0;
	margin: 0;
	display: grid;
	gap: 1rem;

	@media (min-width: $breakpoints-medium) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: $breakpoints-large) {
		grid-template-columns: 1fr 1fr 1fr;
	}
}

.card-container {
	&--without-heading {
		margin-top: 4rem;
	}
}
</style>

<style is:global lang="scss">
section:target ul li.link-card {
	background-color: var(--colors-brand-base);
	box-shadow: 1px 1px 4px 1px #393939;
	transition: background-color 0.1s ease-in-out;

	&:hover {
		background-color: var(--colors-accent-deep-secondary);
	}

	a {
		color: white;

		&:hover {
			color: white;
		}
	}
}
</style>
