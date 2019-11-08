<script>
	export let width = 100;
	export let height = 100;
	export let stroke = 'black';
	export let fill = 'white';
	export let opacity = 1;
</script>

<svg
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	{width}
	{height}
	{stroke}
	{fill}
	{opacity}>
	<slot />
</svg>
