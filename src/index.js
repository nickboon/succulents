const SvgFactory = require('./svg');
const PlantFactory = require('./plantFactory');
const SvgUi = require('./svgUi');

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
    leafCount: 50,
    stemRadius: 3,
    angle: goldenAngleDegrees + 6,
    scale: .1
});
document.getElementById(svgContainerElementId).innerHTML = [
    svgFactory.openSvg(x + w + x, y + h + y),
    plantFactory.build(),
    svgFactory.closeSvg()
].join('');

const vectorDownloadKeyCode = 80; // p key
new SvgUi().setDownload(svgContainerElementId, vectorDownloadKeyCode);