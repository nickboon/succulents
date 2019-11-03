import Ui from './ui';

const _ui = new WeakMap();

export default class SvgUi {
	constructor() {
		_ui.set(this, new Ui());
	}

	setDownload(svg, vectorDownloadKeyCode, prefix = document.title) {
		const ui = _ui.get(this);
		ui.setKeyListener(vectorDownloadKeyCode, () => {
			const svgDataUrl = `data:application/octet-stream,${encodeURIComponent(
				svg
			)}`;
			const filename = `${prefix}_${Date.now()}.svg`;
			ui.download(filename, svgDataUrl);
		});
	}
}
