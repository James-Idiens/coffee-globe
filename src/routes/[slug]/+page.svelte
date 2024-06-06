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

<div class="bg-black-100 min-h-screen overflow-y-auto flex flex-col md:flex-row justify-center items-center relative">
	{#if coffee}
		<div class="mt-[90px] lg:mt-0 flex-1 w-full md:w-1/2 grid grid-cols-1 max-w-3xl justify-items-center p-4">
			<div class="relative">
				<div class="w-3/4 lg:w-full sm:max-w-md mx-auto mb-8">
					<img
						src={coffee.image}
						alt="Coffee"
						class="w-full rounded-md h-auto md:h-64 object-scale-down object-center"
					/>
				</div>

				<div class="h-auto w-full lg:w-[500px] relative group">
					<div class="absolute -inset-1 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-md blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
					<div class="relative bg-black-100 rounded-lg overflow-hidden p-[2px]">
						<div class="p-4 md:py-4 md:px-8">
							<h1 class="text-3xl font-bold text-white mb-4">Country: {coffee.country}</h1>
							<p class="text-gray-400"><span class="font-bold">Region: </span>{coffee.region}</p>
							<p class="text-gray-400"><span class="font-bold">Producer: </span>{coffee.producer}</p>
							<p class="text-gray-400"><span class="font-bold">Process: </span>{coffee.process}</p>
							<p class="text-gray-400"><span class="font-bold">Variety: </span>{coffee.variety}</p>
							<p class="text-gray-400"><span class="font-bold">Tasting Notes: </span>{coffee.tastingNotes.join(', ')}</p>
						</div>
					</div>
				</div>
			</div>
		
		</div>
		<div class="flex-1 text-white p-4 md:order-last my-auto">
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
		<p class="text-white">Country not found!</p>
	{/if}
</div>

<style>
</style>