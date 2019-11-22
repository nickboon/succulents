const _red = new WeakMap();
const _green = new WeakMap();
const _blue = new WeakMap();

const max = 255;
const toRange = colour => (colour < 0 ? 0 : colour > max ? max : colour);

const toHexColourString = decimal => {
	const hex = decimal.toString(16);
	return (hex.length < 2 ? '0' : '') + hex;
};

export default class Colour {
	constructor(red = 0, green = 0, blue = 0) {
		_red.set(this, toRange(red));
		_green.set(this, toRange(green));
		_blue.set(this, toRange(blue));
	}

	static get definedColours() {
		return {
			darkGreen: new Colour(0, 100, 0),
			green: new Colour(0, 128, 0),
			limeGreen: new Colour(50, 205, 50),
			greenYellow: new Colour(173, 255, 47),
			yellowGreen: new Colour(154, 205, 50),
			darkSeaGreen: new Colour(143, 188, 143),
			mediumSeaGreen: new Colour(60, 179, 113),
			seaGreen: new Colour(46, 139, 87),
			olive: new Colour(128, 128, 0),
			darkOliveGreen: new Colour(85, 107, 47),
			oliveDrab: new Colour(107, 142, 35),
			darkKhaki: new Colour(189, 183, 107),
			paleTurquoise: new Colour(175, 238, 238),
			darkCyan: new Colour(0, 139, 139),
			crimson: new Colour(220, 20, 60),
			darkRed: new Colour(139, 0, 0),
			white: new Colour(255, 255, 255),
			black: new Colour(0, 0, 0)
		};
	}

	get hexString() {
		const redHex = toHexColourString(_red.get(this));
		const greenHex = toHexColourString(_green.get(this));
		const blueHex = toHexColourString(_blue.get(this));
		return `#${redHex}${greenHex}${blueHex}`;
	}

	add(red, green = 0, blue = 0) {
		return new Colour(
			_red.get(this) + Math.floor(red),
			_green.get(this) + Math.floor(green),
			_blue.get(this) + Math.floor(blue)
		);
	}
}
