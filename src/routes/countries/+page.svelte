<script lang="ts">
	import coffeeData from '$lib/coffeedata.json';

	const coffees = coffeeData.coffees.sort((a, b) => a.country.localeCompare(b.country));
</script>

<div class="bg-fixed bg-center bg-cover custom-img">
	<!-- Country Cards Section -->
	<div class="container mx-auto py-12 md:px-9">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
			{#each coffees as coffee}
				<a
					href={`/${coffee.country.toLowerCase().replace(/\s/g, '-')}`}
					class="max-w-sm m-2 overflow-hidden rounded"
				>
					<img src={coffee.flag} alt={`${coffee.country} Flag`} class="w-full h-1/2 lg:h-3/4" />

					<div class="px-6 py-4">
						<h2 class="mb-2 text-lg lg:text-2xl font-bold text-white text-center">
							{coffee.country}
						</h2>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>

<style>
	.custom-img {
		background-color: rgb(12, 12, 12);
	}
</style>
