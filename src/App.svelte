<script>
	import SvgFactory from './svg';
	import PlantFactory from './plantFactory';
	import SvgUi from './svgUi';

	// svg varaiables
	const h = 400;
	const w = 1000;
	const x = 100;
	const y = 100;
	const svgFactory = new SvgFactory();
	const plantFactory = new PlantFactory({
		x: window.innerWidth / 2,
		y: window.innerHeight / 2
	});

	let svg = [
		svgFactory.openSvg(x + w + x, y + h + y),
		plantFactory.build(),
		svgFactory.closeSvg()
	].join('');

	const vectorDownloadKeyCode = 80; // p key
	new SvgUi().setDownload(svg, vectorDownloadKeyCode);
</script>

{@html svg}
