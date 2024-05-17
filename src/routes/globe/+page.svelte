<script lang="ts">
	import { onMount } from 'svelte';
	import coffees from '../../lib/coffeedata.json'; // Assuming coffees.json is in the same directory
	import type { Coffee } from '../../models/interfaces';

	let Globe;

	const coffeeMap = new Map(coffees.coffees.map((coffee) => [coffee.country, coffee]));
	const countriesTried = new Set(coffees.coffees.map((coffee) => coffee.country));

	onMount(async () => {
		if (typeof window !== 'undefined') {
			const module = await import('globe.gl');
			Globe = module.default;

			// Fetch the GeoJSON data
			const response = await fetch('src/lib/ne_110m_admin_0_countries.geojson');
			const countries = await response.json();

			Globe()
				.globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
				.hexPolygonsData(countries.features)
				.hexPolygonResolution(3)
				.hexPolygonMargin(0.3)
				.hexPolygonUseDots(true)
				.hexPolygonColor((d: any) => {
					if (countriesTried.has(d.properties.ADMIN)) {
						// Random color for countries tried
						return `#${Math.round(Math.random() * Math.pow(2, 24))
							.toString(16)
							.padStart(6, '0')}`;
					} else {
						// Default gray color for countries not tried
						return '#888888';
					}
				})
				// @ts-ignore - TS2339: Property 'hexPolygonLabel' does not exist on type 'GlobeInstance'.
				.hexPolygonLabel(({ properties: d }: { properties: any }) => {
					// if the country is not in the set, don't show the label
					if (!countriesTried.has(d.ADMIN)) return '';
					else {
						// Country names of coffees we've tried
						const coffeeInfo: Coffee = coffeeMap.get(d.ADMIN) as Coffee;
						return `

						<div>
							<div class="bg-gray bg-opacity-50 p-2 rounded-md">
							<b>${d.ADMIN}</b> <br />
							Region: ${coffeeInfo.region} <br />
							Tasting Notes: ${coffeeInfo.tastingNotes.join(', ')} <br />
							Producer: ${coffeeInfo.producer} <br />
							Process: ${coffeeInfo.process} <br />
							Variety: ${coffeeInfo.variety} <br />
							</div>
							`;
					}
				})
				.onHexPolygonClick((polygon: { properties: { ADMIN: any } }) => {
					const countryName = polygon.properties.ADMIN;
					const newUrl = `http://localhost:5173/${countryName.toLowerCase()}`;
					window.location.href = newUrl;
				})(document.getElementById('globeViz') as HTMLElement);
			document.getElementById('globeViz') as HTMLElement;
		}
	});
</script>

<div id="globeViz"></div>
