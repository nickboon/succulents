<script>
	import PlantFactory from './plantFactory';
	import Colour from './colour';
	import ColourPolicy from './colourPolicy';
	import ScalePolicy from './scalePolicy.js';
	import defaults from './defaults.js';

	export let paths;
	export let svgWidth;
	export let svgHeight;

	function reset() {
		x = defaults.x;
		y = defaults.y;
		leafCount = defaults.leafCount;
		leafWidth = defaults.leafWidth;
		leafLength = defaults.leafLength;
		angleOffset = defaults.angleOffset;
		stemRadius = defaults.stemRadius;
		leafTiltFullRange = defaults.leafTiltFullRange;
		leafTiltMax = defaults.leafTiltMax;
		leafTiltMin = defaults.leafTiltMin;
		scalePolicyKey = defaults.scalePolicyKey;
		strokeColourKey = defaults.strokeColourKey;
		fillColourKey = defaults.fillColourKey;
		strokeColourPolicyKey = defaults.strokeColourPolicyKey;
		fillColourPolicyKey = defaults.fillColourPolicyKey;
		colourChangeRate = defaults.colourChangeRate;
		opacity = defaults.opacity;
		addLabel = defaults.addLabel;
	}
	const definedColourKeys = Object.keys(Colour.definedColours);
	const colourPolicyKeys = Object.keys(ColourPolicy);
	const scalePolicyKeys = Object.getOwnPropertyNames(
		Object.getPrototypeOf(new ScalePolicy())
	).filter(name => name !== 'constructor');

	defaults.leafTiltMax = PlantFactory.calculateLeafTiltLimit(
		defaults.leafTiltFullRange
	);
	defaults.x = svgWidth / 2;
	defaults.y = svgHeight / 2;
	let {
		x,
		y,
		leafCount,
		leafWidth,
		leafLength,
		angleOffset,
		stemRadius,
		leafTiltFullRange,
		leafTiltMax,
		leafTiltMin,
		scalePolicyKey,
		strokeColourKey,
		fillColourKey,
		strokeColourPolicyKey,
		fillColourPolicyKey,
		colourChangeRate,
		opacity,
		addLabel
	} = defaults;

	$: leafTiltLimit = PlantFactory.calculateLeafTiltLimit(leafTiltFullRange);
	$: leafTiltMax = leafTiltMax > leafTiltLimit ? leafTiltLimit : leafTiltMax;
	$: plantFactory = new PlantFactory({
		x,
		y,
		leafCount,
		leafWidth,
		leafLength,
		angleOffset,
		stemRadius,
		leafTiltMin,
		leafTiltMax,
		leafTiltFullRange,
		scalePolicyKey,
		strokeColourKey,
		fillColourKey,
		strokeColourPolicyKey,
		fillColourPolicyKey,
		colourChangeRate,
		opacity,
		addLabel
	});

	$: paths = plantFactory.build();
</script>

<style>
	h2 button {
		font-size: inherit;
		font-weight: inherit;
		border: none;
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

<h2>
	Options
	<button on:click={reset}>&circlearrowright;</button>
</h2>
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
		<input id="angleOffset" type="number" step="0.1" bind:value={angleOffset} />
	</div>
	<div>
		<label for="stemRadius">Stem Radius</label>
		<input id="stemRadius" type="number" min="0" bind:value={stemRadius} />
		<label for="scalePolicy">Scale Policy</label>
		<select id="scalePolicy" bind:value={scalePolicyKey}>
			{#each scalePolicyKeys as policyKey}
				<option value={policyKey}>{policyKey}</option>
			{/each}
		</select>
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
			bind:value={strokeColourKey}
			style="background:{strokeColourKey};">
			{#each definedColourKeys as colourKey}
				<option value={colourKey} style="background:{colourKey};" />
			{/each}
		</select>
		<select id="strokeColourPolicy" bind:value={strokeColourPolicyKey}>
			{#each colourPolicyKeys as policyKey}
				<option value={policyKey}>{policyKey}</option>
			{/each}
		</select>
	</div>
	<div>
		<label for="fillColour">Fill</label>
		<select
			id="fillColour"
			class="colour"
			style="background:{fillColourKey || 'white'};"
			bind:value={fillColourKey}>
			{#each definedColourKeys as colourKey}
				<option value={colourKey} style="background:{colourKey};" />
			{/each}
			<option value={{}} style="background:white">&boxtimes;</option>
		</select>
		<select id="fillColourPolicy" bind:value={fillColourPolicyKey}>
			{#each colourPolicyKeys as policyKey}
				<option value={policyKey}>{policyKey}</option>
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
</div>
