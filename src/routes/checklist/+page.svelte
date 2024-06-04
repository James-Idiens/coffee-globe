<script lang="ts">
	import CountryChecklist from '../../components/CountryChecklist.svelte';
</script>

<div class="bg-black-100 h-screen w-full text-white flex flex-col items-center justify-center">
	<h1 class="text-4xl mb-8">Countries Left</h1>
		<CountryChecklist displayOption="countriesLeft" />
</div>
