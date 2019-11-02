const _red = new WeakMap();
const _green = new WeakMap();
const _blue = new WeakMap();

const max = 256;
const toHexColourString = decimal => {
    const hex = (decimal).toString(16);
    return (hex.length < 2 ? '0' : '') + hex;
};

class Colour {
    constructor(red = 0, green = 0, blue = 0) {
        _red.set(this, red % max);
        _green.set(this, green % max);
        _blue.set(this, blue % max);
    }

    static get crimson() {
        return new Colour(220, 20, 60);
    }

    static get darkRed() {
        return new Colour(139, 0, 0);
    }

    static get darkKhaki() {
        return new Colour(189, 183, 107);
    }

    static get green() {
        return new Colour(0, 128, 0);
    }

    static get limeGreen() {
        return new Colour(50, 205, 50);
    }

    static get greenYellow() {
        return new Colour(173, 255, 47);
    }

    static get yellowgGreen() {
        return new Colour(154, 205, 50);
    }

    static get darkSeaGreen() {
        return new Colour(143, 188, 143);
    }

    static get mediumSeaGreen() {
        return new Colour(60, 179, 113);
    }

    static get seaGreen() {
        return new Colour(46, 139, 87);
    }
    static get olive() {
        return new Colour(128, 128, 0);
    }

    static get darkOliveGreen() {
        return new Colour(85, 107, 47);
    }

    static get oliveDrab() {
        return new Colour(107, 142, 35);
    }

    static get white() {
        return new Colour(255, 255, 255);
    }

    static get black() {
        return new Colour(0, 0, 0);
    }

    get hexString() {
        const redHex = toHexColourString(_red.get(this));
        const greenHex = toHexColourString(_green.get(this));
        const blueHex = toHexColourString(_blue.get(this));
        return `#${redHex}${greenHex}${blueHex}`;
    }

    add(red, green = 0, blue = 0) {
        return new Colour(
            _red.get(this) + red % max,
            _green.get(this) + green % max,
            _blue.get(this) + blue % max
        );
    }
}

module.exports = Colour;