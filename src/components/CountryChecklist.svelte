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
	let countriesDone: string[] = [];

	function checkCountries() {
		topCountries.forEach((country: string) => {
			if (countriesTriedSet.has(country)) {
				countriesDone.push(country);
			} else {
				countriesLeft.push(country);
			}
			countriesLeft.sort();
			countriesDone.sort();
		});
	}

	checkCountries();

	// Export the data as props
	export let displayOption = 'countriesLeft';
</script>

{#if displayOption === 'countriesLeft'}
	<div>
		{#each countriesLeft as country}
			<p>{country}</p>
		{/each}
	</div>
{:else if displayOption === 'countriesDoneLength'}
	<div>
		<p class="text-l">{countriesDone.length}</p>
	</div>
{:else if displayOption === 'countriesDone'}
	<div>
		{#each countriesDone as country}
			<div>
				<p>{country}</p>
			</div>
		{/each}
	</div>
{/if}
