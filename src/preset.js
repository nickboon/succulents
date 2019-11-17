const shared = {
	x: 0,
	y: 0,
	opacity: 1,
	addLabel: true
};

const keys = {
	typeA: {
		leafCount: 39,
		stemRadius: 12, //- 17,
		angleOffset: -1,
		leafLength: 0.5,
		leafWidth: 0.4,
		scalePolicyKey: 'inverseIndex',
		curlInnerLeaves: false,
		leafTiltMin: 14,
		leafTiltMax: 39,
		leafTiltFullRange: 100,
		strokeColourKey: 'darkSeaGreen',
		fillColourKey: 'white',
		strokeColourPolicyKey: 'greenToRed',
		fillColourPolicyKey: 'constant',
		colourChangeRate: 1,
		opacity: 1
	},
	typeB: {
		leafCount: 85,
		stemRadius: 7,
		angleOffset: 1,
		scalePolicyKey: 'inverseIndex',
		curlInnerLeaves: true,
		leafLength: 0.8,
		leafWidth: 0.3,
		leafTiltMin: 104,
		leafTiltMax: 180,
		leafTiltFullRange: 450,
		strokeColourKey: 'paleTurquoise',
		fillColourKey: 'white',
		strokeColourPolicyKey: 'blueToGreen',
		fillColourPolicyKey: 'constant',
		colourChangeRate: 1,
		opacity: 1
	},
	typeC: {
		leafCount: 50,
		stemRadius: 9,
		angleOffset: 1.5,
		scalePolicyKey: 'inverseIndex',
		curlInnerLeaves: true,
		leafLength: 0.6,
		leafWidth: 0.4,
		leafTiltMin: 22,
		leafTiltMax: 96,
		leafTiltFullRange: 128,
		strokeColourKey: 'paleTurquoise',
		fillColourKey: 'white',
		strokeColourPolicyKey: 'blueToGreen',
		fillColourPolicyKey: 'constant',
		colourChangeRate: 1,
		opacity: 1
	},
	typeD: {
		leafCount: 19,
		stemRadius: 0,
		angleOffset: 7.1,
		scalePolicyKey: 'inverseIndex',
		leafLength: 0.5,
		leafWidth: 1.2,
		leafTiltMin: 49,
		leafTiltMax: 90,
		leafTiltFullRange: 164,
		strokeColourPolicyKey: 'greenToRed',
		curlInnerLeaves: true,
		strokeColourKey: 'darkGreen',
		fillColourKey: 'white',
		fillColourPolicyKey: 'constant',
		colourChangeRate: 1
	},
	typeE: {
		leafCount: 25,
		stemRadius: 0,
		angleOffset: 0,
		scalePolicyKey: 'inverseIndex',
		leafLength: 0.5,
		leafWidth: 0.2,
		leafTiltMin: 16,
		leafTiltMax: 47,
		leafTiltFullRange: 63,
		strokeColourPolicyKey: 'greenToRed',
		curlInnerLeaves: true,
		strokeColourKey: 'yellowGreen',
		fillColourKey: 'white',
		fillColourPolicyKey: 'constant',
		colourChangeRate: 1
	},
	typeF: {
		leafCount: 19,
		stemRadius: 1,
		angleOffset: -3.9,
		scalePolicyKey: 'inverseIndex',
		leafLength: 0.7,
		leafWidth: 0.4,
		leafTiltMin: 16,
		leafTiltMax: 47,
		leafTiltFullRange: 63,
		strokeColourPolicyKey: 'blueToGreen',
		curlInnerLeaves: false,
		strokeColourKey: 'darkCyan',
		fillColourKey: 'white',
		fillColourPolicyKey: 'constant',
		colourChangeRate: 4
	},
	typeG: {
		leafCount: 68,
		stemRadius: 10,
		angleOffset: 0,
		scalePolicyKey: 'constant',
		leafLength: 0.35,
		leafWidth: 0,
		leafTiltMin: 30,
		leafTiltMax: 86,
		leafTiltFullRange: 149,
		strokeColourPolicyKey: 'greenToRed',
		curlInnerLeaves: true,
		strokeColourKey: 'paleTurquoise',
		fillColourKey: 'white',
		fillColourPolicyKey: 'constant',
		colourChangeRate: 1
	},
	TypeH: {
		leafCount: 68,
		stemRadius: 6,
		angleOffset: 3.1,
		scalePolicyKey: 'inverseIndex',
		leafLength: 1.1,
		leafWidth: 0,
		leafTiltMin: 58,
		leafTiltMax: 140,
		leafTiltFullRange: 254,
		strokeColourPolicyKey: 'greenToRed',
		curlInnerLeaves: true,
		strokeColourKey: 'limeGreen',
		fillColourKey: 'white',
		fillColourPolicyKey: 'constant',
		colourChangeRate: 2
	}
};

function load(setId, x, y) {
	return {
		...shared,
		...keys[setId],
		...{ x, y }
	};
}

export default {
	load,
	keys
};
