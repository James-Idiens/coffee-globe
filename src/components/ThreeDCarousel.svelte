<script lang="ts">
	import { onMount } from 'svelte';

	let angle = 0;
	let startX: number | null = null;
	let isDragging = false;

	function galleryspin(sign: string) {
		const spinner = document.querySelector("#spinner") as HTMLElement;
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
		width: 80%;
		max-width: 425px;
		position: absolute;
		transform-origin: 50% 50% -150px;
		outline: 1px solid transparent;
		background-color: white;
		color: black;
		padding: 20px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
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

	@media (min-width: 640px) {
		.card {
			width: 350px;
			height: 250px;
		}
	}

	@media (min-width: 1024px) {
		.card {
			width: 400px;
			height: 300px;
		}
	}
</style>

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
		<div class="card bg-white shadow-lg rounded-lg p-6">
			<!-- Card 1 Content -->
			<p class="text-center text-xl">Card 1</p>
		</div>
		<div class="card bg-white shadow-lg rounded-lg p-6">
			<!-- Card 2 Content -->
			<p class="text-center text-xl">Card 2</p>
		</div>
		<div class="card bg-white shadow-lg rounded-lg p-6">
			<!-- Card 3 Content -->
			<p class="text-center text-xl">Card 3</p>
		</div>
		<div class="card bg-white shadow-lg rounded-lg p-6">
			<!-- Card 4 Content -->
			<p class="text-center text-xl">Card 4</p>
		</div>
	</figure>
</div>
<button
	class="ss-icon float-left text-white text-2xl cursor-pointer"
	on:click={() => galleryspin('')}
	aria-label="Previous"
>
	&lt;
</button>
<button
	class="ss-icon float-right text-white text-2xl cursor-pointer"
	on:click={() => galleryspin('-')}
	aria-label="Next"
>
	&gt;
</button>
