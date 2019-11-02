const _angles = new WeakMap();
const _incrementCount = new WeakMap();

const wrapToRange = (x, min, max) => (((x - min) % (max - min)) + (max - min)) % (max - min) + min;

class Trigonometry {
    constructor(incrementCount = 360) {
        if (incrementCount < 1)
            throw new RangeError('Angle incrementCount must be greater than 1');

        _incrementCount.set(this, incrementCount);

        const angles = [];
        for (let i = incrementCount - 1; i >= 0; i -= 1) {
            const increment = i / incrementCount;
            const degrees = increment * 360;
            const radians = increment * Math.PI * 2;
            angles[i] = {
                degrees,
                radians,
                sin: Math.sin(radians),
                cos: Math.cos(radians)
            };
        }
        _angles.set(this, angles);
    }

    getAngle(increment) {
        const max = _incrementCount.get(this);
        return _angles.get(this)[wrapToRange(increment, 0, max)];
    }
}

module.exports = Trigonometry;