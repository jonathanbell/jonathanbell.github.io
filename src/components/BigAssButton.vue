<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "BigAssButton",
	components: {},

	props: {
		link: {
			required: true,
			type: String,
		},
		text: {
			required: true,
			type: String,
		},
	},
});
</script>

<template>
	<a :href=link>{{ text }}</a>
</template>

<style scoped lang="scss">
a {
	font-family: system-ui, sans-serif;
	text-align: center;
	display: grid;
	align-items: center;
	font-weight: 600;
	background: var(--colors-fg-base);
	color: var(--colors-bg-base);
	min-height: 3.5rem;
	margin-bottom: 1rem;
	border: 2px solid var(--colors-fg-base);
	transition: border-color 0.1s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s, background-color 0.1s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s;
	max-width: 40rem;

	&:hover {
		background: var(--colors-accent-light); // 🤔
		color: var(--colors-fg-base);

		@media (prefers-color-scheme: dark) {
			background: var(--colors-accent-deep-secondary);
		}
	}
}
</style>
