<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
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

		window.scrollTo(0, parseInt(sessionStorage.getItem('scrollPosition') || '0'));
	});

	onDestroy(() => {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    });

	
</script>

<div class="bg-black-100 min-h-screen overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-0 sm:gap-4 justify-center items-center relative">
    {#if coffee}
        <div class="col-span-1 md:col-span-1 mx-auto md:mx-0">
			<div class="w-2/3 sm:max-w-md mx-auto">
                <img src={coffee.image} alt="Coffee" class="w-full rounded-md h-auto md:h-64 object-cover object-center" />
            </div>
        </div>
        <div class="col-span-1 md:col-span-1 mx-auto md:mx-0 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div class="p-6">
                <h1 class="text-3xl font-bold text-white mb-4">Country: {coffee.country}</h1>
                <p class="text-gray-400">Region: {coffee.region}</p>
                <p class="text-gray-400">Producer: {coffee.producer}</p>
                <p class="text-gray-400">Process: {coffee.process}</p>
                <p class="text-gray-400">Variety: {coffee.variety}</p>
                <p class="text-gray-400">Tasting Notes: {coffee.tastingNotes.join(', ')}</p>
            </div>
        </div>
        <div class="col-span-1 md:col-span-1 mx-auto md:mx-0">
            <!-- Placeholder for map -->
        </div>
    {:else}
        <p class="text-white col-span-1">Country not found!</p>
    {/if}
	<a href="/" class="absolute top-3 left-3 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
    </a>
</div>
