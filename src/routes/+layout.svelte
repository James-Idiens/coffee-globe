<script>
	import '../app.css';
</script>

<slot />

<style lang="postcss">
	:global(body) {
		@apply bg-black-100 text-white overflow-hidden;
	}
</style>
