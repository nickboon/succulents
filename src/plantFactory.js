/*
On the mystery of the golden angle in phyllotaxis S. KING, F. BECK, U. LÜTTGE
https://onlinelibrary.wiley.com/doi/full/10.1111/j.1365-3040.2004.01185.x

Continued fraction 		First three rationals 	Asymptotic 	divergence angle (°) 	Series classification
[0,2,1,1, ...] 			1/2, 1/3, 2/5, ... 		137.508...	golden angle 			Schimper–Braun series
[0,3,1,1, ...] 			1/3, 1/4; 2/7, ... 		99.502...  							Lucas series
[0,2,2,1,1, ...] 		2/5, 3/7, 5/12, ... 	151.136... 							anomalous
[0,3,2,1,1, ...] 		2/7, 3/10, 5/17, ... 	106.447...  						not classified
[0,4,1,1,1, ...] 		1/4, 1/5, 2/9, ... 		77.955... 							normal
[0,2,1,2,1,1, ...] 		3/8, 4/11, 7/19, ... 	132.178... 							not classified
*/
import LeafFactory from './leafFactory.js';
import Trigonometry from './trigonometry.js';
import SvgFactory from './svg.js';
import ScalePolicy from './scalePolicy.js';
import ColourPolicy from './colourPolicy.js';
import Colour from './colour.js';

const goldenAngleDegrees = 137.5077640500378546463487;
const maxDegrees = 360;
const _options = new WeakMap();
const _leaves = new WeakMap();
/*
    leaf tilt
    ===========

        			1/4 full range
        			 |
    1/2 full range ----- 0
        			 |
       				270 full range
*/
export default class PlantFactory {
	constructor({
		x = 0,
		y = 0,
		leafType = 'typeA',
		leafCount = 50,
		stemRadius = 10,
		angleOffset = 0,
		leafLength = 0.5,
		leafWidth = 0.5,
		leafTiltFullRange = 100,
		leafTiltMinDegrees = 0,
		leafTiltMaxDegrees = 270,
		scalePolicyKey = 'inverseFibonacci',
		curlInnerLeaves = false,
		strokeColourKey = 'green',
		fillColourKey = 'white',
		strokeColourPolicyKey = 'constant',
		fillColourPolicyKey = 'constant',
		colourChangeRate = 2,
		opacity = 1
	} = {}) {
		_options.set(this, arguments[0]);

		const trigTable = new Trigonometry(leafTiltFullRange);
		const leafTiltMin = Math.floor(
			(leafTiltMinDegrees / maxDegrees) * leafTiltFullRange
		);
		const leafTiltMax = Math.floor(
			(leafTiltMaxDegrees / maxDegrees) * leafTiltFullRange
		);

		const leaves = [];
		const leafFactory = new LeafFactory();
		let scaleX = leafLength;
		let scaleY = leafLength;
		if (scalePolicyKey === 'constant') {
			scaleY *= 5;
			scaleX *= 5;
		}
		let leafTilt = leafTiltMin;
		let currentStroke = Colour.definedColours[strokeColourKey];
		let currentFill = Colour.definedColours[fillColourKey];
		let scalePolicy = new ScalePolicy()[scalePolicyKey]();
		for (let i = 0; i < leafCount; i++) {
			const angle = trigTable.getAngle(leafTilt);
			const tiltScale = -angle.cos;
			const z = angle.sin;
			const svg = leafFactory.buildLeaf({
				type: leafType,
				translation: {
					x,
					y: y - stemRadius
				},
				rotation: {
					angle: (goldenAngleDegrees + angleOffset) * i,
					offsetY: stemRadius
				},
				scale: {
					x: scaleX,
					y: scaleY * tiltScale
				},
				stroke: currentStroke,
				fill: currentFill,
				opacity
			});
			leaves.push({
				svg,
				z
			});
			scaleX += scalePolicy(i, true) * leafWidth;
			if (curlInnerLeaves) scaleX -= 1 / (i + 1);

			scaleY += scalePolicy(i, false) * leafLength;

			currentStroke = ColourPolicy[strokeColourPolicyKey](
				currentStroke,
				colourChangeRate
			);
			currentFill = ColourPolicy[fillColourPolicyKey](
				currentFill,
				colourChangeRate
			);

			if (leafTilt < leafTiltMax) leafTilt += 1;
		}

		_leaves.set(this, leaves);
	}

	get centremarker() {
		const { x, y, stemRadius } = _options.get(this);
		return [
			`<path d="M${x - stemRadius} ${y} L${x + stemRadius} ${y}" />`,
			`<path d="M${x} ${y - stemRadius} L${x} ${y + stemRadius}" />`
		].join('');
	}

	get label() {
		const options = _options.get(this);
		const svgFactory = new SvgFactory();
		const x = 12;
		let y = 12;

		return Object.keys(options)
			.map(key =>
				svgFactory.text(`${key}: ${options[key]}`, { x, y: (y += 12) })
			)
			.join('');
	}

	buildSvg(addLabel = true, addCentreMarker = false) {
		return (
			_leaves
				.get(this)
				.reverse()
				.sort((a, b) => (a.z > b.z ? 1 : b.z > a.z ? -1 : 0))
				.map(leaf => leaf.svg)
				.join('') +
			(addLabel ? this.label : '') +
			(addCentreMarker ? this.centremarker : '')
		);
	}
}
