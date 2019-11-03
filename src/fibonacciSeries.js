const cache = [];

export default class FibonacciSeries {
	nthNumber(n, i = 0, a = 1, b = 0) {
		if (cache[n - 1]) return cache[n - 1];

		cache[i] = a;
		return this.nthNumber(n, i + 1, a + b, a);
	}
}
