const LeafFactory = require('./leafFactory');

const goldenAngleDegrees = 137.5077640500378546463487;

class PlantFactory {
    constructor({
        x = 0,
        y = 0,
        leafCount = 1,
        stemRadius = 10,
        stemOffset = 0,
        angle = goldenAngleDegrees
    } = {}) {
        this.x = x;
        this.y = y;
        this.leafCount = leafCount;
        this.stemRadius = stemRadius;
        this.stemOffset = stemOffset;
        this.angle = angle;
        this.leafFactory = new LeafFactory();
    }

    build() {
        let leaves = [];
        for (let i = this.leafCount; i > 0; i--)
            leaves.unshift(this.leafFactory.buildLeaf({
                translation: {
                    x: this.x,
                    y: this.y - this.stemRadius + this.stemOffset * i,
                },
                rotation: {
                    angle: this.angle * i,
                    offsetY: this.stemRadius - this.stemOffset * i
                }
            }));

        return leaves.join('');
    }
}

module.exports = PlantFactory;