export default {
	constant: colour => colour,
	greenToRed: (colour, rate = 0) => {
		if (colour && colour.add) return colour.add(rate, -rate / 2);
	},

	redToGreen: (colour, rate = 0) => {
		if (colour && colour.add) return colour.add(-rate / 2, rate);
	},

	greenToBlue: (colour, rate = 0) => {
		if (colour && colour.add) return colour.add(0, -rate, rate / 2);
	},

	blueToGreen: (colour, rate = 0) => {
		if (colour && colour.add) return colour.add(0, rate / 2, -rate);
	},

	blueToRed: (colour, rate = 0) => {
		if (colour && colour.add) return colour.add(rate * 2, -rate * 2);
	},

	redToBlue: (colour, rate = 0) => {
		if (colour && colour.add) return colour.add(0, 0, rate);
	}
};
