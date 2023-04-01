<template>
	<!-- This is simply an example of a component that I am leaving here for myself. It's not in use right now. -->
	<div>
		<button class="up" v-on:click="increment">increment</button>
		<button class="down" v-on:click="decrement">decrement</button>
		<p>{{ count }}</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
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
