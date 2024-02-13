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

<div
	class="bg-black-100 min-h-screen overflow-y-auto flex flex-col md:flex-row justify-center items-center relative"
>
	{#if coffee}
		<div class="flex-1 order-2 md:order-1 ml-2">
			<img
				src={coffee.image}
				alt="Coffee"
				class="w-full h-auto md:h-64 object-cover object-center"
			/>
		</div>
		<div
			class="flex-1 max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden order-1 md:order-2 md:max-w-1/3 md:mx-4 mt-4 md:mt-0"
		>
			<div class="p-6">
				<h1 class="text-3xl font-bold text-white mb-4">Country: {coffee.country}</h1>
				<p class="text-gray-400">Region: {coffee.region}</p>
				<p class="text-gray-400">Producer: {coffee.producer}</p>
				<p class="text-gray-400">Process: {coffee.process}</p>
				<p class="text-gray-400">Variety: {coffee.variety}</p>
				<p class="text-gray-400">Tasting Notes: {coffee.tastingNotes.join(', ')}</p>
				<p class="text-gray-400">Review: {coffee.review}</p>
			</div>
		</div>
		<div class="flex-1 order-3 md:order-3">
			<!-- Placeholder for map -->
		</div>
	{:else}
		<p class="text-white">Country not found!</p>
	{/if}
	<div class="absolute bottom-1 w-full flex justify-center">
		<a href="/" class="rounded-full py-2 px-8 bg-gradient-to-l from-sky-400 to-blue-500 mt-8"
			>Back</a
		>
	</div>
</div>
