<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import coffeeData from '$lib/coffeedata.json';
	import type { Coffee } from '../../models/interfaces';

	const slug = $page.params.slug;
	let coffee: Coffee | undefined;

	onMount(() => {
		if (slug) {
			const countryName = slug ? slug.replace(/-/g, ' ') : '';

			coffee = coffeeData.coffees.find(
				//@ts-ignore
				(c: Coffee) => c.country.toLowerCase() === countryName.toLowerCase()
			);
		}

		window.scrollTo(0, parseInt(sessionStorage.getItem('scrollPosition') || '0'));
	});
</script>

<div
	class="bg-black-100 min-h-screen overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-0 sm:gap-4 justify-center items-center relative"
>
	{#if coffee}
		<div class="col-span-1 md:col-span-1 mx-auto md:mx-0">
			<div class="w-2/3 sm:max-w-md mx-auto">
				<img
					src={coffee.image}
					alt="Coffee"
					class="w-full rounded-md h-auto md:h-64 object-cover object-center"
				/>
			</div>
		</div>
		<div
			class="col-span-1 md:col-span-1 mx-auto md:mx-0 bg-gray-800 rounded-lg shadow-lg overflow-hidden"
		>
			<div class="p-6">
				<h1 class="text-3xl font-bold text-white mb-4">Country: {coffee.country}</h1>
				<p class="text-gray-400"><span class="font-bold">Region: </span>{coffee.region}</p>
				<p class="text-gray-400"><span class="font-bold">Producer: </span>{coffee.producer}</p>
				<p class="text-gray-400"><span class="font-bold">Process: </span>{coffee.process}</p>
				<p class="text-gray-400"><span class="font-bold">Variety: </span>{coffee.variety}</p>
				<p class="text-gray-400">
					<span class="font-bold">Tasting Notes: </span>{coffee.tastingNotes.join(', ')}
				</p>
			</div>
		</div>
		<div class="col-span-1 md:col-span-1 mx-auto md:mx-0 text-white p-2">
			<p>
				<span class="font-medium text-lg">Ed's Comments:</span><br />
				<i>{coffee["Ed's comments"]}</i>
			</p>
			<p class="mt-2">
				<span class="font-medium text-lg">James' Comments:</span><br />
				<i>{coffee["James' comments"]}</i>
			</p>
		</div>
	{:else}
		<p class="text-white col-span-1">Country not found!</p>
	{/if}
</div>
