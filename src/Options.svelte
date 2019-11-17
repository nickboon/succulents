<script>
	import preset from './preset';
	import PlantFactory from './plantFactory';
	import Colour from './colour';
	import ColourPolicy from './colourPolicy';
	import ScalePolicy from './scalePolicy.js';

	export let paths;
	export let svgWidth;
	export let svgHeight;

	function getCurrentPreset() {
		return preset.load(presetKey, svgWidth / 2, svgHeight / 2);
	}
	function reload() {
		const currentPreset = getCurrentPreset();
		x = currentPreset.x;
		y = currentPreset.y;
		leafCount = currentPreset.leafCount;
		leafWidth = currentPreset.leafWidth;
		leafLength = currentPreset.leafLength;
		scalePolicyKey = currentPreset.scalePolicyKey;
		curlInnerLeaves = currentPreset.curlInnerLeaves;
		angleOffset = currentPreset.angleOffset;
		stemRadius = currentPreset.stemRadius;
		leafTiltFullRange = currentPreset.leafTiltFullRange;
		leafTiltMax = currentPreset.leafTiltMax;
		leafTiltMin = currentPreset.leafTiltMin;
		strokeColourKey = currentPreset.strokeColourKey;
		fillColourKey = currentPreset.fillColourKey;
		strokeColourPolicyKey = currentPreset.strokeColourPolicyKey;
		fillColourPolicyKey = currentPreset.fillColourPolicyKey;
		colourChangeRate = currentPreset.colourChangeRate;
		opacity = currentPreset.opacity;
		addLabel = currentPreset.addLabel;
	}

	const presetKeys = Object.keys(preset.keys);
	const definedColourKeys = Object.keys(Colour.definedColours);
	const colourPolicyKeys = Object.keys(ColourPolicy);
	const scalePolicyKeys = Object.getOwnPropertyNames(
		Object.getPrototypeOf(new ScalePolicy())
	).filter(name => name !== 'constructor');

	let presetKey = presetKeys[0];
	let {
		x,
		y,
		leafCount,
		leafWidth,
		leafLength,
		scalePolicyKey,
		curlInnerLeaves,
		angleOffset,
		stemRadius,
		leafTiltFullRange,
		leafTiltMax,
		leafTiltMin,
		strokeColourPolicyKey,
		strokeColourKey,
		fillColourKey,
		fillColourPolicyKey,
		colourChangeRate,
		opacity,
		addLabel
	} = getCurrentPreset();

	$: leafTiltLimit = PlantFactory.calculateLeafTiltLimit(leafTiltFullRange);
	$: leafTiltMax = leafTiltMax > leafTiltLimit ? leafTiltLimit : leafTiltMax;
	$: plantFactory = new PlantFactory({
		x,
		y,
		leafCount,
		leafWidth,
		leafLength,
		scalePolicyKey,
		curlInnerLeaves,
		angleOffset,
		stemRadius,
		leafTiltMin,
		leafTiltMax,
		leafTiltFullRange,
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
	button.reloadButton {
		font-size: inherit;
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

<h2>Options</h2>
<div>
	<label for="preset">Preset</label>
	<select id="preset" bind:value={presetKey} on:click={reload}>
		{#each presetKeys as key}
			<option value={key}>{key}</option>
		{/each}
	</select>
	<button class="reloadButton" on:click={reload}>&circlearrowright;</button>
</div>
<div>
	<h3>Leaf</h3>
	<div>
		<label for="leafWidth">Width</label>
		<input
			id="leafWidth"
			type="number"
			step="0.05"
			bind:value={leafWidth}
			min="0" />
		<label for="leafLength">Length</label>
		<input
			id="leafLength"
			type="number"
			step="0.05"
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
		<label for="curlInnerLeaves">Adjust Inner</label>
		<input
			type="checkbox"
			id="curlInnerLeaves"
			bind:checked={curlInnerLeaves} />
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
