import {Anchor, renderVerticalBase, pocketStyle} from './base';

import type {Store} from '../context/store';
import isBeta from '../util/beta';

export function renderThroughTails(state: Store, anchor: Anchor): string {
	const {
		general: {
			cutter: {dovetailDiameter},
			material: {thickness, width: materialWidth},
		},
		pins,
		halfPins,
	} = state;

	const encodedDepth = isBeta()
		? `shaper:cutDepth="${thickness}mm"`
		: '';

	const radius = dovetailDiameter / 2;

	const top = -1.1 * radius;
	const middle = thickness + 0.1 * dovetailDiameter;
	const bottom = thickness + 1.5 * dovetailDiameter;

	const buffer = minBuffer(state);
	const maxLeft = -buffer;
	const maxRight = materialWidth + buffer;

	const steps = [`M ${maxLeft} ${bottom}`];

	function addFinger(endX: number) {
		steps.push(`V ${top}`);
		steps.push(`H ${endX}`);
		steps.push(`V ${middle}`);
	}

	if (halfPins.enabled) {
		addFinger(halfPins.width);
	} else {
		steps.push(`V ${middle}`);
	}

	let sortedPins = [...pins];
	sortedPins.sort((a, b) => a.x - b.x);
	for (const pin of sortedPins) {
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
		`<path style="${pocketStyle}" d="${steps.join(' ')}" ${encodedDepth} />`,
	);
}

function renderHalfTails(state: Store, anchor: Anchor): string {
	const {
		general: {
			cutter: {dovetailDiameter, angle},
			material: {dovetailLength, thickness, width: materialWidth},
		},
		pins,
		halfPins,
	} = state;

	const encodedDepth = isBeta()
		? `shaper:cutDepth="${thickness}mm"`
		: '';

	const radius = dovetailDiameter / 2;
	const tangent = Math.tan(2 * angle * Math.PI / 360);
	const inset = thickness * tangent;
	const innerRadius = radius - inset;

	const top = -1.1 * radius;
	const middle = dovetailLength - inset;
	const bottom = dovetailLength + 1.5 * dovetailDiameter;

	const buffer = minBuffer(state);
	const maxLeft = -buffer;
	const maxRight = materialWidth + buffer;

	let x = maxLeft;
	let y = bottom;
	const steps = [`M ${x} ${y}`];

	function h(newX: number) {
		x = newX;
		steps.push(`H ${x}`);
	}

	function v(newY: number) {
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

	function addFinger(endX: number) {
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
		`<path style="${pocketStyle}" d="${steps.join(' ')}" ${encodedDepth} />`,
	);
}

export function renderHalfTailsA(state: Store): string {
	return renderHalfTails(state, Anchor.BottomLeft);
}

export function renderHalfTailsB(state: Store): string {
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
		Anchor.BottomRight,
	);
}

function minBuffer(state: Store): number {
	const {
		general: {
			cutter: {dovetailDiameter},
		},
		halfPins,
	} = state;
	const radius = dovetailDiameter / 2;

	const buffer = 1.1 * radius;
	if (halfPins.enabled) {
		const halfPinBuffer = dovetailDiameter * 1.1 - halfPins.width;
		if (halfPinBuffer > buffer) {
			return halfPinBuffer;
		}
	}
	return buffer;
}
