<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import coffeeData from '$lib/coffeedata.json';

	interface Coffee {
		country: string;
		region: string;
		tastingNotes: string[];
		producer: string;
		process: string;
		variety: string;
		image: string;
		flag: string;
		review: string;
	}

	const slug = $page.params.slug;
	let coffee: Coffee | undefined;

	onMount(() => {
		if (slug) {
			const countryName = slug ? slug.replace(/-/g, ' ') : '';

			coffee = coffeeData.coffees.find(
				(c: Coffee) => c.country.toLowerCase() === countryName.toLowerCase()
			);
		}
	});
</script>

<div class="bg-black-100 h-screen overflow-scroll">
	{#if coffee}
		<div class="text-white">
			<h1 class="text-2xl">Country: {coffee.country}</h1>
			<p>Region: {coffee.region}</p>
			<p>Producer: {coffee.producer}</p>
			<p>Process: {coffee.process}</p>
			<p>Variety: {coffee.variety}</p>
			<p>Tasting Notes: {coffee.tastingNotes}</p>
			<p>Review: {coffee.review}</p>
		</div>
	{:else}
		<p class="text-white">Country not found!</p>
	{/if}
	<a href="/" class="rounded-full py-2 px-8 bg-gradient-to-l from-sky-400 to-blue-500">Back</a>
</div>
