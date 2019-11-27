import LeafSvg from './leaf.js';
import SvgFactory from './svg.js';
import PlantFactory from './plantFactory.js';
import Colour from './colour.js';
import ColourPolicy from './colourPolicy.js';
import Random from './random.js';
import fs from 'fs';
import path from 'path';

const definedColourKeys = Object.keys(Colour.definedColours);
const colourPolicyKeys = Object.keys(ColourPolicy).filter(
	key => key !== 'constant'
);
const leafTypes = Object.getOwnPropertyNames(LeafSvg).filter(
	name => name !== 'name' && name !== 'length' && name !== 'prototype'
);
const svgFactory = new SvgFactory();

const curlInnerLeaves = new Random().bool();
const angleOffset = new Random().bool()
	? 0
	: new Random().intBetween(-48, 73) / 10;
const leafTiltFullRange = new Random().intBetween(0, 24);
const leafTiltMin = Math.floor(
	(new Random().intBetween(14, 35) / 100) * leafTiltFullRange
);
const leafTiltMax = Math.floor(
	(new Random().intBetween(39, 75) / 100) * leafTiltFullRange
);
const svgWidth = 841.89 / 2; // a4 h / 2
const svgHeight = 595.28; //a4 width

function getPaths() {
	return new PlantFactory({
		x: svgWidth / 2,
		y: svgHeight / 2,
		leafType: new Random().arrayElement(leafTypes),
		leafCount: new Random().intBetween(19, 128),
		leafWidth: curlInnerLeaves
			? new Random().intBetween(0, 8) / 20
			: new Random().intBetween(3, 8) / 20,
		leafLength: new Random().intBetween(1, 22) / 20,
		scalePolicyKey: 'inverseIndex',
		curlInnerLeaves,
		angleOffset,
		stemRadius: new Random().intBetween(0, 24),
		leafTiltMin,
		leafTiltMax,
		leafTiltFullRange,
		strokeColourKey: new Random().arrayElement(definedColourKeys),
		fillColourKey: new Random().arrayElement(definedColourKeys),
		strokeColourPolicyKey: new Random().arrayElement(colourPolicyKeys),
		fillColourPolicyKey: new Random().arrayElement(colourPolicyKeys),
		colourChangeRate: new Random().intBetween(5, 40) / 10,
		opacity: 1,
		addLabel: true
	}).build();
}

function getSvg() {
	return (
		svgFactory.declaration() +
		svgFactory.openSvg(svgWidth, svgHeight) +
		getPaths() +
		svgFactory.closeSvg()
	);
}

const ensureExists = dir => {
	if (!fs.existsSync(dir)) fs.mkdirSync(dir);
};
const archiveFilepath = path.join('.', 'archive');
ensureExists(archiveFilepath);

const args = process.argv.slice(2);
let setCount = parseInt(args[0]) || 1;
const setName = 'succulent';
const fileLabel = args[1] ? `${args[1]}_` : '';
const setFilepath = path.join(archiveFilepath, setName);
ensureExists(setFilepath);
for (; setCount > 0; setCount--) {
	const filename = `${fileLabel}${setName}_${Date.now()}`;
	const svg = getSvg();
	const filepath = path.join(setFilepath, `${filename}.svg`);
	console.log('saving file to ' + filepath);
	fs.writeFileSync(filepath, svg, 'utf8');
}
