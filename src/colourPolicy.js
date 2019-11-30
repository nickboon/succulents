export default class ColourPolicy {
	static constant(colour) {
		return colour;
	}
	static greenToRed(colour, rate = 0) {
		if (colour && colour.add) return colour.add(rate, -rate / 2);
	}

	static redToGreen(colour, rate = 0) {
		if (colour && colour.add) return colour.add(-rate / 2, rate);
	}

	static greenToBlue(colour, rate = 0) {
		if (colour && colour.add) return colour.add(0, -rate, rate / 2);
	}

	static blueToGreen(colour, rate = 0) {
		if (colour && colour.add) return colour.add(0, rate / 2, -rate);
	}

	static blueToRed(colour, rate = 0) {
		if (colour && colour.add) return colour.add(rate * 2, -rate * 2);
	}

	static redToBlue(colour, rate = 0) {
		if (colour && colour.add) return colour.add(0, 0, rate);
	}

	static get keys() {
		return Object.getOwnPropertyNames(ColourPolicy).filter(
			name =>
				name !== 'prototype' &&
				name !== 'name' &&
				name !== 'keys' &&
				name != 'length'
		);
	}
}
