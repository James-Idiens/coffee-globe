<script lang="ts">
	import anime from 'animejs';
	import { onMount } from 'svelte';
	import coffeeData from '$lib/coffeedata.json';

	const coffees = coffeeData.coffees;

	// Define a function to start the animation
	const startAnimation = () => {
		// Select the text wrapper element
		let textWrapper = document.querySelector('.ml11 .letters');
		// @ts-ignore next line
		textWrapper.innerHTML = textWrapper.textContent.replace(
			/([^\x00-\x80]|\w)/g,
			"<span class='letter'>$&</span>"
		);

		anime
			.timeline()
			.add({
				targets: '.ml11 .letter',
				opacity: [0, 1],
				easing: 'easeOutExpo',
				duration: 600,
				delay: (el, i) => 34 * i
			})
			.add({
				targets: '.ml11',
				opacity: 1,
				duration: 1000,
				easing: 'easeOutExpo',
				delay: 1000
			});
	};

	onMount(() => {
		startAnimation();
	});
</script>

<div class="bg-fixed bg-center bg-cover custom-img">
	<header class="flex items-center justify-center h-screen mb-12">
		<div class="p-5">
			<h1 class="ml11">
				<span class="text-wrapper">
					<span class="letters text-white">Around the World in 80 Cups</span>
				</span>
			</h1>
		</div>
	</header>

	<!-- Country Cards Section -->
	<div class="container mx-auto py-12">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each coffees as coffee}
				<a
					href={`/${coffee.country.toLowerCase().replace(/\s/g, '-')}`}
					class="max-w-sm m-2 overflow-hidden rounded"
				>
					<img src={coffee.flag} alt={`${coffee.country} Flag`} class="w-full h-3/4" />

					<div class="px-6 py-4">
						<h2 class="mb-2 text-2xl font-bold text-white text-center">{coffee.country}</h2>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>

<style>
	.custom-img {
		background-image: url('./heroimage.webp');
	}

	.ml11 {
		font-weight: 700;
		font-size: 3.5em;
	}

	.ml11 .text-wrapper {
		position: relative;
		display: inline-block;
		padding-top: 0.1em;
		padding-right: 0.05em;
		padding-bottom: 0.15em;
	}
</style>
