const LeafFactory = require('./leafFactory');
const FibonacciSeries = require('./fibonacciSeries');

const _options = new WeakMap();
const _leafFactory = new WeakMap();
//const _fibonacciSeries = new WeakMap();
const goldenAngleDegrees = 137.5077640500378546463487;
//const nthFibonacciNumber = (n, a = 1, b = 0) => (n === 0) ? b : nthFibonacciNumber(n - 1, a + b, a);

class PlantFactory {
    constructor({
        x = 0,
        y = 0,
        leafCount = 1,
        stemRadius = 10,
        stemOffset = 0,
        angleOffset = 0,
        scale = .1,
        scalePolicy
    } = {}) {
        const fibonacciSeries = new FibonacciSeries();
        const defaultScalePolicy = i => i ? 1 + 1 / fibonacciSeries.nthNumber(i) : 1;
        scalePolicy = scalePolicy || defaultScalePolicy;

        _options.set(this, {
            x,
            y,
            leafCount,
            stemRadius,
            stemOffset,
            angleOffset,
            scalePolicy,
            scale
        });
        _leafFactory.set(this, new LeafFactory());
    }

    centremarker() {
        const {
            x,
            y,
            stemRadius
        } = _options.get(this);
        return [
            `<path d="M${x - stemRadius} ${y} L${x + stemRadius} ${y}" />`,
            `<path d="M${x } ${y- stemRadius} L${x} ${y + stemRadius}" />`
        ].join('');
    }

    build() {
        const leafFactory = _leafFactory.get(this);
        const {
            x,
            y,
            leafCount,
            stemRadius,
            stemOffset,
            angleOffset,
            scale,
            scalePolicy
        } = _options.get(this);
        let leaves = [];
        let scaleX = scale;
        let scaleY = scale;
        for (let i = 0; i < leafCount; i++) {
            leaves.push(leafFactory.buildLeaf({
                translation: {
                    x,
                    y: y - stemRadius + stemOffset * i,
                },
                rotation: {
                    angle: (goldenAngleDegrees + angleOffset) * i,
                    offsetY: stemRadius - stemOffset * i
                },
                scale: {
                    x: scaleX,
                    y: scaleY
                }
            }));

            scaleX += scalePolicy(i, true) * scale;
            scaleY += scalePolicy(i) * scale;
        }

        return leaves.reverse().join('');
    }
}

module.exports = PlantFactory;