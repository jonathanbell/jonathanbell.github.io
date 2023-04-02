<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "PersonalBlock",
	components: {},

	props: {
		fullName: {
			readonly: true,
			default: "",
			type: String,
		},
	},

	data() {
		return {};
	},

	computed: {
		firstName(): string {
			return this.fullName.split(" ")[0];
		},
		sAge(): string {
			const now: number = new Date().getTime();
			return Math.floor((now - new Date("2021-11-01").getTime()) / 3.15576e+10).toString();
		},
	},
});
</script>

<template>
	<details>
		<summary>
			<span class="screenreader-only">{{ fullName }} </span>is a full-stack web
			developer<span class="hide-on-x-small-screen"> at <span
				class="highlight"
			>Benevity</span></span>.
		</summary>
		<article class="details-content">
			<h2 class="screenreader-only">
				About {{ firstName }}
			</h2>
			<!-- Mmmmmmmm.... Delicious connntenntt... [Homer Simpson voice 🤤] -->
			<p>
				At <a href="https://benevity.com/">Benevity</a>, he works with a talented
				team of software developers who are responsible for dispersing
				company-seeded funds to users. Previously at Benevity, he worked on Spark;
				the company's flagship product which is responsible for corporate giving
				programs all over the globe. Prior to this, he was a Technical Analyst
				(User Experience Design) with the <a href="https://www2.gov.bc.ca/">Public
					Service of British Columbia</a> where he created web applications such
				as <a href="https://studentaidbc.ca/">StudentAidBC</a>.
			</p>
			<p>
				When not programming, Jonathan tends to <a
					href="/pictures/_MG_3954-Edit.jpg"
					target="_blank"
				>climb up small
					boulders in the woods</a> around Vancouver Island, Canada
				&#127464;&#127462;. He also
				enjoys <a href="https://www.strava.com/athletes/jonathanbell">trail
					running</a>, skiing, drinking tea, hiking with <a
					href="https://www.instagram.com/baciandbaci/"
				>his wife</a> and {{ sAge
				}} year old son, <a
					href="https://www.instagram.com/jonathanbell.world/"
				>landscape
					photography</a>, <a
					href="https://www.instagram.com/jonathanbell.photo/"
				>couples
					photography</a> and attempting be a minimalist.
			</p>
		</article>
	</details>
</template>

<style scoped lang="scss">
@import '../styles/breakpoints';
@import '../styles/utils';

details {
	overflow: hidden;
	max-width: 50rem;

	&>summary {
		cursor: pointer;
		padding-left: 1rem;
		list-style: none;
		font-family: 'Libre Franklin', system-ui, sans-serif;
		font-size: 1rem;
		position: relative;
		overflow: hidden;
		display: inline;
		width: auto;

		@media (min-width: $breakpoints-small) {
			font-size: 1.75rem;
			padding-left: 1.25rem;
		}

		&::before {
			content: '';
			border-width: 0.4rem;
			border-style: solid;
			border-color: transparent transparent transparent var(--colors-accent-deep-secondary);
			position: absolute;
			top: 0.2rem;
			left: 2px;
			transform: rotate(0);
			transform-origin: 0.25rem 50%;
			transition: 0.25s transform ease;

			@media (min-width: $breakpoints-small) {
				border-width: 0.5rem;
				top: 0.625rem;
				left: 0.25rem;
			}
		}

		// Animated underline thingy.
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 0.125rem;
			background-color: var(--colors-accent-deep-secondary);
			opacity: 0;
			transition: all 300ms, transform 300ms;
			transform: translate3d(-100%, 0, 0);
		}

		&:hover {
			color: var(--colors-accent-deep-secondary);

			&::after {
				@media (min-width: $breakpoints-small) {
					opacity: 1;
					transform: translate3d(0, 0, 0);
				}
			}
		}

		// Don't show the default triangle thingy (on the <details> element).
		&::-webkit-details-marker {
			display: none;
		}

		.highlight {
			color: var(--colors-brand-base-secondary);
		}
	}

	// The magic! 🧙‍♀️ - Rotate the triangle when the details are open.
	&[open]>summary {
		&::before {
			transform: rotate(90deg);
		}
	}

	.details-content {
		margin-top: 1rem;
		line-height: 1.5rem;
	}

	p {
		margin-top: 0;

		&:last-of-type {
			margin-bottom: 0;
		}
	}

	.hide-on-x-small-screen {
		@media (max-width: 37.5rem) {
			@include screenreader-only();
		}
	}
}
</style>
