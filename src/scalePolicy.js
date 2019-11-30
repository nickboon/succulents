import FibonacciSeries from './fibonacciSeries.js';

const fibonacciSeries = new FibonacciSeries();

export default class ScalePolicy {
	static get inverseIndex() {
		return i => (i ? 1 / i : 1);
	}

	static get inverseFibonacci() {
		return i => (i ? 1 / fibonacciSeries.nthNumber(i) : 1);
	}

	static get constant() {
		return () => 0;
	}

	static get keys() {
		return Object.getOwnPropertyNames(ScalePolicy).filter(
			name =>
				name !== 'prototype' &&
				name !== 'name' &&
				name !== 'keys' &&
				name != 'length'
		);
	}
}
