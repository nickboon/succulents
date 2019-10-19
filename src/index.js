const SvgFactory = require('./svg');
const PlantFactory = require('./plantFactory');

const svgElementId = 'succulents';

// svg varaiables
const h = 400;
const w = 1000;
const x = 100;
const y = 100;
const plantFactory = new PlantFactory();
const svgFactory = new SvgFactory();

document.getElementById(svgElementId).innerHTML = [
    svgFactory.openSvg(x + w + x, y + h + y),
    plantFactory.build(),
    svgFactory.closeSvg()
].join('');