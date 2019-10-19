const defaultLeafSvg = '<path d="M10.55,1.92a3.55,3.55,0,0,0,2.67,2.44s10.49,2.28,6.44,9.9c0,0-2.94,4.13-4.71,13-.38-1.72-2.1-1.57-4.36-2.15-2.26.58-4.06.43-4.45,2.15-1.76-8.88-4.71-13-4.71-13-4-7.62,6.44-9.9,6.44-9.9A3.55,3.55,0,0,0,10.55,1.92Z"/>';

class LeafFactory {
    BuildLeaf() {
        return defaultLeafSvg;
    }
}

module.exports = LeafFactory;