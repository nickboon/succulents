class ColourPolicy {
    static get constant() {
        return colour => colour;
    }

    static get greenToRed() {
        return (colour, rate = 0) => colour.add(rate, -rate);
    }

    static get greenToBlue() {
        return (colour, rate = 0) => colour.add(0, -rate, rate);
    }
}

module.exports = ColourPolicy;