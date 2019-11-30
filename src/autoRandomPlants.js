import RandomPlant from './randomPlant.js';
import SvgFactory from './svg.js';
import Plant from './plant.js';
import fs from 'fs';
import path from 'path';

const paperSize = {
	a4: {
		width: 595.28,
		height: 841.89
	},
	a5: {
		width: 420.945,
		height: 595.28
	}
};

const svgWidth = paperSize.a5.width;
const svgHeight = paperSize.a5.height;
const plantParameters = {
	x: svgWidth / 2,
	y: svgHeight / 2,
	...RandomPlant.leaf,
	...RandomPlant.phyllotaxis,
	...RandomPlant.colour,
	opacity: 1,
	addLabel: true
};

const svgFactory = new SvgFactory();
function getSvg() {
	return (
		svgFactory.declaration() +
		svgFactory.openSvg(svgWidth, svgHeight) +
		new Plant(plantParameters).buildPaths() +
		svgFactory.closeSvg()
	);
}

function ensureExists(dir) {
	if (!fs.existsSync(dir)) fs.mkdirSync(dir);
}

const archiveFilepath = path.join('.', 'archive');
ensureExists(archiveFilepath);

const args = process.argv.slice(2);
let setCount = parseInt(args[0]) || 1;
const setName = `succulent_designs_${Date.now()}`;
const fileLabel = args[1] ? `${args[1]}_` : '';
const setFilepath = path.join(archiveFilepath, setName);
ensureExists(setFilepath);
for (; setCount > 0; setCount--) {
	const filename = `${fileLabel}succulent_design_${Date.now()}`;
	const svg = getSvg();
	const filepath = path.join(setFilepath, `${filename}.svg`);
	console.log('saving file to ' + filepath);
	fs.writeFileSync(filepath, svg, 'utf8');
}
