import {renderVerticalBase, pocketStyle} from './base';

export function renderThroughTails(state, anchor) {
	const {
		general: {
			cutter: {dovetailDiameter},
			material: {thickness, width: materialWidth},
		},
		pins,
		halfPins,
	} = state;

	const radius = dovetailDiameter / 2;

	const top = -1.1 * radius;
	const middle = thickness + 0.1 * dovetailDiameter;
	const bottom = thickness + 1.5 * dovetailDiameter;

	const maxLeft = -1.1 * radius;
	const maxRight = materialWidth + 1.1 * radius;

	const steps = [`M ${maxLeft} ${bottom}`];

	function addFinger(endX) {
		steps.push(`V ${top}`);
		steps.push(`H ${endX}`);
		steps.push(`V ${middle}`);
	}

	if (halfPins.enabled) {
		addFinger(halfPins.width);
	} else {
		steps.push(`V ${middle}`);
	}

	for (const pin of pins) {
		const left = pin.x - pin.maxWidth / 2;
		const right = pin.x + pin.maxWidth / 2;
		steps.push(`H ${left}`);
		addFinger(right);
	}

	if (halfPins.enabled) {
		steps.push(`H ${materialWidth - halfPins.width}`);
		addFinger(maxRight);
	} else {
		steps.push(`H ${maxRight}`);
	}

	steps.push(`V ${bottom}`);
	steps.push(`Z`);

	return renderVerticalBase(
		state,
		anchor,
		`<path style="${pocketStyle}" d="${steps.join(' ')}" />`,
	);
}

function renderHalfTails(state, anchor) {
	const {
		general: {
			cutter: {dovetailDiameter, angle},
			material: {dovetailLength, thickness, width: materialWidth},
		},
		pins,
		halfPins,
	} = state;

	const radius = dovetailDiameter / 2;
	const tangent = Math.tan(2 * angle * Math.PI / 360);
	const inset = thickness * tangent;
	const innerRadius = radius - inset;

	const top = -1.1 * radius;
	const middle = dovetailLength - inset;
	const bottom = dovetailLength + 1.5 * dovetailDiameter;

	const maxLeft = -1.1 * radius;
	const maxRight = materialWidth + 1.1 * radius;

	let x = maxLeft;
	let y = bottom;
	const steps = [`M ${x} ${y}`];

	function h(newX) {
		x = newX;
		steps.push(`H ${x}`);
	}

	function v(newY) {
		y = newY;
		steps.push(`V ${y}`);
	}

	function a() {
		x += innerRadius;
		if (y < middle) {
			y += innerRadius;
		} else {
			y -= innerRadius;
		}

		steps.push(`A ${innerRadius} ${innerRadius} 90 0 0 ${x} ${y}`);
	}

	function addFinger(endX) {
		v(top);
		h(endX);
		if (endX === maxRight) {
			v(middle);
		} else {
			v(middle - innerRadius);
			a();
		}
	}

	if (halfPins.enabled) {
		addFinger(halfPins.width);
	} else {
		v(middle);
	}


	let sortedPins = [...pins];
	sortedPins.sort((a, b) => a.x - b.x);
	for (const pin of sortedPins) {
		const left = pin.x - pin.maxWidth / 2;
		const right = pin.x + pin.maxWidth / 2;
		h(left - innerRadius);
		a();
		addFinger(right);
	}

	if (halfPins.enabled) {
		h(materialWidth - halfPins.width - innerRadius);
		a();
		addFinger(maxRight);
	} else {
		h(maxRight);
	}

	v(bottom);
	steps.push(`Z`);

	return renderVerticalBase(
		state,
		anchor,
		`<path style="${pocketStyle}" d="${steps.join(' ')}" />`,
	);
}

export function renderHalfTailsA(state, anchor) {
	return renderHalfTails(state, 'bottomleft');
}

export function renderHalfTailsB(state, anchor) {
	const {
		general: {material: {width}},
		pins,
	} = state;
	const center = width / 2;

	return renderHalfTails(
		{
			...state,
			pins: pins.map(
				(p, i, ps) => ({
					...p,
					x: center - (p.x - center),
				}),
			),
		},
		'bottomright',
	);
}
