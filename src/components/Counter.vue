<template>
	<!-- This is simply an example of a component that I am leaving here for myself. It's not in use right now. -->
	<div>
		<button class="up" @click="increment">
			increment
		</button>
		<button class="down" @click="decrement">
			decrement
		</button>
		<p>{{ count }}</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	// eslint-disable-next-line vue/multi-word-component-names
	name: "Counter",
	components: {},

	data() {
		return {
			count: 0,
		};
	},

	methods: {
		increment() {
			this.count++;
		},
		decrement() {
			this.count--;
		},
	},
});
</script>
