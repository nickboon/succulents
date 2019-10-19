const LeafFactory = require('./leafFactory');

const goldenAngleDegrees = 137.5077640500378546463487;

class PlantFactory {
    constructor({
        x = 0,
        y = 0,
        leafCount = 1,
        stemRadius = 10,
        angle = goldenAngleDegrees
    } = {}) {
        this.x = x;
        this.y = y;
        this.leafCount = leafCount;
        this.stemRadius = stemRadius;
        this.angle = angle;
        this.leafFactory = new LeafFactory();
    }

    build() {
        let plant = '';
        for (let i = this.leafCount; i > 0; i--)
            plant += this.leafFactory.buildLeaf({
                translation: {
                    x: this.x,
                    y: this.y - this.stemRadius,
                },
                rotation: {
                    angle: this.angle * i,
                    offsetY: this.stemRadius
                }
            });

        return plant;
    }
}

module.exports = PlantFactory;