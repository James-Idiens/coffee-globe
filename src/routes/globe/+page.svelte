<script lang="ts">
	import { onMount } from 'svelte';

	let Globe;
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
				.hexPolygonColor(
					() =>
						`#${Math.round(Math.random() * Math.pow(2, 24))
							.toString(16)
							.padStart(6, '0')}`
				)
				.hexPolygonLabel( // ignore as this is correct
					({ properties: d }: { properties: any }) => `
					<b>${d.ADMIN} (${d.ISO_A2})</b> <br />
					Population: <i>${d.POP_EST}</i>
				`
				)(document.getElementById('globeViz') as HTMLElement);
		}
	});
</script>

<div id="globeViz"></div>
