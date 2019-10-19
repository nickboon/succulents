const SvgFactory = require('./svg');
const PlantFactory = require('./plantFactory');

const goldenAngleDegrees = 137.5077640500378546463487;

// svg varaiables
const svgContainerElementId = 'succulents';
const h = 400;
const w = 1000;
const x = 100;
const y = 100;
const svgFactory = new SvgFactory();
const plantFactory = new PlantFactory({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    leafCount: 20,
    stemRadius: 10,
    angle: goldenAngleDegrees - 1
});

document.getElementById(svgContainerElementId).innerHTML = [
    svgFactory.openSvg(x + w + x, y + h + y),
    plantFactory.build(),
    svgFactory.closeSvg()
].join('');