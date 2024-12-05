<script lang="ts">
    import adventCalendarData from '$lib/adventCalendarData.json';

    const adventCalendar = adventCalendarData;
</script>

<svelte:head>
    <title>Advent Calendar</title>
    <meta name="description" content="Advent Calendar Coffee Reviews" />
</svelte:head>

<div class="bg-black-100 text-white min-h-screen w-full overflow-y-auto flex items-center justify-center">
<div class="pt-16 container max-w-xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Advent Calendar Coffee Reviews</h1>
    {#each adventCalendar as coffee, index}
        <div class="mb-4 p-4 border rounded shadow">
            <h2 class="text-xl font-bold">Day {index + 1}</h2>
            <p><strong>Farm:</strong> {coffee.farm}</p>
            <p><strong>Origin:</strong> {coffee.origin}</p>
            <p><strong>Processing:</strong> {coffee.processing}</p>
            <p><strong>Processor:</strong> {coffee.processor}</p>
            <p><strong>Producer:</strong> {coffee.producer}</p>
            <p><strong>Altitude:</strong> {coffee.altitude}</p>
            <p><strong>Varietal:</strong> {coffee.varietal}</p>
            <p><strong>Tasting Notes:</strong> {coffee.tastingNotes}</p>
            <p><strong>Rating:</strong> {coffee.rating}</p>
            <p><strong>Review:</strong> {coffee.review}</p>
        </div>
    {/each}
</div>
</div>