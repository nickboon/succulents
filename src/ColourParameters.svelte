<script>
	import preset from './preset';
	import RandomPlant from './randomPlant';
	import Colour from './colour';
	import ColourPolicy from './colourPolicy';
	import { colourParameters as parameters } from './parameters';

	function loadRandomColour() {
		const randomColour = RandomPlant.colour;
		$parameters.strokeColourKey = randomColour.strokeColourKey;
		$parameters.fillColourKey = randomColour.fillColourKey;
		$parameters.strokeColourPolicyKey = randomColour.strokeColourPolicyKey;
		$parameters.fillColourPolicyKey = randomColour.fillColourPolicyKey;
		$parameters.colourChangeRate = randomColour.colourChangeRate;
	}
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
	select#strokeColourPolicy,
	select#fillColourPolicy {
		width: 7em;
	}
</style>

<h3>
	Colour
	<button class="icon-button shuffle" on:click={loadRandomColour} />
</h3>
<div>
	<label for="strokeColour">Stroke</label>
	<select
		id="strokeColour"
		class="colour"
		bind:value={$parameters.strokeColourKey}
		style="background:{$parameters.strokeColourKey};">
		{#each Colour.keys as colourKey}
			<option value={colourKey} style="background:{colourKey};" />
		{/each}
	</select>
	<select
		id="strokeColourPolicy"
		bind:value={$parameters.strokeColourPolicyKey}>
		{#each ColourPolicy.keys as policyKey}
			<option value={policyKey}>{policyKey}</option>
		{/each}
	</select>
</div>
<div>
	<label for="fillColour">Fill</label>
	<select
		id="fillColour"
		class="colour"
		style="background:{$parameters.fillColourKey || 'white'};"
		bind:value={$parameters.fillColourKey}>
		{#each Colour.keys as colourKey}
			<option value={colourKey} style="background:{colourKey};" />
		{/each}
		<option value={{}} style="background:white">&boxtimes;</option>
	</select>
	<select id="fillColourPolicy" bind:value={$parameters.fillColourPolicyKey}>
		{#each ColourPolicy.keys as policyKey}
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
	bind:value={$parameters.colourChangeRate} />
<label for="opacity">Opacity</label>
<input
	id="opacity"
	type="number"
	min="0"
	max="1"
	step="0.1"
	bind:value={$parameters.opacity} />
