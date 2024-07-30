<script lang="ts">
	import coffeeData from '$lib/coffeedata.json';
	import type { Coffee } from '../models/interfaces';

	export let country: string;
	let coffee: Coffee | undefined;

	coffee = coffeeData.coffees.find((c: Coffee) => c.country.toLowerCase() === country.toLowerCase());
</script>

<div class="card bg-white shadow-lg rounded-lg p-6">
	{#if coffee}
		<h1 class="text-3xl font-bold text-black mb-4">Country: {coffee.country}</h1>
		<p class="text-gray-700"><span class="font-bold">Region: </span>{coffee.region}</p>
		<p class="text-gray-700"><span class="font-bold">Producer: </span>{coffee.producer}</p>
		<p class="text-gray-700"><span class="font-bold">Process: </span>{coffee.process}</p>
		<p class="text-gray-700"><span class="font-bold">Variety: </span>{coffee.variety}</p>
		<p class="text-gray-700"><span class="font-bold">Tasting Notes: </span>{coffee.tastingNotes.join(', ')}</p>
	{:else}
		<p>Coffee details not available</p>
	{/if}
</div>
