const presets = {
	typeA: {
		leafKey: 'typeA',
		leafCount: 39,
		stemRadius: 12,
		angleOffset: -1,
		leafLength: 0.5,
		leafWidth: 0.4,
		scalePolicyKey: 'inverseIndex',
		curlInnerLeaves: false,
		leafTiltMinDegrees: 51,
		leafTiltMaxDegrees: 141,
		leafTiltFullRange: 100,
		strokeColourKey: 'darkSeaGreen',
		fillColourKey: 'white',
		strokeColourPolicyKey: 'greenToRed',
		fillColourPolicyKey: 'constant',
		colourChangeRate: 1
	},
	typeB: {
		leafKey: 'typeB',
		leafCount: 85,
		stemRadius: 7,
		angleOffset: 1,
		scalePolicyKey: 'inverseIndex',
		curlInnerLeaves: true,
		leafLength: 0.65,
		leafWidth: 0.3,
		leafTiltMinDegrees: 83,
		leafTiltMaxDegrees: 144,
		leafTiltFullRange: 450,
		strokeColourKey: 'paleTurquoise',
		fillColourKey: 'white',
		strokeColourPolicyKey: 'blueToGreen',
		fillColourPolicyKey: 'constant',
		colourChangeRate: 1
	},
	typeC: {
		leafKey: 'typeC',
		leafCount: 50,
		stemRadius: 9,
		angleOffset: 1.5,
		scalePolicyKey: 'inverseIndex',
		curlInnerLeaves: true,
		leafLength: 0.6,
		leafWidth: 0.4,
		leafTiltMinDegrees: 62,
		leafTiltMaxDegrees: 270,
		leafTiltFullRange: 128,
		strokeColourKey: 'paleTurquoise',
		fillColourKey: 'white',
		strokeColourPolicyKey: 'blueToGreen',
		fillColourPolicyKey: 'constant',
		colourChangeRate: 1
	},
	typeD: {
		leafKey: 'typeD',
		leafCount: 19,
		stemRadius: 0,
		angleOffset: 7.3,
		scalePolicyKey: 'inverseIndex',
		leafLength: 0.7,
		leafWidth: 0.4,
		leafTiltMinDegrees: 108,
		leafTiltMaxDegrees: 140,
		leafTiltFullRange: 164,
		strokeColourPolicyKey: 'greenToRed',
		curlInnerLeaves: false,
		strokeColourKey: 'darkGreen',
		fillColourKey: 'white',
		fillColourPolicyKey: 'constant',
		colourChangeRate: 1
	},
	typeE: {
		leafKey: 'typeE',
		leafCount: 25,
		stemRadius: 0,
		angleOffset: 0,
		scalePolicyKey: 'inverseIndex',
		leafLength: 0.45,
		leafWidth: 0.2,
		leafTiltMinDegrees: 90,
		leafTiltMaxDegrees: 270,
		leafTiltFullRange: 63,
		strokeColourPolicyKey: 'greenToRed',
		curlInnerLeaves: true,
		strokeColourKey: 'yellowGreen',
		fillColourKey: 'white',
		fillColourPolicyKey: 'constant',
		colourChangeRate: 2
	},
	typeF: {
		leafKey: 'typeF',
		leafCount: 19,
		stemRadius: 3,
		angleOffset: -4.8,
		scalePolicyKey: 'inverseIndex',
		leafLength: 0.7,
		leafWidth: 0.1,
		leafTiltMinDegrees: 75,
		leafTiltMaxDegrees: 270,
		leafTiltFullRange: 63,
		strokeColourPolicyKey: 'blueToGreen',
		curlInnerLeaves: true,
		strokeColourKey: 'darkCyan',
		fillColourKey: 'white',
		fillColourPolicyKey: 'constant',
		colourChangeRate: 4
	},
	typeG: {
		leafKey: 'typeG',
		leafCount: 106,
		stemRadius: 22,
		angleOffset: 0,
		scalePolicyKey: 'inverseIndex',
		leafLength: 0.45,
		leafWidth: 0.15,
		leafTiltMinDegrees: 26,
		leafTiltMaxDegrees: 151,
		leafTiltFullRange: 259,
		strokeColourPolicyKey: 'blueToRed',
		curlInnerLeaves: false,
		strokeColourKey: 'paleTurquoise',
		fillColourKey: 'white',
		fillColourPolicyKey: 'constant',
		colourChangeRate: 0.5
	},
	TypeH: {
		leafKey: 'typeH',
		leafCount: 128,
		stemRadius: 24,
		angleOffset: 3.7,
		scalePolicyKey: 'inverseIndex',
		leafLength: 1.1,
		leafWidth: 0,
		leafTiltMinDegrees: 56,
		leafTiltMaxDegrees: 171,
		leafTiltFullRange: 295,
		strokeColourPolicyKey: 'greenToRed',
		curlInnerLeaves: true,
		strokeColourKey: 'limeGreen',
		fillColourKey: 'white',
		fillColourPolicyKey: 'constant',
		colourChangeRate: 2.1
	}
};

const keys = Object.keys(presets);

const defaultKey = keys[0];

const steps = {
	leafDimensionStep: 0.05,
	angleOffsetStep: 0.1,
	colourChangeRateStep: 0.1
};

function load(key = keys[0]) {
	return presets[key];
}

function min(property, filter = () => true) {
	return Math.min(
		...keys
			.map(key => presets[key])
			.filter(filter)
			.map(preset => preset[property])
	);
}

function max(property, filter = () => true) {
	return Math.max(
		...keys
			.map(key => presets[key])
			.filter(filter)
			.map(preset => preset[property])
	);
}

export default {
	load,
	keys,
	defaultKey,
	steps,
	min,
	max
};
