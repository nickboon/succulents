class LeafSvg {
    get concaveBase() {
        return {
            build: transformation => `<path vector-effect="non-scaling-stroke" d="M10.55,1.92a3.55,3.55,0,0,0,2.67,2.44s10.49,2.28,6.44,9.9c0,0-2.94,4.13-4.71,13-.38-1.72-2.1-1.57-4.36-2.15-2.26.58-4.06.43-4.45,2.15-1.76-8.88-4.71-13-4.71-13-4-7.62,6.44-9.9,6.44-9.9A3.55,3.55,0,0,0,10.55,1.92Z" transform="${transformation}" />`,
            w: 20.093,
            h: 25.349
        };
    }

    get convexBase() {
        return {
            build: transformation => `<path vector-effect="non-scaling-stroke" d="M10.55,1.92a3.55,3.55,0,0,0,2.67,2.44s10.49,2.28,6.44,9.9c0,0-2.94,4.13-4.71,13,0,0-2.14,4.28-4.4,3.71-2.26.57-3.1-1.41-4.41-3.71-1.76-8.88-4.71-13-4.71-13-4-7.62,6.44-9.9,6.44-9.9A3.55,3.55,0,0,0,10.55,1.92Z" transform="${transformation}" />`,
            w: 20.093,
            h: 31.58
        };
    }

    get noBase() {
        return {
            build: transformation => `<path vector-effect="non-scaling-stroke" d="M6.14,27.27c-1.76-8.88-4.71-13-4.71-13-4-7.62,6.44-9.9,6.44-9.9a3.55,3.55,0,0,0,2.68-2.44,3.55,3.55,0,0,0,2.67,2.44s10.49,2.28,6.44,9.9c0,0-2.94,4.13-4.71,13" transform="${transformation}" />`,
            w: 20.093,
            h: 25.349
        };
    }
}

class LeafFactory {
    buildLeaf({
        translation,
        rotation,
        scale,
    }) {
        const leaf = new LeafSvg().convexBase;
        const halfW = leaf.w * scale.x / 2;
        const h = leaf.h * scale.y;

        return leaf.build([
            `rotate(${rotation.angle},${translation.x},${translation.y + rotation.offsetY})`,
            `translate(${translation.x - halfW},${translation.y -h})`,
            `scale(${scale.x},${scale.y})`
        ].join(' '));
    }
}

module.exports = LeafFactory;