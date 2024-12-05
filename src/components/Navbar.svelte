<script lang="ts">
	import { onMount } from 'svelte';
	import CountryChecklist from './CountryChecklist.svelte';
	let showDropdown = false;

	function toggleDropdown() {
		showDropdown = !showDropdown;
	}
	// if the user clicks outside the dropdown, close it
	// if the user clicks anywhere on the nav close it

	onMount(() => {
		document.addEventListener('click', (event) => {
			const dropdown = document.querySelector('.absolute');
			if (dropdown && !dropdown.contains(event.target as Node)) {
				showDropdown = false;
			}
		});
	});
</script>

<nav class="absolute z-50 top-0 left-0 w-full bg-transparent text-white p-4">
	<div class="container mx-auto flex justify-between items-center">
		<a
			href="/"
			class="text-xl font-playfair font-medium font-italic bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-200 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500"
		>
			Single Origin Odyssey
		</a>
		<ul class="flex space-x-4 text-sm md:text-lg">
			<li><a href="/" class="hover:text-gray-300">Home</a></li>
			<li><a href='/advent' class="hover:text-gray-300">Advent Calendar</a></li>
			<li><a href="/countries" class="hover:text-gray-300">90's Version</a></li>
			<li class="relative">
				<button
					class="hover:text-gray-300 flex items-center"
					on:click|preventDefault={toggleDropdown}
				>
					Countries tried:
					<span class="ml-1">
						<CountryChecklist displayOption="countriesDoneLength" />
					</span>
					<svg class="ml-2 w-4 h-4 fill-current" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
				{#if showDropdown}
					<div
						role="menu"
						class="absolute left-auto right-0 mt-2 w-44 bg-gray-800 rounded-md shadow-lg p-2 overflow-y-scroll max-h-[90vh] whitespace-normal overflow-wrap break-words scrollbar-hide text-base"
						tabindex="0"
						aria-label="menu"
					>
						<span class="mr-2"><CountryChecklist displayOption="countriesDone" /></span>
					</div>
				{/if}
			</li>
		</ul>
	</div>
</nav>

<style>
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
