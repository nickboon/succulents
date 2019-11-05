<script>
	export let svg = null;
	export let prefix = document.title;

	$: attributes = {
		href: `data:application/octet-stream,${encodeURIComponent(svg)}`,
		download: `${prefix}_${Date.now()}.svg`
	};
</script>

<a href={attributes.href} download={attributes.download}>Download</a>
