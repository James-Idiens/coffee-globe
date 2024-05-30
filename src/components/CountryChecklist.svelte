<script lang="ts">
	import coffeedata from '$lib/coffeedata.json';
	import countryProduction from '$lib/countryProduction.json';
	import type { countryProductionProps } from '../models/interfaces';
	import type { Coffee } from '../models/interfaces';
	import { countriesDoneLength } from '../store/countryNumber';

	const coffees = coffeedata.coffees;

	// I want to create a function to check what countries we have left by comparing the coffees country to the countryProduction country
	// There will be two arrays, one for the countries we have and one for the countries we don't have
	let topCountries = countryProduction.map((country: countryProductionProps) => {
		return country.country;
	});

	let countriesTried = coffees.map((coffee: Coffee) => {
		return coffee.country;
	});
	const countriesTriedSet = new Set(countriesTried);

	let countriesLeft: any[] = [];
	let countriesDone: any[] = [];

	function checkCountries() {
		topCountries.forEach((country: string) => {
			if (countriesTriedSet.has(country)) {
				countriesDone.push(country);
			} else {
				countriesLeft.push(country);
			}
		});
		countriesDoneLength.set(countriesDone.length);
	}

	checkCountries();
</script>

// display the arrays countiresLeft and countriesDone
<div>
	<h1 class="text-2xl">Countries Left</h1>
	{#each countriesLeft as country}
		<p>{country}</p>
	{/each}
	<h1 class="text-2xl">Countries Done: {countriesDone.length}</h1>
	{#each countriesDone as country}
		<p>{country}</p>
	{/each}
</div>
