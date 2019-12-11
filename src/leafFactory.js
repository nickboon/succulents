import LeafSvg from './leaf.js';

export default class LeafFactory {
	buildSvg({
		type = 'typeA',
		translation,
		rotation,
		scale,
		stroke = {},
		fill = {},
		opacity = 0.5
	} = {}) {
		const leaf = LeafSvg[type];
		const halfW = (leaf.w * scale.x) / 2;
		const h = leaf.h * scale.y;
		return leaf.build(
			stroke.hexString || 'black',
			fill.hexString || 'none',
			opacity,
			[
				`rotate(${rotation.angle},${translation.x},${translation.y +
					rotation.offsetY})`,
				`translate(${translation.x - halfW},${translation.y - h})`,
				`scale(${scale.x},${scale.y})`
			].join(' ')
		);
	}
}
