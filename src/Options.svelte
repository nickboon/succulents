<script>
	import preset from './preset';
	import LeafSvg from './leaf';
	import SvgFactory from './svg';
	import Plant from './plant';
	import Colour from './colour';
	import ColourPolicy from './colourPolicy';
	import ScalePolicy from './scalePolicy';
	import RandomPlant from './randomPlant';

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
		leafKey = currentPreset.leafKey;
		leafCount = currentPreset.leafCount;
		leafWidth = currentPreset.leafWidth;
		leafLength = currentPreset.leafLength;
		scalePolicyKey = currentPreset.scalePolicyKey;
		curlInnerLeaves = currentPreset.curlInnerLeaves;
		angleOffset = currentPreset.angleOffset;
		stemRadius = currentPreset.stemRadius;
		leafTiltFullRange = currentPreset.leafTiltFullRange;
		leafTiltMaxDegrees = currentPreset.leafTiltMaxDegrees;
		leafTiltMinDegrees = currentPreset.leafTiltMinDegrees;
		strokeColourKey = currentPreset.strokeColourKey;
		fillColourKey = currentPreset.fillColourKey;
		strokeColourPolicyKey = currentPreset.strokeColourPolicyKey;
		fillColourPolicyKey = currentPreset.fillColourPolicyKey;
		colourChangeRate = currentPreset.colourChangeRate;
		opacity = currentPreset.opacity;
	}

	function loadRandomLeaf() {
		const randomLeaf = RandomPlant.leaf;
		leafKey = randomLeaf.leafKey;
		leafCount = randomLeaf.leafCount;
		leafWidth = randomLeaf.leafWidth;
		leafLength = randomLeaf.leafLength;
		curlInnerLeaves = randomLeaf.curlInnerLeaves;
		scalePolicyKey = randomLeaf.scalePolicyKey;
	}

	function loadRandomPhyllotaxis() {
		const randomPhyllotaxis = RandomPlant.phyllotaxis;
		angleOffset = randomPhyllotaxis.angleOffset;
		stemRadius = randomPhyllotaxis.stemRadius;
		leafTiltFullRange = randomPhyllotaxis.leafTiltFullRange;
		leafTiltMaxDegrees = randomPhyllotaxis.leafTiltMaxDegrees;
		leafTiltMinDegrees = randomPhyllotaxis.leafTiltMinDegrees;
	}

	function loadRandomColour() {
		const randomColour = RandomPlant.colour;
		strokeColourKey = randomColour.strokeColourKey;
		fillColourKey = randomColour.fillColourKey;
		strokeColourPolicyKey = randomColour.strokeColourPolicyKey;
		fillColourPolicyKey = randomColour.fillColourPolicyKey;
		colourChangeRate = randomColour.colourChangeRate;
	}

	function loadRandomPlant() {
		loadRandomLeaf();
		loadRandomPhyllotaxis();
		loadRandomColour();
	}

	const svgFactory = new SvgFactory();
	function getSvgDataUrl(type) {
		const leaf = LeafSvg[type].build('black', 'white', 1, 'scale(0.4)');
		const svg = '<svg>' + leaf + svgFactory.closeSvg();
		return `data:image/svg+xml;charset=UTF-8,${svg}`;
	}

	const presetKeys = preset.keys;
	const definedColourKeys = Colour.keys;
	const colourPolicyKeys = ColourPolicy.keys;
	const scalePolicyKeys = ScalePolicy.keys;
	const leafKeys = LeafSvg.keys;

	const thumbnailScale = 0.4;
	const thumbnailWidth =
		Math.max(...leafKeys.map(key => LeafSvg[key].w)) * thumbnailScale;
	const thumbnailHeight =
		Math.max(...leafKeys.map(key => LeafSvg[key].h)) * thumbnailScale;
	const thumbnailStroke = '#555';
	const thumbnailFill = '#fff';
	const thumbnailOpacity = 1;

	let presetKey = presetKeys[0];
	let {
		x,
		y,
		leafKey,
		leafCount,
		leafWidth,
		leafLength,
		scalePolicyKey,
		curlInnerLeaves,
		angleOffset,
		stemRadius,
		leafTiltFullRange,
		leafTiltMaxDegrees,
		leafTiltMinDegrees,
		strokeColourPolicyKey,
		strokeColourKey,
		fillColourKey,
		fillColourPolicyKey,
		colourChangeRate,
		opacity
	} = getCurrentPreset();
	let addLabel = true;

	$: plant = new Plant({
		x,
		y,
		leafKey,
		leafCount,
		leafWidth,
		leafLength,
		scalePolicyKey,
		curlInnerLeaves,
		angleOffset,
		stemRadius,
		leafTiltMinDegrees,
		leafTiltMaxDegrees,
		leafTiltFullRange,
		strokeColourKey,
		fillColourKey,
		strokeColourPolicyKey,
		fillColourPolicyKey,
		colourChangeRate,
		opacity
	});

	$: leafTiltIncrementInDegrees = Math.floor(360 / leafTiltFullRange);
	$: plantPaths = plant.buildPaths();
	$: paths = plantPaths + (addLabel ? plant.label : '');
</script>

<style>
	button.icon-button {
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
	input[type='checkbox'] {
		width: auto;
	}
	select#strokeColourPolicy,
	select#fillColourPolicy {
		width: 7em;
	}

	input.hidden {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}
	label.leaf-option {
		display: inline;
		cursor: pointer;
	}
	label.leaf-option svg,
	label.leaf-option input {
		cursor: pointer;
	}
	i {
		font-style: normal;
	}
	i.shuffle:after {
		content: '\1F500\FE0E';
	}
	i.reload:after {
		content: '\21BB';
	}
</style>

<h2>
	Parameters
	<button class="icon-button" on:click={loadRandomPlant}>
		<i class="shuffle" />
	</button>
</h2>
<div>
	<label for="preset">Preset</label>
	<select id="preset" bind:value={presetKey} on:click={reload}>
		{#each presetKeys as key}
			<option value={key}>{key}</option>
		{/each}
	</select>
	<button class="icon-button" on:click={reload}>
		<i class="reload" />
	</button>
</div>
<div>
	<h3>
		Leaf
		<button class="icon-button" on:click={loadRandomLeaf}>
			<i class="shuffle" />
		</button>
	</h3>
	{#each leafKeys as type}
		<label class="leaf-option">
			<input
				type="radio"
				class="hidden"
				name="leafKeys "
				bind:group={leafKey}
				value={type} />
			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				width={thumbnailWidth}
				height={thumbnailHeight}>
				{@html LeafSvg[type].build(thumbnailStroke, type === leafKey ? thumbnailStroke : thumbnailFill, thumbnailOpacity, `scale(${thumbnailScale})`)}
			</svg>
		</label>
	{/each}
	<div>
		<label for="leafWidth">Width</label>
		<input
			id="leafWidth"
			type="number"
			min="0"
			step={preset.steps.leafDimensionStep}
			bind:value={leafWidth} />
		<label for="leafLength">Length</label>
		<input
			id="leafLength"
			type="number"
			min="0"
			step={preset.steps.leafDimensionStep}
			bind:value={leafLength} />
	</div>
	<div>
		<label for="leafCount">Count</label>
		<input id="leafCount" type="number" min="0" bind:value={leafCount} />
		<label for="curlInnerLeaves">Curl Inner</label>
		<input
			type="checkbox"
			id="curlInnerLeaves"
			bind:checked={curlInnerLeaves} />
	</div>
	<div>
		<label for="scalePolicy">Scale Policy</label>
		<select id="scalePolicy" bind:value={scalePolicyKey}>
			{#each scalePolicyKeys as policyKey}
				<option value={policyKey}>{policyKey}</option>
			{/each}
		</select>
	</div>
	<h3>
		Phyllotaxis
		<button class="icon-button" on:click={loadRandomPhyllotaxis}>
			<i class="shuffle" />
		</button>
	</h3>
	<div>
		<label for="angleOffset">Rotation</label>
		<input
			id="angleOffset"
			type="number"
			step={preset.steps.angleOffsetStep}
			bind:value={angleOffset} />
		<label for="stemRadius">Stem Radius</label>
		<input id="stemRadius" type="number" min="0" bind:value={stemRadius} />
	</div>
	<h4>Tilt</h4>
	<div>
		<label for="leafTiltMinDegrees">Start &deg;</label>
		<input
			id="leafTiltMinDegrees"
			type="number"
			min="0"
			max="270"
			step={leafTiltIncrementInDegrees}
			bind:value={leafTiltMinDegrees} />
		<label for="leafTiltMaxDegrees">End &deg;</label>
		<input
			id="leafTiltMaxDegrees"
			type="number"
			min="0"
			max="270"
			step={leafTiltIncrementInDegrees}
			bind:value={leafTiltMaxDegrees} />
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
	<h3>
		Colour
		<button class="icon-button" on:click={loadRandomColour}>
			<i class="shuffle" />
		</button>
	</h3>
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
		step={preset.steps.colourChangeRateStep}
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
