<script lang="ts">
import { defineComponent } from 'vue';
import Footer from './Footer.vue';

export default defineComponent({
	name: "Blogroll",
	components: {
		Footer,
	},
	data() {
		return {
			links: [
				{
					heading: "Are You a Real Rock Climber?",
					link: "http://www.climbing.com/news/real-rock-climber/",
					body: "Imposter syndrome is not exclusive to software development"
				},
				{
					heading: "Are You Climbing Enough?",
					link: "http://www.climbing.com/news/semi-rad-are-you-climbing-enough/",
				},
				{
					heading: "Buying Happiness",
					link: "http://semi-rad.com/2014/09/it-turns-out-you-can-buy-happiness/",
					body: "Save $1000 over a year, go on a trip",
				},
				{
					heading: "F*ck Busy!",
					link: "https://semi-rad.com/2016/05/f-busy/",
				},
				{
					heading: "What Giving Up Coffee May Be Like for You",
					link: "http://semi-rad.com/2017/09/i-gave-up-coffee-for-three-months-and-this-is-what-i-learned",
					body: "I have a major caffeine sensitivity, so I found this interesting",
				},
				{
					heading: "Fifty Classic Squamish Climbs",
					link: "http://www.50classicsquamishclimbs.com/",
					body: "Poster of fifty classic Squamish rock climbs",
				},
				{
					heading: "Gaming Disorder; Not a Thing",
					link: "https://youtu.be/mMlQRFhUPlE",
				},
				{
					heading: "Getting Out of Bed in the Morning",
					link: "https://www.youtube.com/watch?v=EWsCuPB2nD0&t=16m18s",
					body: "It can be hard, but it can be gratifying also",
				},
				{
					heading: "Gumbies on Crack",
					link: "http://gumbiesoncrack.blogspot.com/",
					body: "Squamish/Vancouver climbers",
				},
				{
					heading: "Just Don't Flake",
					link: "http://semi-rad.com/2017/07/flake-actually-just-dont-flake/",
				},
				{
					heading: "Mind Games and Fear",
					link: "http://www.climbing.com/skill/the-mind-game-how-to-overcome-fear/",
					body: "On being affraid while climbing",
				},
				{
					heading: "The Minimalists",
					link: "http://www.theminimalists.com/21days/",
					body: "Minimalism is fascinating to me",
				},
				{
					heading: "Sendage",
					link: "https://sendage.com/user/jonathan-bell",
					body: "My sendage profile",
				},
				{
					heading: "My Climbing Ticklist",
					link: "http://sendage.com/sendlists/view/55f2fc025a125",
					body: "Just some routes that I should have done a long time ago...",
				},
				{
					heading: "On Turning 35",
					link: "https://vimeo.com/62716181",
				},
				{
					heading: "Pretty Damn Pointless, eh?",
					link: "http://semi-rad.com/2018/01/none-of-this-makes-any-sense-and-thats-just-fine",
				},
				{
					heading: "The Art of Getting Old",
					link: "http://semi-rad.com/2015/02/the-art-of-getting-old/",
					body: "I just want to be 70 someday.",
				},
				{
					heading: "The Cost of Context Switching",
					link: "https://shoptalkshow.com/episodes/295-take-knee/#t=21:21",
				},
				{
					heading: "The Fire",
					link: "http://davemacleod.blogspot.ca/2014/11/the-fire.html",
					body: "Dave Macleod on inspiration.",
				},
				{
					heading: "The Fun Scale",
					link: "http://kellycordes.wordpress.com/2009/11/02/the-fun-scale/",
				},
				{
					heading: "The Idea of Wasting Time",
					link: "http://semi-rad.com/2015/01/the-dawn-wall-and-the-idea-of-wasting-time/",
					body: "Kevin Jorgeson and Tommy Caldwell have free climbed the Dawn Wall; a lot of people think that they were wasting their time",
				},
				{
					heading: "The Last True Hermit",
					link: "http://www.gq.com/story/the-last-true-hermit",
				},
				{
					heading: "Tin Oxygen Tungsten Snow",
					link: "http://www.tinoxygentungsten.com/",
					body: "The personal website of Sandy Briggs, chemist, mountaineer and arctic traveler",
				},
				{
					heading: "Top 100 Boulder Problems in Squamish, BC",
					link: "http://sendage.com/sendlists/view/4ed551b85392f",
					body: "A list of the top 100 boulder problems in Squamish, BC",
				},
			]
		};
	},
});
</script>

<template>
	<section class="link-container">
		<h2>Blogroll</h2>
		<!-- <p>Remember the "old days"?</p> -->
		<ul class="blogroll">
			<li v-for="(link, index) in links" :key="index">
				<a :title="link.body ? link.body : ''" :href="link.link"
					target="_blank">{{
						link.heading }}</a>
			</li>
		</ul>
	</section>
	<Footer />
</template>

<style scoped lang="scss">
@import '../styles/breakpoints';

.link-container {
	border-top: 1px solid var(--colors-accent-deep-secondary);
	margin-top: 4rem;

	&>h2 {
		font-size: 1.1rem;
		text-transform: uppercase;
		color: var(--colors-brand-base-secondary);
		font-family: system-ui, sans-serif;
		font-weight: 700;
		margin-top: 1rem;
		margin-bottom: 2rem;
	}
}

ul {
	list-style: none;
	padding: 0;
	margin: 0;
	line-height: inherit;

	@media (min-width: $breakpoints-medium) {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	@media (min-width: $breakpoints-large) {
		grid-template-columns: 1fr 1fr 1fr;
	}
}

li {
	&:before {
		content: '🔗';
		display: inline-block;
		font-size: 0.9rem;
		margin-right: 0.5rem;
	}

	&:last-child {
		margin-bottom: 0;
	}
}
</style>
