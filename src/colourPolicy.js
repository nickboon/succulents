export default {
	constant: colour => colour,
	greenToRed: (colour, rate = 0) => {
		if (colour && colour.add) return colour.add(rate, Math.floor(-rate / 2));
	},
	redToGreen: (colour, rate = 0) => {
		if (colour && colour.add) return colour.add(Math.floor(-rate / 2), rate);
	},

	greenToBlue: (colour, rate = 0) => {
		if (colour && colour.add) return colour.add(0, -rate, Math.floor(rate / 2));
	},
	blueToGreen: (colour, rate = 0) => {
		if (colour && colour.add) return colour.add(0, Math.floor(rate / 2), -rate);
	}
};
