const LeafFactory = require('./leafFactory');

class PlantFactory {
    constructor() {
        this.leafFactory = new LeafFactory();
    }

    build() {
        return this.leafFactory.BuildLeaf();
    }
}

module.exports = PlantFactory;