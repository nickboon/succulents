<script>
	import SvgDownloadLink from './SvgDownloadLink.svelte';
	import SvgFactory from './svg';
	import PlantFactory from './plantFactory';
	import Colour from './colour';
	import ColourPolicy from './colourPolicy';

	const definedColourKeys = Object.keys(Colour.definedColours);
	const colourPolicyKeys = Object.keys(ColourPolicy);

	// svg varaiables
	const w = window.innerWidth * 0.6;
	const h = window.innerHeight;

	let leafCount = 60;
	let leafWidth = 0.5;
	let leafLength = 0.5;
	let angleOffset = 0;
	let stemRadius = 10;
	let leafTiltFullRange = 100;
	let leafTiltMax = PlantFactory.calculateLeafTiltLimit(leafTiltFullRange);
	let leafTiltMin = 0;
	let stroke = Colour.definedColours.green;
	let fill = Colour.definedColours.white;
	let strokeColourPolicy = ColourPolicy.constant;
	let fillColourPolicy = ColourPolicy.constant;
	let colourChangeRate = 1;
	let opacity = 1;
	let addLabel = true;

	$: leafTiltLimit = PlantFactory.calculateLeafTiltLimit(leafTiltFullRange);
	$: leafTiltMax = leafTiltMax > leafTiltLimit ? leafTiltLimit : leafTiltMax;
	$: plantFactory = new PlantFactory({
		x: w / 2,
		y: window.innerHeight / 2,
		leafCount,
		leafWidth,
		leafLength,
		angleOffset,
		stemRadius,
		leafTiltMin,
		leafTiltMax,
		leafTiltFullRange,
		stroke,
		fill,
		strokeColourPolicy,
		fillColourPolicy,
		colourChangeRate,
		opacity,
		addLabel
	});

	const svgFactory = new SvgFactory();
	$: svg = [
		svgFactory.openSvg(w, h),
		plantFactory.build(),
		svgFactory.closeSvg()
	].join('');
</script>

<style>
	#app {
		color: #555;
		margin: 28px;
	}
	h1 {
		border: 1px solid #555;
		margin-bottom: 0px;
		padding: 0.6em 1em;
	}
	#content {
		display: flex;
		border-right: 1px solid #555;
		border-left: 1px solid #555;
		border-bottom: 1px solid #555;
	}
	#options {
		flex: 38.2%;
		border-right: 1px solid #555;
		padding: 1em;
	}
	#svg {
		flex: 61.8%;
		overflow: hidden;
	}
	label {
		width: 6em;
	}
	select,
	input {
		width: 4em;
		margin-right: 1em;
	}
	select#strokeColourPolicy,
	select#fillColourPolicy {
		width: 7em;
	}
</style>

<div id="app">
	<h1>Succulent SVG Generator</h1>
	<div id="content">
		<div id="options">
			<h2>Options</h2>
			<div>
				<h3>Leaf</h3>
				<div>
					<label for="leafWidth">Width</label>
					<input
						id="leafWidth"
						type="number"
						step="0.1"
						bind:value={leafWidth}
						min="0" />
					<label for="leafLength">Length</label>
					<input
						id="leafLength"
						type="number"
						step="0.1"
						min="0"
						bind:value={leafLength} />
				</div>
				<div>
					<label for="leafCount">Count</label>
					<input id="leafCount" type="number" min="0" bind:value={leafCount} />
					<label for="angleOffset">Rotation</label>
					<input
						id="angleOffset"
						type="number"
						step="0.1"
						bind:value={angleOffset} />
				</div>
				<div>
					<label for="stemRadius">Stem Radius</label>
					<input
						id="stemRadius"
						type="number"
						min="0"
						bind:value={stemRadius} />
				</div>
				<h4>Tilt</h4>
				<div>
					<label for="leafTiltMin">Min</label>
					<input
						id="leafTiltMin"
						type="number"
						min="0"
						max={leafTiltLimit}
						bind:value={leafTiltMin} />
					<label for="leafTiltMax">Max</label>
					<input
						id="leafTiltMax"
						type="number"
						min="0"
						max={leafTiltLimit}
						bind:value={leafTiltMax} />
				</div>
				<div>
					<label for="leafTiltFullRange">Steps</label>
					<input
						id="leafTiltFullRange"
						type="number"
						min="1"
						bind:value={leafTiltFullRange} />
				</div>
			</div>
			<div>
				<h3>Colour</h3>
				<div>
					<label for="strokeColour">Stroke</label>
					<select
						id="strokeColour"
						class="colour"
						bind:value={stroke}
						style="background:{stroke.hexString};">
						{#each definedColourKeys as colourKey}
							<option
								value={Colour.definedColours[colourKey]}
								style="background:{colourKey};" />
						{/each}
					</select>
					<select id="strokeColourPolicy" bind:value={strokeColourPolicy}>
						{#each colourPolicyKeys as policyKey}
							<option value={ColourPolicy[policyKey]}>{policyKey}</option>
						{/each}
					</select>
				</div>
				<div>
					<label for="fillColour">Fill</label>
					<select
						id="fillColour"
						class="colour"
						style="background:{fill.hexString || 'white'};"
						bind:value={fill}>
						{#each definedColourKeys as colourKey}
							<option
								value={Colour.definedColours[colourKey]}
								style="background:{Colour.definedColours[colourKey].hexString};" />
						{/each}
						<option value={{}} style="background:white">&empty;</option>
					</select>
					<select id="fillColourPolicy" bind:value={fillColourPolicy}>
						{#each colourPolicyKeys as policyKey}
							<option value={ColourPolicy[policyKey]}>{policyKey}</option>
						{/each}
					</select>
				</div>
				<label for="colourChangeRate">Change Rate</label>
				<input
					id="colourChangeRate"
					type="number"
					min="0"
					bind:value={colourChangeRate} />
				<label for="opacity">Opacity</label>
				<input
					id="opacity"
					type="number"
					min="0"
					max="1"
					step="0.1"
					bind:value={opacity} />
			</div>
			<div>
				<h3>SVG</h3>
				<label for="addLabel">Annotate</label>
				<input id="addLabel" type="checkbox" bind:checked={addLabel} />
				<SvgDownloadLink {svg} />
			</div>
		</div>

		<div id="svg">
			{@html svg}
		</div>
		<div style="clear:both;" />
	</div>
</div>
