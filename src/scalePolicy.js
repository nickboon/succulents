import FibonacciSeries from './fibonacciSeries';

const _fibonacciSeries = new WeakMap();
const _defaults = new WeakMap();

export default class ScalePolicyFactory {
	constructor({ scaleModifier = 0.1, inverseMagnitude = 30 } = {}) {
		_fibonacciSeries.set(this, new FibonacciSeries());
		_defaults.set(this, {
			scaleModifier,
			inverseMagnitude
		});
	}

	noScale() {
		return () => 0;
	}

	inverseFibonacci(scaleModifier = _defaults.get(this).scaleModifier) {
		return i =>
			(i ? 1 + 1 / _fibonacciSeries.get(this).nthNumber(i) : 1) * scaleModifier;
	}

	constant(
		inverseMagnitude = _defaults.get(this).inverseMagnitude,
		scaleModifier = _defaults.get(this).scaleModifier
	) {
		return i => (i / inverseMagnitude) * scaleModifier;
	}
}
