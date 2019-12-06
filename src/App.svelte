<script>
	import Parameters from './Parameters.svelte';
	import SvgDownloadLink from './SvgDownloadLink.svelte';
	import SvgFactory from './svg';

	const svgFactory = new SvgFactory();
	let svgWidth = window.innerWidth * 0.618;
	let svgHeight = window.innerHeight * 0.618;
	$: paths = '';
	$: svg =
		svgFactory.openSvg(svgWidth, svgHeight) + paths + svgFactory.closeSvg();
	$: svgFile = svgFactory.declaration() + svg;
</script>

<style>
	#app {
		color: #555;
		margin: 28px;
	}
	header,
	footer {
		border: 1px solid #555;
		margin-bottom: 0px;
		padding: 0 1em 0.6em;
	}
	.row {
		display: flex;
		border-right: 1px solid #555;
		border-left: 1px solid #555;
	}
	#optionsPanel {
		flex: 38.2%;
		border-right: 1px solid #555;
		padding: 0 1em 1em;
	}
	#svgPanel {
		flex: 61.8%;
		overflow: hidden;
	}
</style>

<div id="app">
	<header>
		<h1>Succulent Design SVG Generator</h1>
	</header>
	<div class="row">
		<div id="optionsPanel">
			<Parameters bind:paths {svgWidth} {svgHeight} />
		</div>
		<div id="svgPanel">
			{@html svg}
		</div>
	</div>
	<footer>
		<SvgDownloadLink svg={svgFile} />
	</footer>
</div>
