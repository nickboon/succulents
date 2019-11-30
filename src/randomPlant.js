import preset from './preset.js';
import LeafSvg from './leaf.js';
import Colour from './colour.js';
import ColourPolicy from './colourPolicy.js';
import Random from './random.js';

const leafKeys = LeafSvg.keys;
const definedColourKeys = Colour.keys;
const colourPolicyKeys = ColourPolicy.keys.filter(key => key !== 'constant');

const leafWidthMin = preset.min(
	'leafWidth',
	preset => preset.curlInnerLeaves === false
);
const leafWidthWithCurlMin = preset.min(
	'leafWidth',
	preset => preset.curlInnerLeaves === true
);
const leafWidthMax = preset.max('leafWidth');
const leafLengthMin = preset.min('leafLength');
const leafLengthMax = preset.max('leafLength');
const angleOffsetMin = preset.min('angleOffset');
const angleOffsetMax = preset.max('angleOffset');
const leafTiltFullRangeMin = preset.min('leafTiltFullRange');
const leafTiltFullRangeMax = preset.max('leafTiltFullRange');
const leafTiltMinDegreesMin = preset.min('leafTiltMinDegrees');
const leafTiltMinDegreesMax = preset.max('leafTiltMinDegrees');
const leafTiltMaxDegreesMin = preset.min('leafTiltMaxDegrees');
const leafTiltMaxDegreesMax = preset.max('leafTiltMaxDegrees');
const stemRadiusMin = preset.min('stemRadius');
const stemRadiusMax = preset.max('stemRadius');
const colourChangeRateMin = preset.min('colourChangeRate');
const colourChangeRateMax = preset.max('colourChangeRate');
const {
	leafDimensionStep,
	angleOffsetStep,
	colourChangeRateStep
} = preset.steps;

export default class RandomPlant {
	static get leaf() {
		const curlInnerLeaves = new Random().bool();

		return {
			leafKey: new Random().arrayElement(leafKeys),
			leafCount: new Random().intBetween(19, 128),
			leafWidth: curlInnerLeaves
				? new Random().stepBetween(
						leafWidthWithCurlMin,
						leafWidthMax,
						leafDimensionStep
				  )
				: new Random().stepBetween(
						leafWidthMin,
						leafWidthMax,
						leafDimensionStep
				  ),

			leafLength: new Random().stepBetween(
				leafLengthMin,
				leafLengthMax,
				leafDimensionStep
			),
			scalePolicyKey: 'inverseIndex',
			curlInnerLeaves
		};
	}

	static get phyllotaxis() {
		const angleOffset = new Random().bool()
			? 0
			: new Random().stepBetween(
					angleOffsetMin,
					angleOffsetMax,
					angleOffsetStep
			  );

		const leafTiltFullRange = new Random().intBetween(
			leafTiltFullRangeMin,
			leafTiltFullRangeMax
		);

		const tiltStep =
			Math.floor(360 / leafTiltFullRange) || Math.ceil(360 / leafTiltFullRange);

		const leafTiltMinDegrees = new Random().stepBetween(
			leafTiltMinDegreesMin,
			leafTiltMinDegreesMax,
			tiltStep
		);

		const leafTiltMaxDegrees = new Random().stepBetween(
			leafTiltMaxDegreesMin,
			leafTiltMaxDegreesMax,
			tiltStep
		);

		return {
			angleOffset,
			stemRadius: new Random().intBetween(stemRadiusMin, stemRadiusMax),
			leafTiltMinDegrees,
			leafTiltMaxDegrees,
			leafTiltFullRange
		};
	}

	static get colour() {
		return {
			strokeColourKey: new Random().arrayElement(definedColourKeys),
			fillColourKey: new Random().arrayElement(definedColourKeys),
			strokeColourPolicyKey: new Random().arrayElement(colourPolicyKeys),
			fillColourPolicyKey: new Random().arrayElement(colourPolicyKeys),
			colourChangeRate: new Random().stepBetween(
				colourChangeRateMin,
				colourChangeRateMax,
				colourChangeRateStep
			)
		};
	}
}
