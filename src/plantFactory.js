import LeafFactory from './leafFactory';
import Trigonometry from './trigonometry';
import svgFactory from './svg';
import ScalePolicy from './scalePolicy';
import ColourPolicy from './colourPolicy';
import Colour from './colour';

const _options = new WeakMap();
const _leafFactory = new WeakMap();
const goldenAngleDegrees = 137.5077640500378546463487;

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
	static get defaultTiltFullRange() {
		return 72;
	}

	static get defaultTiltMax() {
		return PlantFactory.calculateLeafTiltLimit(
			PlantFactory.defaultTiltFullRange
		);
	}

	static calculateLeafTiltLimit(fullRange) {
		return Math.floor(fullRange * 0.75);
	}

	constructor({
		addCentreMarker = false,
		addLabel = true,
		x = 0,
		y = 0,
		leafCount = 50,
		stemRadius = 10,
		angleOffset = 0,
		leafLength = 0.5,
		leafWidth = 0.5,
		leafTiltFullRange = PlantFactory.defaultTiltFullRange,
		leafTiltMin = 0,
		leafTiltMax = PlantFactory.defaultTiltMax,
		scalePolicy = new ScalePolicy().inverseFibonacci(),
		strokeColourKey = 'green',
		fillColourKey = 'white',
		strokeColourPolicyKey = 'constant',
		fillColourPolicyKey = 'constant',
		colourChangeRate = 2,
		opacity = 1
	} = {}) {
		_options.set(this, {
			addCentreMarker,
			addLabel,
			x,
			y,
			leafCount,
			stemRadius,
			angleOffset,
			scalePolicy,
			leafLength,
			leafWidth,
			leafTiltMin,
			leafTiltMax,
			leafTiltFullRange,
			strokeColourKey,
			fillColourKey,
			strokeColourPolicyKey,
			fillColourPolicyKey,
			colourChangeRate,
			opacity
		});

		_leafFactory.set(this, new LeafFactory());
	}

	centremarker() {
		const { x, y, stemRadius } = _options.get(this);
		return [
			`<path d="M${x - stemRadius} ${y} L${x + stemRadius} ${y}" />`,
			`<path d="M${x} ${y - stemRadius} L${x} ${y + stemRadius}" />`
		].join('');
	}

	label() {
		const options = _options.get(this);
		return new svgFactory().text(
			Object.keys(options)
				.map(key => `${key}: ${options[key]}`)
				.join(', ') + '.',
			{
				x: 0,
				y: 12
			}
		);
	}

	build() {
		const leafFactory = _leafFactory.get(this);
		const {
			addCentreMarker,
			addLabel,
			x,
			y,
			leafCount,
			stemRadius,
			angleOffset,
			leafLength,
			leafWidth,
			leafTiltFullRange,
			leafTiltMin,
			leafTiltMax,
			scalePolicy,
			strokeColourKey,
			fillColourKey,
			strokeColourPolicyKey,
			fillColourPolicyKey,
			colourChangeRate,
			opacity
		} = _options.get(this);
		const trigTable = new Trigonometry(leafTiltFullRange);
		const leafTiltRange = leafTiltMax - leafTiltMin;
		let scaleX = leafLength;
		let scaleY = leafLength;
		let leafTilt = leafTiltMin;
		let leaves = [];
		let currentStroke = Colour.definedColours[strokeColourKey];
		let currentFill = Colour.definedColours[fillColourKey];

		if (scalePolicy.toString() !== new ScalePolicy().noScale().toString()) {
			scaleY /= 10;
			scaleX /= 10;
		}

		for (let i = 0; i < leafCount; i++) {
			const angle = trigTable.getAngle(leafTilt);
			const tiltScale = -angle.cos;
			const z = angle.sin;
			const svg = leafFactory.buildLeaf({
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

			scaleX += scalePolicy(i) * leafWidth;
			scaleY += scalePolicy(i) * leafLength;

			currentStroke = ColourPolicy[strokeColourPolicyKey](
				currentStroke,
				colourChangeRate
			);
			currentFill = ColourPolicy[fillColourPolicyKey](
				currentFill,
				colourChangeRate
			);

			if (i < leafTiltRange) leafTilt += 1;
		}

		return (
			leaves
				.reverse()
				.sort((a, b) => (a.z > b.z ? 1 : b.z > a.z ? -1 : 0))
				.map(leaf => leaf.svg)
				.join('') +
			(addLabel ? this.label() : '') +
			(addCentreMarker ? this.centremarker() : '')
		);
	}
}
