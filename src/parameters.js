import { writable } from 'svelte/store';
import preset from './preset';

const defaultPreset = preset.load();

export const leafParameters = writable({
	leafKey: defaultPreset.leafKey,
	leafCount: defaultPreset.leafCount,
	leafWidth: defaultPreset.leafWidth,
	leafLength: defaultPreset.leafLength,
	scalePolicyKey: defaultPreset.scalePolicyKey,
	curlInnerLeaves: defaultPreset.curlInnerLeaves
});

export const phyllotaxisParameters = writable({
	angleOffset: defaultPreset.angleOffset,
	stemRadius: defaultPreset.stemRadius,
	leafTiltFullRange: defaultPreset.leafTiltFullRange,
	leafTiltMaxDegrees: defaultPreset.leafTiltMaxDegrees,
	leafTiltMinDegrees: defaultPreset.leafTiltMinDegrees
});

export const colourParameters = writable({
	strokeColourKey: defaultPreset.strokeColourKey,
	fillColourKey: defaultPreset.fillColourKey,
	strokeColourPolicyKey: defaultPreset.strokeColourPolicyKey,
	fillColourPolicyKey: defaultPreset.fillColourPolicyKey,
	colourChangeRate: defaultPreset.colourChangeRate,
	opacity: 1
});
