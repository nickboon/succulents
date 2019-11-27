export default class Random {
	int(max) {
		return Math.floor(Math.random() * (max + 1));
	}

	intBetween(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	bool() {
		return this.int(1) === 0;
	}

	index(array) {
		if (array.length === 0) return -1;
		return this.int(array.length - 1);
	}
	arrayElement(array) {
		if (array.length === 0) return false;
		return array[this.index(array)];
	}

	removeFromOptions(options) {
		return options.splice(this.getIndex(options), 1)[0];
	}

	tryGetFromOptions(options, filter = () => true) {
		for (let i = options.length; i > 0; i--) {
			const randomOption = this.removeFromOptions(options);
			if (filter(randomOption)) return randomOption;
		}
		return false;
	}

	id(length, useTimestamp) {
		let letters;
		do {
			letters = Math.random()
				.toString(36)
				.replace(/[^a-z]+/g, '')
				.substr(0, length);
		} while (!letters);
		return letters + (useTimestamp ? Date.now() : '');
	}
}
