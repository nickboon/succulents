<script>
	import preset from './preset';
	import LeafSvg from './leaf';
	import SvgFactory from './svg';
	import ScalePolicy from './scalePolicy';
	import RandomPlant from './randomPlant';
	import { leafParameters as parameters } from './parameters';

	function loadRandomLeaf() {
		const randomLeaf = RandomPlant.leaf;
		$parameters.leafKey = randomLeaf.leafKey;
		$parameters.leafCount = randomLeaf.leafCount;
		$parameters.leafWidth = randomLeaf.leafWidth;
		$parameters.leafLength = randomLeaf.leafLength;
		$parameters.curlInnerLeaves = randomLeaf.curlInnerLeaves;
		$parameters.scalePolicyKey = randomLeaf.scalePolicyKey;
	}

	const thumbnailStroke = '#555';
	const thumbnailFill = '#fff';
	const thumbnailOpacity = 1;
	const thumbnailScale = 0.4;
	const linewidth = 2;
	const thumbnailWidth =
		Math.max(...LeafSvg.keys.map(key => LeafSvg[key].w)) * thumbnailScale +
		linewidth;
	const thumbnailHeight =
		Math.max(...LeafSvg.keys.map(key => LeafSvg[key].h)) * thumbnailScale +
		linewidth;
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
</style>

<h3>
	Leaf
	<button class="icon-button shuffle" on:click={loadRandomLeaf} />
</h3>
{#each LeafSvg.keys as type}
	<label class="leaf-option">
		<input
			type="radio"
			class="hidden"
			name="leafKeys "
			bind:group={$parameters.leafKey}
			value={type} />
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			width={thumbnailWidth}
			height={thumbnailHeight}>
			{@html LeafSvg[type].build(thumbnailStroke, type === $parameters.leafKey ? thumbnailStroke : thumbnailFill, thumbnailOpacity, `scale(${thumbnailScale})`)}
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
		bind:value={$parameters.leafWidth} />
	<label for="leafLength">Length</label>
	<input
		id="leafLength"
		type="number"
		min="0"
		step={preset.steps.leafDimensionStep}
		bind:value={$parameters.leafLength} />
</div>
<div>
	<label for="leafCount">Count</label>
	<input
		id="leafCount"
		type="number"
		min="0"
		bind:value={$parameters.leafCount} />
	<label for="curlInnerLeaves">Curl Inner</label>
	<input
		type="checkbox"
		id="curlInnerLeaves"
		bind:checked={$parameters.curlInnerLeaves} />
</div>
<div>
	<label for="scalePolicy">Scale Policy</label>
	<select id="scalePolicy" bind:value={$parameters.scalePolicyKey}>
		{#each ScalePolicy.keys as policyKey}
			<option value={policyKey}>{policyKey}</option>
		{/each}
	</select>
</div>
