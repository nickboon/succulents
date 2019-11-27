import FibonacciSeries from './fibonacciSeries.js';

const _fibonacciSeries = new WeakMap();
const _defaults = new WeakMap();

export default class ScalePolicyFactory {
	constructor({ scaleModifier = { x: 1, y: 1 } } = {}) {
		_fibonacciSeries.set(this, new FibonacciSeries());
		_defaults.set(this, {
			scaleModifier
		});
	}

	noScale() {
		return () => 0;
	}

	inverseIndex(scaleModifier = _defaults.get(this).scaleModifier) {
		return (i, isX) =>
			(i ? 1 / i : 1) * (isX ? scaleModifier.x : scaleModifier.y);
	}

	inverseFibonacci(scaleModifier = _defaults.get(this).scaleModifier) {
		return (i, isX) =>
			(i ? 1 / _fibonacciSeries.get(this).nthNumber(i) : 1) *
			(isX ? scaleModifier.x : scaleModifier.y);
	}

	constant() {
		return () => 0;
	}
}
