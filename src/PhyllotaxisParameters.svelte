<script>
	import preset from './preset';
	import RandomPlant from './randomPlant';
	import { phyllotaxisParameters as parameters } from './parameters';

	export let autoStemRadius = '';

	function loadRandomPhyllotaxis() {
		const randomPhyllotaxis = RandomPlant.phyllotaxis;
		$parameters.angleOffset = randomPhyllotaxis.angleOffset;
		$parameters.stemRadius = randomPhyllotaxis.stemRadius;
		$parameters.leafTiltFullRange = randomPhyllotaxis.leafTiltFullRange;
		$parameters.leafTiltMaxDegrees = randomPhyllotaxis.leafTiltMaxDegrees;
		$parameters.leafTiltMinDegrees = randomPhyllotaxis.leafTiltMinDegrees;
	}

	$: leafTiltIncrementInDegrees = Math.floor(
		360 / $parameters.leafTiltFullRange
	);
</script>

<style>
	label {
		width: 6em;
	}
	input {
		width: 4em;
		margin-right: 1em;
	}
	input[type='checkbox'] {
		width: auto;
	}
</style>

<h3>
	Phyllotaxis
	<button class="icon-button shuffle" on:click={loadRandomPhyllotaxis} />
</h3>
<div>
	<label for="angleOffset">Rotation</label>
	<input
		id="angleOffset"
		type="number"
		step={preset.steps.angleOffsetStep}
		bind:value={$parameters.angleOffset} />

	<div>
		<h4>Stem Radius</h4>
		<label for="stemRadius">Explicit</label>
		<input
			id="stemRadius"
			type="number"
			min="0"
			disabled={$parameters.useAutoStemRadius}
			bind:value={$parameters.stemRadius} />
		<label for="useAutoStemRadius">Automatic</label>
		<input
			id="useAutoStemRadius"
			type="checkbox"
			bind:checked={$parameters.useAutoStemRadius} />
		{autoStemRadius}
	</div>
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
		bind:value={$parameters.leafTiltMinDegrees} />
	<label for="leafTiltMaxDegrees">End &deg;</label>
	<input
		id="leafTiltMaxDegrees"
		type="number"
		min="0"
		max="270"
		step={leafTiltIncrementInDegrees}
		bind:value={$parameters.leafTiltMaxDegrees} />
</div>
<div>
	<label for="leafTiltFullRange">Steps</label>
	<input
		id="leafTiltFullRange"
		type="number"
		min="1"
		bind:value={$parameters.leafTiltFullRange} />
</div>
