const LeafFactory = require('./leafFactory');
const Trigonometry = require('./trigonometry');
const svgFactory = require('./svg');
const ScalePolicy = require('./scalePolicy');
const ColourPolicy = require('./colourPolicy');
const Colour = require('./colour');

const _options = new WeakMap();
const _leafFactory = new WeakMap();
const goldenAngleDegrees = 137.5077640500378546463487;

/*
    leaf angles
    ===========

        90
        |
    180 --- 0
        |
       270
*/
class PlantFactory {
    constructor({
        addCentreMarker = false,
        addLabel = true,
        x = 0,
        y = 0,
        leafCount = 100,
        stemRadius = 10,
        angleOffset = 0,
        leafLength = .5,
        leafWidth = .5,
        startLeafAngle = 0,
        endLeafAngle = 270,
        leafAngleIncrements = 90,
        scalePolicy = new ScalePolicy().inverseFibonacci(),
        stroke = Colour.green,
        fill = Colour.white,
        strokeColourPolicy = ColourPolicy.constant,
        fillColourPolicy = ColourPolicy.constant,
        opacity = 1
    } = {}) {
        _options.set(this, {
            addCentreMarker,
            addLabel,
            x,
            y,
            leafCount,
            stemRadius,
            angleOffset,
            scalePolicy,
            leafLength,
            leafWidth,
            startLeafAngle,
            endLeafAngle,
            leafAngleIncrements,
            stroke,
            fill,
            strokeColourPolicy,
            fillColourPolicy,
            opacity
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

    label() {
        const options = _options.get(this);
        return new svgFactory().text(
            Object.keys(options).map(key => `${key}: ${options[key]}`).join(', ') + '.', {
                x: 50,
                y: 12
            }
        );
    }

    build() {
        const leafFactory = _leafFactory.get(this);
        const {
            addCentreMarker,
            addLabel,
            x,
            y,
            leafCount,
            stemRadius,
            angleOffset,
            leafLength,
            leafWidth,
            startLeafAngle,
            endLeafAngle,
            leafAngleIncrements,
            scalePolicy,
            stroke,
            fill,
            strokeColourPolicy,
            fillColourPolicy,
            opacity
        } = _options.get(this);
        const trigTable = new Trigonometry(leafAngleIncrements);
        const maxDegrees = 360;
        const startAngleIncrement = leafAngleIncrements * startLeafAngle / maxDegrees;
        const endAngleIncrements = leafAngleIncrements * endLeafAngle / maxDegrees;
        const range = endAngleIncrements - startAngleIncrement;

        let scaleX = leafLength;
        let scaleY = leafLength;
        let angleIncrement = startAngleIncrement;
        let leaves = [];
        let currentStroke = stroke;
        let currentFill = fill;

        if (scalePolicy.toString() !== new ScalePolicy().noScale().toString()) {
            scaleY /= 10;
            scaleX /= 10;
        }

        for (let i = 0; i < leafCount; i++) {
            const angle = trigTable.getAngle(angleIncrement);
            const tiltScale = -angle.cos;
            const z = angle.sin;
            const svg = leafFactory.buildLeaf({
                translation: {
                    x,
                    y: y - stemRadius,
                },
                rotation: {
                    angle: (goldenAngleDegrees + angleOffset) *
                        i,
                    offsetY: stemRadius
                },
                scale: {
                    x: scaleX,
                    y: scaleY * tiltScale
                },
                stroke: currentStroke,
                fill: currentFill,
                opacity
            });
            leaves.push({
                svg,
                z
            });

            scaleX += scalePolicy(i) * leafWidth;
            scaleY += scalePolicy(i) * leafLength;
            currentStroke = strokeColourPolicy(currentStroke);
            currentFill = fillColourPolicy(currentFill);

            if (i < range) angleIncrement += 1;
        }

        return leaves
            .reverse()
            .sort((a, b) => (a.z > b.z) ? 1 : ((b.z > a.z) ? -1 : 0))
            .map(leaf => leaf.svg)
            .join('') +
            (addLabel ? this.label() : '') +
            (addCentreMarker ? this.centremarker() : '');
    }
}

module.exports = PlantFactory;