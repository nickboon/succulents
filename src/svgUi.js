const Ui = require('./ui');

const _ui = new WeakMap();

class SvgUi {
    constructor() {
        _ui.set(this, new Ui());
    }

    setDownload(svgContainerElementId, vectorDownloadKeyCode) {
        const ui = _ui.get(this);
        ui.setKeyListener(vectorDownloadKeyCode, () => {
            const svg = document.getElementById(svgContainerElementId).innerHTML;
            const svgDataUrl = `data:application/octet-stream,${encodeURIComponent(svg)}`;
            const filename = `${svgContainerElementId}_${Date.now()}.svg`;
            ui.download(filename, svgDataUrl);
        });
    }
}

module.exports = SvgUi;