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
import preset from './preset';
import Leaf from './leaf.js';
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
const _autoStemRadius = new WeakMap();
const defaultPreset = preset.keys[0];
const defaultParameters = preset.load(defaultPreset);
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
		x = defaultParameters.x,
		y = defaultParameters.y,
		leafKey = defaultParameters.leafKey,
		leafCount = defaultParameters.leafCount,
		stemRadius = defaultParameters.stemRadius,
		useAutoStemRadius = false,
		angleOffset = defaultParameters.angleOffset,
		leafLength = defaultParameters.leafLength,
		leafWidth = defaultParameters.leafWidth,
		leafTiltFullRange = defaultParameters.leafTiltFullRange,
		leafTiltMinDegrees = defaultParameters.leafTiltMinDegrees,
		leafTiltMaxDegrees = defaultParameters.leafTiltMaxDegrees,
		scalePolicyKey = defaultParameters.scalePolicyKey,
		curlInnerLeaves = defaultParameters.curlInnerLeaves,
		strokeColourKey = defaultParameters.strokeColourKey,
		fillColourKey = defaultParameters.fillColourKey,
		strokeColourPolicyKey = defaultParameters.strokeColourPolicyKey,
		fillColourPolicyKey = defaultParameters.fillColourPolicyKey,
		colourChangeRate = defaultParameters.colourChangeRate,
		opacity = defaultParameters.opacity
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
		let scaleX = leafLength;
		let scaleY = leafLength;
		if (scalePolicyKey === 'constant') {
			scaleY *= 5;
			scaleX *= 5;
		}
		let leafTilt = leafTiltMin;
		let currentStroke = Colour.definedColours[strokeColourKey];
		let currentFill = Colour.definedColours[fillColourKey];
		let scalePolicy = ScalePolicy[scalePolicyKey];

		for (let i = 0; i < leafCount; i++) {
			const angle = trigTable.getAngle(leafTilt);
			const tiltScale = -angle.cos;
			const z = angle.sin;
			leaves.push({
				type: leafKey,
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
				opacity,
				z
			});

			scaleX += scalePolicy(i) * leafWidth;
			if (curlInnerLeaves) scaleX -= 1 / (i + 1);

			scaleY += scalePolicy(i) * leafLength;
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

		let calculatedStemRadius = '';
		if (useAutoStemRadius) {
			const minScaleY = Math.min(...leaves.map(leaf => leaf.scale.y));
			const leafH = Leaf[leafKey].h;
			calculatedStemRadius = Math.floor(
				minScaleY > 0 ? 0 : Math.abs(minScaleY * leafH) / 2
			);

			leaves.forEach(leaf => {
				leaf.translation.y += stemRadius - calculatedStemRadius;
				leaf.rotation.offsetY = calculatedStemRadius;
			});
		}
		_autoStemRadius.set(this, calculatedStemRadius);
		_leaves.set(this, leaves);
	}

	get autoStemRadius() {
		return _autoStemRadius.get(this);
	}

	get centremarker() {
		const { x, y, stemRadius } = _options.get(this);
		const svgFactory = new SvgFactory();
		return [
			svgFactory.line({ x: x - stemRadius, y }, { x: x + stemRadius, y }),
			svgFactory.line({ x, y: y - stemRadius }, { x, y: y + stemRadius })
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

	buildPaths() {
		const leafFactory = new LeafFactory();

		const leafPaths = _leaves
			.get(this)
			.reverse()
			.sort((a, b) => (a.z > b.z ? 1 : b.z > a.z ? -1 : 0))
			.map(leaf => leafFactory.buildSvg(leaf));
		return ['<g>', ...leafPaths, '</g>'].join('');
	}
}
