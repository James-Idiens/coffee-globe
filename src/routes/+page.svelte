<script>
	import anime from 'animejs';

	import { onMount } from 'svelte';

	// Define a function to start the animation
	const startAnimation = () => {
		anime
			.timeline({ loop: false })
			.add({
				targets: '.ml5 .line',
				opacity: [0.5, 1],
				scaleX: [0, 1],
				easing: 'easeInOutExpo',
				duration: 700
			})
			.add({
				targets: '.ml5 .line',
				duration: 600,
				easing: 'easeOutExpo',
				translateY: (el, i) => -0.625 + 0.625 * 2 * i + 'em'
			})
			.add({
				targets: '.ml5 .ampersand',
				opacity: [0, 1],
				scaleY: [0.5, 1],
				easing: 'easeOutExpo',
				duration: 600,
				offset: '-=600'
			})
			.add({
				targets: '.ml5 .letters-left',
				opacity: [0, 1],
				translateX: ['0.5em', 0],
				easing: 'easeOutExpo',
				duration: 600,
				offset: '-=300'
			})
			.add({
				targets: '.ml5 .letters-right',
				opacity: [0, 1],
				translateX: ['-0.5em', 0],
				easing: 'easeOutExpo',
				duration: 600,
				offset: '-=600'
			})
			.add({
				targets: '.ml5',
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

<header
	class="flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover custom-img"
>
	<div class="p-5 text-white ml5">
		<span class="text-wrapper">
			<span class="line line1"></span>
			<span class="letters letters-left">Around The World</span>
			<span class="letters letters-right">In 80 Cups</span>
			<span class="line line2"></span>
		</span>
	</div>
</header>

<div class="max-w-lg m-auto h-screen">
	<div class="block max-w-[18rem] rounded-lg bg-black-200">
		<div class="p-6">
			<p class="py-6 mb-4 font-bold text-4xl text-center leading-normal text-gradient-el-salvador">
				El Salvador
			</p>
		</div>
	</div>
</div>

<style>
	.text-gradient-el-salvador {
		background: linear-gradient(to right, #0b66c2, #ffffff, #0b66c2);
		-webkit-background-clip: text;
		color: transparent;
	}
	.custom-img {
		background-image: url('./heroimage.webp');
	}

	.ml5 {
		position: relative;
		font-weight: 300;
		font-size: 4.5em;
		color: #ffffff;
	}

	.ml5 .text-wrapper {
		position: relative;
		display: inline-block;
		padding-top: 0.1em;
		padding-right: 0.05em;
		padding-bottom: 0.15em;
		line-height: 1em;
	}

	.ml5 .line {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		height: 3px;
		width: 100%;
		background-color: #ffffff;
		transform-origin: 0.5 0;
	}
	.ml5 .letters {
		display: inline-block;
		opacity: 0;
	}

	@media (max-width: 768px) {
		.ml5 {
			font-size: 2.5em;
			text-align: center;
		}

		.ml5 .line {
			height: 0px;
		}
		.ml5 .text-wrapper {
			display: block;
			text-align: center;
		}
	}
</style>
