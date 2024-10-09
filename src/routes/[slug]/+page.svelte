<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import coffeeData from '$lib/coffeedata.json';
	import type { Coffee } from '../../models/interfaces';

	const slug = $page.params.slug;
	let coffee: Coffee | undefined;

	let continentColor: string = '';
	let isLoading = true;

	const asia = 'bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600';
	const africa = 'bg-gradient-to-r from-orange-600 via-yellow-600 to-green-600';
	const northAmerica = 'bg-gradient-to-r from-red-500 via-white to-blue-500';
	const southAmerica = 'bg-gradient-to-r from-green-500 via-yellow-500 to-blue-500';
	const fallback = 'bg-gradient-to-r from-blue-100 via-blue-300 to-white';
	const europe = 'bg-gradient-to-r from-blue-500 via-purple-500 to-red-500';
	const oceania = 'bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600';

	onMount(async () => {
		try {
			if (slug) {
				const countryName = slug ? slug.replace(/-/g, ' ') : '';

				coffee = coffeeData.coffees.find(
					//@ts-ignore
					(c: Coffee) => c.country.toLowerCase() === countryName.toLowerCase()
				);
			}

			const response = await fetch('src/lib/ne_110m_admin_0_countries.geojson');
			const continentData = await response.json();

			const continent = continentData.features.find(
				(feature: any) => feature.properties.ADMIN === coffee?.country
			)?.properties.CONTINENT;

			continentColor =
				continent === 'Asia'
					? asia
					: continent === 'Africa'
						? africa
						: continent === 'North America'
							? northAmerica
							: continent === 'South America'
								? southAmerica
								: continent === 'Europe'
									? europe
									: continent === 'Oceania'
										? oceania
										: fallback;
		} catch (error) {
			console.error('Error loading data:', error);
		} finally {
			isLoading = false; // Set isLoading to false once data is loaded
		}
	});

	let angle = 0;
	let startX: number | null = null;
	let isDragging = false;

	function galleryspin(sign: string) {
		const spinner = document.querySelector('#spinner') as HTMLElement;
		if (!sign) {
			angle += 90;
		} else {
			angle -= 90;
		}
		spinner.style.transform = `rotateY(${angle}deg)`;
	}

	function handleTouchStart(event: TouchEvent) {
		startX = event.touches[0].clientX;
		isDragging = true;
	}

	function handleTouchMove(event: TouchEvent) {
		if (!isDragging) return;

		const currentX = event.touches[0].clientX;
		const deltaX = currentX - (startX as number);

		if (Math.abs(deltaX) > 50) {
			if (deltaX > 0) {
				galleryspin('-');
			} else {
				galleryspin('');
			}
			isDragging = false;
		}
	}

	function handleTouchEnd() {
		startX = null;
		isDragging = false;
	}

	function handleMouseDown(event: MouseEvent) {
		startX = event.clientX;
		isDragging = true;
	}

	function handleMouseMove(event: MouseEvent) {
		if (!isDragging) return;

		const currentX = event.clientX;
		const deltaX = currentX - (startX as number);

		if (Math.abs(deltaX) > 50) {
			if (deltaX > 0) {
				galleryspin('');
			} else {
				galleryspin('-');
			}
			isDragging = false;
		}
	}

	function handleMouseUp() {
		startX = null;
		isDragging = false;
	}

	onMount(() => {
		window.addEventListener('mouseup', handleMouseUp);
		return () => {
			window.removeEventListener('mouseup', handleMouseUp);
		};
	});
</script>

<svelte:head>
	<title>Single Origin Odyssey</title>
	<meta name="description" content="Single origin coffee from around the world" />
</svelte:head>

<div class="bg-black-100 min-h-screen w-full overflow-y-auto flex items-center justify-center">
	<div class="container">
		{#if isLoading}
			<!-- Loading Spinner -->
			<div class="flex justify-center items-center h-screen">
				<svg class="animate-spin h-7 w-7 text-white" viewBox="0 0 24 24">
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					/>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
			</div>
		{:else if coffee}
			<!-- Existing Coffee Details -->
			<div
				id="carousel"
				class="p-10 mb-12 overflow-hidden relative"
				on:touchstart={handleTouchStart}
				on:touchmove={handleTouchMove}
				on:touchend={handleTouchEnd}
				on:mousedown={handleMouseDown}
				on:mousemove={handleMouseMove}
				role="button"
				tabindex="0"
			>
				<figure id="spinner">
					<div class="card">
						<!-- Card 1 Content -->
						<div class="relative">
							<div class="w-3/4 lg:w-full sm:max-w-md mx-auto mb-8">
								<img
									src={coffee.image}
									alt="Coffee"
									class="w-full rounded-md h-auto md:h-64 object-scale-down object-center"
								/>
							</div>
						</div>
					</div>
					<div class="card p-6">
						<!-- Card 2 Content -->
						<div class="h-auto w-full lg:w-[500px] relative group">
							<div
								class="{continentColor} absolute -inset-1 rounded-md blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
							/>
							<div class="relative bg-black-100 rounded-lg overflow-hidden p-[2px]">
								<div class="p-4 md:py-4 md:px-8">
									<h1 class="text-3xl font-bold text-white mb-4">Country: {coffee.country}</h1>
									<p class="text-gray-400">
										<span class="font-bold">Region: </span>{coffee.region}
									</p>
									<p class="text-gray-400">
										<span class="font-bold">Producer: </span>{coffee.producer}
									</p>
									<p class="text-gray-400">
										<span class="font-bold">Process: </span>{coffee.process}
									</p>
									<p class="text-gray-400">
										<span class="font-bold">Variety: </span>{coffee.variety}
									</p>
									<p class="text-gray-400">
										<span class="font-bold">Tasting Notes: </span>{coffee.tastingNotes.join(', ')}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="card p-6">
						<!-- Card 3 Content -->

						<div class="h-auto w-full relative group">
							<div
								class="bg-gradient-to-r from-gray-100 to-gray-300 absolute -inset-1 rounded-md blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
							/>
							<div class="relative bg-black-100 rounded-lg overflow-hidden p-6">
								<span class="font-medium text-lg text-white">Ed's Comments</span><br />
								<i class="text-white">{coffee["Ed's comments"]}</i>
							</div>
						</div>
					</div>
					<div class="card p-6">
						<!-- Card 4 Content -->
						<div class="h-auto w-full relative group">
							<div
								class="bg-gradient-to-r from-gray-100 to-gray-300 absolute -inset-1 rounded-md blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
							/>
							<div class="relative bg-black-100 rounded-lg overflow-hidden p-6">
								<span class="font-medium text-lg text-white">James' Comments:</span><br />
								<i class="text-white">{coffee["James' comments"]}</i>
							</div>
						</div>
					</div>
				</figure>
			</div>
		{:else}
			<div class="flex justify-center">
				<p class="text-white text-center">
					We haven't made it to {slug
						.replace(/-/g, ' ')
						.split(' ')
						.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
						.join(' ')}, but rest assured, if they grow coffee, we'll be buying it.
				</p>
			</div>
		{/if}
		<div class="flex justify-between items-center mt-4">
			<button
				class="text-white text-2xl cursor-pointer mx-4"
				on:click={() => galleryspin('')}
				aria-label="Previous"
			>
				&lt;
			</button>
			<button
				class="text-white text-base font-light cursor-pointer mx-4 back-button"
				on:click={() => window.history.back()}
				aria-label="Back"
			>
				<span class="pr-1">&#8592;</span><span class="font-light text-base">Back</span>
			</button>
			<button
				class="text-white text-2xl cursor-pointer mx-4"
				on:click={() => galleryspin('-')}
				aria-label="Next"
			>
				&gt;
			</button>
		</div>
	</div>
</div>

<style>
	#carousel {
		perspective: 1200px;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	#spinner {
		transform-style: preserve-3d;
		height: 300px;
		transform-origin: 50% 50% -150px;
		transition: transform 1s;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.card {
		position: absolute;
		transform-origin: 50% 50% -150px;
		color: black;
		padding: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 400px;
		height: 300px;
	}

	.card:nth-child(1) {
		transform: rotateY(0deg) translateZ(150px);
	}

	.card:nth-child(2) {
		transform: rotateY(90deg) translateZ(150px);
	}

	.card:nth-child(3) {
		transform: rotateY(180deg) translateZ(150px);
	}

	.card:nth-child(4) {
		transform: rotateY(270deg) translateZ(150px);
	}

	/* @media (min-width: 640px) {
		.card {
			width: 100px;
			height: 70px;
		}
	} */

	@media (min-width: 300px) {
		.card {
			width: 300px;
			height: 200px;
		}
	}
	@media (min-width: 640px) {
		.card {
			width: 400px;
			height: 300px;
		}
	}
</style>
