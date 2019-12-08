<script>
	import preset from './preset';
	import {
		leafParameters,
		phyllotaxisParameters,
		colourParameters
	} from './parameters';
	import LeafParameters from './LeafParameters.svelte';
	import PhyllotaxisParameters from './PhyllotaxisParameters.svelte';
	import ColourParameters from './ColourParameters.svelte';
	import SvgFactory from './svg';
	import Plant from './plant';
	import RandomPlant from './randomPlant';
	import Random from './random.js';

	export let paths;
	export let svgWidth;
	export let svgHeight;

	function assignProperties(doner, receiver) {
		for (var key in receiver) receiver[key] = doner[key];
	}

	function setParameters(leaf, phyllotaxis, colour) {
		const currentOpacity = $colourParameters.opacity;
		assignProperties(leaf, $leafParameters);
		assignProperties(phyllotaxis, $phyllotaxisParameters);
		assignProperties(colour, $colourParameters);
		$colourParameters.opacity = currentOpacity;
	}

	function reload() {
		const currentPreset = preset.load(presetKey);
		setParameters(currentPreset, currentPreset, currentPreset);
	}

	function loadRandom() {
		setParameters(
			RandomPlant.leaf,
			RandomPlant.phyllotaxis,
			RandomPlant.colour
		);
	}

	function loadMultipleRandom() {
		const parametersList = [];
		for (let index = multpleCount; index > 0; index--)
			parametersList.push({
				x: new Random().int(svgWidth),
				y: new Random().int(svgHeight),
				...RandomPlant.leaf,
				...RandomPlant.phyllotaxis,
				...RandomPlant.colour
			});

		paths = parametersList
			.map(parameters => new Plant(parameters).buildPaths())
			.join('');
	}

	let presetKey = preset.defaultKey;
	let addLabel = true;

	$: plant = new Plant({
		x: svgWidth / 2,
		y: svgHeight / 2,
		...$leafParameters,
		...$phyllotaxisParameters,
		...$colourParameters
	});
	$: plantPaths = plant.buildPaths();
	$: paths = plantPaths + (addLabel ? plant.label : '');

	let multpleCount = 100;
</script>

<style>
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
</style>

<h2>
	Single
	<button class="icon-button shuffle" on:click={loadRandom} />
</h2>
<div>
	<label for="preset">Preset</label>
	<select id="preset" bind:value={presetKey} on:click={reload}>
		{#each preset.keys as key}
			<option value={key}>{key}</option>
		{/each}
	</select>
	<button class="icon-button reload" on:click={reload} />
</div>
<LeafParameters />
<PhyllotaxisParameters />
<ColourParameters />
<div>
	<h3>SVG</h3>
	<label for="addLabel">Annotate</label>
	<input id="addLabel" type="checkbox" bind:checked={addLabel} />
</div>
<h2>
	Multiple
	<button class="icon-button shuffle" on:click={loadMultipleRandom} />
</h2>
<div>
	<label for="multpleCount">Count</label>
	<input id="multpleCount" type="number" min="0" bind:value={multpleCount} />
</div>
