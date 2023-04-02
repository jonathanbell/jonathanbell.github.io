<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "SiteFooter",
	props: {},
});
</script>

<template>
	<footer>
		<h2 class="section-header">
			Social
		</h2>
		<div>
			<nav>
				<a
					href="https://www.linkedin.com/in/jonathan-bell-331578176/"
				>LinkedIn</a>
				<a href="https://github.com/jonathanbell">GitHub</a>
				<a href="https://www.instagram.com/jonathanbell.world/">Instagram</a>
				<a href="https://twitter.com/__jonathanbell">Twitter</a>
				<a href="/links">More...</a>
			</nav>
			<p>
				<a href="https://github.com/jonathanbell/jonathanbell.github.io">View
					source</a><span class="hover-blocker"> on GitHub</span>
			</p>
		</div>
	</footer>
</template>

<style scoped lang="scss">
@import '../styles/breakpoints';
@import '../styles/utils';

footer {
	border-top: 1px solid var(--colors-accent-deep-secondary);
	margin: 4rem 0 0 0;

	h2.section-header {
		font-family: system-ui, sans-serif;
		margin-top: 1rem;
		margin-bottom: 2rem;
	}

	p {
		margin: 2rem 0 1rem 0;
		font-size: 0.9rem;
		font-family: monospace;

		@media (min-width: $breakpoints-medium) {
			margin-top: 4rem;
			text-align: center;
		}

		a {
			text-decoration: revert;
			text-decoration-style: solid;
			text-decoration-thickness: auto;
		}

		&::after {
			content: '💾';
			display: inline-block;
			margin-left: 0.5rem;
		}
	}

	p:has(a:hover) {
		&::after {
			content: '👀';
		}
	}

	div {
		nav {
			padding: 0;
			margin: 0;

			a {
				font-weight: 500;
				display: table;
				margin-bottom: 0.5rem;

				@media (min-width: $breakpoints-medium) {
					display: initial;
					margin: 0;

					&::after {
						content: '✨';
						display: inline-block;
						margin: 0 0.5rem;
					}

					&:last-child {
						&::after {
							content: '';
							margin: 0;
						}
					}
				}
			}
		}
	}
}
</style>
