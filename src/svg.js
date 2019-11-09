const defaults = new WeakMap();

export default class Elements {
	constructor({
		opacity = 1,
		stroke = '#000',
		fontSize = 10,
		textAnchor = 'left',
		fill = '#fff'
	} = {}) {
		defaults.set(this, {
			opacity,
			stroke,
			fontSize,
			textAnchor,
			fill
		});
	}

	declaration() {
		return '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';
	}
	openSvg(
		width,
		height,
		opacity = defaults.get(this).opacity,
		stroke = defaults.get(this).stroke,
		fill = defaults.get(this).fill
	) {
		return [
			'<svg',
			[
				'\tversion="1.1"',
				'xmlns="http://www.w3.org/2000/svg"',
				'xmlns:xlink="http://www.w3.org/1999/xlink"',
				`width="${width}" height="${height}" stroke="${stroke}" fill="${fill}" opacity="${opacity}"`
			].join('\n\t'),
			'>'
		].join('\n');
	}

	closeSvg() {
		return '</svg>';
	}

	text(
		text,
		point,
		{
			opacity = defaults.get(this).opacity,
			colour = defaults.get(this).stroke,
			fontSize = defaults.get(this).fontSize,
			textAnchor = defaults.get(this).textAnchor
		} = {}
	) {
		return `<text x="${point.x}" y="${point.y}" fill="${colour}" stroke="none" opacity="${opacity}" text-anchor="${textAnchor}" font-size="${fontSize}" font-family="Arial, Helvetica, sans-serif">${text}</text>`;
	}

	line(
		pointA,
		pointB,
		colour = defaults.get(this).colour,
		opacity = defaults.get(this).opacity
	) {
		return `<path d="M${pointA.x} ${pointA.y} L${pointB.x} ${pointB.y}" stroke="${colour}" opacity="${opacity}" />`;
	}

	polygon(
		points,
		fill = defaults.get(this).fill,
		opacity = defaults.get(this).opacity
	) {
		return `<polygon points="${points
			.map(p => `${p.x},${p.y}`)
			.join(' ')}" fill="${fill}" opacity="${opacity}" />`;
	}

	quadraticBezier(
		pointA,
		pointB,
		pointC,
		colour = defaults.get(this).colour,
		opacity = defaults.get(this).opacity
	) {
		return `<path d="M${pointA.x} ${pointA.y} Q${pointB.x} ${pointB.y}, ${pointC.x} ${pointC.y}" stroke="${colour}" fill="none" opacity="${opacity}" />`;
	}

	cubicBezier(
		pointA,
		pointB,
		pointC,
		pointD,
		colour = defaults.get(this).colour,
		opacity = defaults.get(this).opacity
	) {
		return `<path d="M${pointA.x} ${pointA.y} C${pointB.x} ${pointB.y}, ${pointC.x} ${pointC.y}, ${pointD.x} ${pointD.y}" stroke="${colour}" fill="none" opacity="${opacity}" />`;
	}
}
