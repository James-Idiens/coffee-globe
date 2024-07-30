<script lang="ts">
	import coffeeData from '$lib/coffeedata.json';
	import type { Coffee } from '../models/interfaces';

	export let country: string;
	let coffee: Coffee | undefined;

	coffee = coffeeData.coffees.find((c: Coffee) => c.country.toLowerCase() === country.toLowerCase());
</script>

<div class="card bg-white shadow-lg rounded-lg p-6">
	{#if coffee}
		<img src={coffee.image} alt="Coffee" class="w-full rounded-md h-auto md:h-64 object-scale-down object-center" />
	{:else}
		<p>Image not available</p>
	{/if}
</div>
