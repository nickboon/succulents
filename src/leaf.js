export default class LeafSvg {
	static get typeA() {
		return {
			build: (stroke, fill, opacity, transformation) =>
				`<path vector-effect="non-scaling-stroke" d="M10.55,1.92a3.55,3.55,0,0,0,2.67,2.44s10.49,2.28,6.44,9.9c0,0-2.94,4.13-4.71,13,0,0-2.14,4.28-4.4,3.71-2.26.57-3.1-1.41-4.41-3.71-1.76-8.88-4.71-13-4.71-13-4-7.62,6.44-9.9,6.44-9.9A3.55,3.55,0,0,0,10.55,1.92Z" transform="${transformation}" fill="${fill}" stroke="${stroke}" opacity="${opacity}" />`,
			w: 20.093,
			h: 31.58
		};
	}

	static get typeB() {
		return {
			build: (stroke, fill, opacity, transformation) =>
				`<path vector-effect="non-scaling-stroke" d="M8.12,30.58c.92,0,2.38-1.32,4.77-6s2.62-7.18,2.62-7.18c1.53-7.55-5-12.71-5-12.71A8.1,8.1,0,0,1,8.12,1.43,8.1,8.1,0,0,1,5.74,4.64S-.8,9.8.73,17.35c0,0,.27,2.37,2.62,7.18S7.2,30.58,8.12,30.58Z" transform="${transformation}" fill="${fill}" stroke="${stroke}" opacity="${opacity}" />`,
			w: 16.24,
			h: 31.08
		};
	}

	static get typeC() {
		return {
			build: (stroke, fill, opacity, transformation) =>
				`<path vector-effect="non-scaling-stroke" d="M8.12,30.58c.92,0,2.38-1.32,4.77-6s2.62-7.18,2.62-7.18c1.53-7.55-5-12.71-5-12.71A8.1,8.1,0,0,1,8.12,1.43,8.1,8.1,0,0,1,5.74,4.64S-.8,9.8.73,17.35c0,0,.27,2.37,2.62,7.18S7.2,30.58,8.12,30.58Z" transform="${transformation}" fill="${fill}" stroke="${stroke}" opacity="${opacity}" />`,
			w: 14.897,
			h: 30.54
		};
	}

	static get typeD() {
		return {
			build: (stroke, fill, opacity, transformation) =>
				`<path vector-effect="non-scaling-stroke" d="M12,31.47c2.11-.67,3.25-6.42,8.37-12.33,2.92-3,3.09-5.63,3.09-5.63C23.5,3.28,15,2.37,15.14,2.39,12.57,1.79,12,.89,12,.89s-.62.9-3.18,1.5c0,0-8.36.87-8.27,11.12,0,0,.17,2.67,3.08,5.63C8.71,25.05,9.85,30.8,12,31.47Z" transform="${transformation}" fill="${fill}" stroke="${stroke}" opacity="${opacity}" />`,
			w: 22.908,
			h: 30.583
		};
	}

	static get typeE() {
		return {
			build: (stroke, fill, opacity, transformation) =>
				`<path vector-effect="non-scaling-stroke" d="M12.23.05S12.1,1.4,14.47,3.52c0,0,8.59,6.7,9.27,12.75,0,0,1.42,5.87-3.08,9.25-.9.82-5.7,3.71-8.43,3.58h0c-2.73.13-7.53-2.76-8.43-3.58C-.71,22.14.71,16.27.71,16.27,1.39,10.22,10,3.52,10,3.52,12.35,1.4,12.22.05,12.22.05" transform="${transformation}" fill="${fill}" stroke="${stroke}" opacity="${opacity}" />`,
			w: 23.451,
			h: 29.06
		};
	}

	static get typeF() {
		return {
			build: (stroke, fill, opacity, transformation) =>
				`<path vector-effect="non-scaling-stroke" d="M18.2,29.66a12.68,12.68,0,0,0,3.35-.43C30,24.62,35.17,15.49,35.17,15.49c4.08-6-11.59-10.67-11.59-10.67C20,3.31,17.79,1,18.2.5h-.05c.41.45-1.82,2.81-5.39,4.32,0,0-15.66,4.72-11.58,10.67,0,0,5.17,9.13,13.62,13.74a12.68,12.68,0,0,0,3.35.43" transform="${transformation}" fill="${fill}" stroke="${stroke}" opacity="${opacity}" />`,
			w: 35.346,
			h: 29.157
		};
	}

	static get typeG() {
		return {
			build: (stroke, fill, opacity, transformation) =>
				`<path vector-effect="non-scaling-stroke" d="M16,26.57c3.71.57,5.07-1.41,7.22-3.71,6.64-7.86,8-15,8-15C33.65-.68,17,1.23,17,1.23A2.29,2.29,0,0,1,16,0h0a2.22,2.22,0,0,1-1,1.21S-1.74-.68.76,7.82c0,0,1.34,7.18,8,15,2.14,2.3,3.51,4.28,7.21,3.71Z" transform="${transformation}" fill="${fill}" stroke="${stroke}" opacity="${opacity}" />`,
			w: 30.957,
			h: 26.669
		};
	}

	static get typeH() {
		return {
			build: (stroke, fill, opacity, transformation) =>
				`<path vector-effect="non-scaling-stroke" d="M11,29.06a7.06,7.06,0,0,0,6.77-2.25c5-6.42,3.5-9.69,3.5-9.69C21,14.22,16.19,9.2,14,6.1,11,2,11,0,11,0s0,2-3,6.1c-2.19,3.1-7,8.12-7.25,11,0,0-1.5,3.27,3.5,9.69A7.06,7.06,0,0,0,11,29.06Z" transform="${transformation}" fill="${fill}" stroke="${stroke}" opacity="${opacity}" />`,
			w: 20.963,
			h: 29.259
		};
	}

	static get keys() {
		return Object.getOwnPropertyNames(LeafSvg).filter(
			name =>
				name !== 'name' &&
				name !== 'length' &&
				name !== 'prototype' &&
				name !== 'keys'
		);
	}
}
