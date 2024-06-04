<script lang="ts">
	import coffeedata from '$lib/coffeedata.json';
	import countryProduction from '$lib/countryProduction.json';
	import type { countryProductionProps } from '../models/interfaces';
	import type { Coffee } from '../models/interfaces';

	const coffees = coffeedata.coffees;

	let topCountries = countryProduction.map((country: countryProductionProps) => {
		return country.country;
	});

	let countriesTried = coffees.map((coffee: Coffee) => {
		return coffee.country;
	});
	const countriesTriedSet = new Set(countriesTried);

	let countriesLeft: string[] = [];

	function checkCountries() {
		topCountries.forEach((country: string) => {
			if (!countriesTriedSet.has(country)) {
				countriesLeft.push(country);
			}
		});
		countriesLeft.sort();
	}

	checkCountries();

	// Export the data as props
	export let displayOption = 'countriesLeft';
	console.log(countriesLeft);
</script>

{#if displayOption === 'countriesLeft'}
	<div>
		{#each countriesLeft as country}
			<p>{country}</p>
		{/each}
	</div>
{:else if displayOption === 'countriesDoneLength'}
	<div>
		<p class="text-l">{countriesTriedSet.size}</p>
	</div>
{:else if displayOption === 'countriesDone'}
	<div>
		{#each Array.from(countriesTriedSet).sort() as country}
			<div id="countriesTried">
				<p>{country}</p>
			</div>
		{/each}
	</div>
{:else}
	<div>
		<p>Invalid display option</p>
	</div>
{/if}
