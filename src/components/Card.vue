<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	// eslint-disable-next-line vue/multi-word-component-names
	name: "Card",
	components: {},
	props: {
		heading: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			default: "",
		},
		link: {
			type: String,
			required: true,
		},
		pubDate: {
			type: String,
			default: null,
		},
		emoji: {
			type: String,
			default: null,
		},
	},

	computed: {
		dateUsLong(): string {
			if (this.pubDate) {
				return new Date(this.$props.pubDate).toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				});
			}

			return "";
		},
		dateDatetime(): string {
			if (this.pubDate) {
				const date = new Date(this.$props.pubDate);
				const year = date.getFullYear();
				const numericMonth = String(date.getMonth() + 1).padStart(2, "0");
				const numericDay = String(date.getDate()).padStart(2, "0");

				return `${year}-${numericMonth}-${numericDay}`;
			}

			return "";
		},
	},
});
</script>

<template>
	<li class="link-card">
		<a :href="link" :target="!emoji ? '_self' : '_blank'">
			<h3>
				{{ heading }}
				<span
					v-if="emoji !== null"
					class="emoji"
					aria-hidden="true"
				>{{ emoji
				}}</span>
				<span
					v-else
					class="arrow"
					aria-hidden="true"
				>&rarr;</span>
			</h3>
			<time v-if="pubDate !== null" :datetime="dateDatetime">{{ dateUsLong
			}}</time>
			<p v-if="body !== ''">
				{{ body }}
			</p>
		</a>
	</li>
</template>

<style scoped lang="scss">
@import '../styles/breakpoints';

@keyframes arrowhover {
	from {
		transform: translate3d(0, 0, 0);
		background-position: 0% 50%;
	}

	to {
		transform: translate3d(2px, 0, 0);
		background-position: 100% 50%;
	}
}

.link-card {
	list-style: none;
	background-color: white;
	box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);

	@media (prefers-color-scheme: dark) {
		background-color: black;
	}

	@media (min-width: $breakpoints-medium) {
		padding: 0.25rem;
	}

	&>a {
		width: 100%;
		text-decoration: none;
		line-height: 1.5;
		padding: 1rem 1.25rem;
		display: block;
		height: 100%;
		color: var(--colors-fg-base);

		h3 {
			margin: 0;
			font-size: 1rem;
			font-family: system-ui, sans-serif;

			span {
				display: inline-block;
				font-size: 1.188rem;

				&.emoji {
					font-size: 1.25rem;
				}

				&.arrow {
					background-position: 0%;
					background: linear-gradient(144deg,
							#e14725 -1.13%,
							var(--colors-accent-light-secondary) 15.22%,
							var(--colors-accent-light) 32.09%,
							var(--colors-brand-base-secondary) 53.97%,
							var(--colors-accent-deep) 67.94%,
							var(--colors-accent-deep-secondary) 85.34%,
							var(--colors-brand-base) 99.57%);
					background-size: 400%;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}
		}

		time {
			font-size: 0.75rem;
			font-weight: 500;
		}

		p {
			font-size: 1rem;
			font-weight: normal;
			margin-top: 0.5rem;
			margin-bottom: 0;
			line-height: inherit;
		}

		&:hover {
			color: var(--colors-brand-base);

			h3 {
				span.arrow {
					animation: arrowhover 1s;
					animation-direction: alternate;
					animation-iteration-count: 1;
					animation-fill-mode: forwards;
				}
			}
		}
	}
}
</style>
