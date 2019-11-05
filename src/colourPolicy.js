export default {
	constant: colour => colour,
	greenToRed: (colour, rate = 0) => {
		if (colour && colour.add) return colour.add(rate, Math.floor(-rate / 2));
	},
	greenToBlue: (colour, rate = 0) => {
		if (colour && colour.add) return colour.add(0, -rate, Math.floor(rate / 2));
	}
};
