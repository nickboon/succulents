<script>
	export let svg = null;
	export let prefix = document.title;

	$: attributes = {
		href: `data:application/octet-stream,${encodeURIComponent(svg)}`,
		download: `${prefix}_${Date.now()}.svg`
	};
</script>

<style>
	label {
		width: 6em;
	}
</style>

<div>
	<h2>
		<a href={attributes.href} download={attributes.download}>Download</a>
	</h2>
</div>
<div>
	<label for="prefix">Prefix</label>
	<input id="prefix" type="text" bind:value={prefix} />
</div>
