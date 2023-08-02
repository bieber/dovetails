import {
	Anchor,
	renderHorizontalBase,
	renderVerticalBase,
	pocketStyle,
} from './base';

import type {Store} from '../context/store';
import type {Pin} from '../context/pins';
import isBeta from '../util/beta';

type PartialPin = Pick<Pin, "x" | "maxWidth">
type Points = [number, number, number, number]

function renderThroughPins(
	state: Store,
	anchor: Anchor,
	points: (pin: PartialPin) => Points,
): string {
	const {
		general: {
			cutter: {straightDiameter},
			material: {thickness, width: materialWidth},
		},
		pins,
		halfPins,
	} = state;

	const encodedDepth = isBeta()
		? `shaper:cutDepth="${thickness}mm"`
		: '';

	const halfPinsEnabled = halfPins.enabled && pins.length > 0;

	const radius = straightDiameter / 2;

	const top = -1.1 * radius;
	const middle = thickness + .5 * radius;
	const bottom = thickness + 2 * straightDiameter;

	const buffer = minBuffer(state, true);
	const maxLeft = -buffer;
	const maxRight = materialWidth + buffer;

	const steps = [`M ${maxLeft} ${bottom}`];

	if (halfPinsEnabled) {
		const leftPoints = points({x: 0, maxWidth: halfPins.width * 2});
		steps.push(`V ${middle}`);
		steps.push(`H ${leftPoints[2]}`);
		steps.push(`L ${leftPoints[3]} ${top}`);
	} else {
		steps.push(`V ${top}`);
	}

	let sortedPins = [...pins];
	sortedPins.sort((a, b) => a.x - b.x);
	for (const pin of sortedPins) {
		const pinPoints = points(pin);
		steps.push(`H ${pinPoints[0]}`);
		steps.push(`L ${pinPoints[1]} ${middle}`);
		steps.push(`H ${pinPoints[2]}`);
		steps.push(`L ${pinPoints[3]} ${top}`);
	}

	if (halfPinsEnabled) {
		const rightPoints = points(
			{x: materialWidth, maxWidth: halfPins.width * 2},
		);
		steps.push(`H ${rightPoints[0]}`);
		steps.push(`L ${rightPoints[1]} ${middle}`);
	}
	steps.push(`H ${maxRight}`);

	steps.push(`V ${bottom}`);
	steps.push(`Z`);

	return renderVerticalBase(
		state,
		anchor,
		`<path style="${pocketStyle}" d="${steps.join(' ')}" ${encodedDepth}/>`,
	);
}

function expandedWidths(
	state: Store,
	pin: PartialPin,
	invert?: boolean,
): [number, number] {
	const {
		general: {
			cutter: {straightDiameter, angle},
			material: {thickness},
		},
	} = state;

	const radius = straightDiameter / 2;

	const top = -1.1 * radius;
	const middle = thickness + .5 * radius;

	// The trig here could probably be simpler, but it works.  I use
	// the same formula I use in the Pin visualizer component to
	// calculate the minimum width if we extend the shape of the pin up
	// to the top line.  Then I just apply it in reverse to get the
	// maximum width if we extend it down to the middle line.

	const {maxWidth} = pin;

	const tangent = Math.tan(2 * angle * Math.PI / 360);

	const minDistance = invert ? middle : thickness - top;
	const expandedMinWidth = maxWidth - 2 * minDistance * tangent;
	const expandedMaxWidth = expandedMinWidth + 2 * (middle - top) * tangent;

	return [expandedMinWidth, expandedMaxWidth];
}

export function renderThroughPinsA(state: Store, anchor: Anchor): string {
	function points(pin: PartialPin): Points {
		const {x} = pin;
		const [expandedMinWidth, expandedMaxWidth] = expandedWidths(state, pin);

		return [
			x - expandedMinWidth / 2,
			x - expandedMaxWidth / 2,
			x + expandedMaxWidth / 2,
			x + expandedMinWidth / 2,
		];
	}

	return renderThroughPins(state, anchor, points);
}

export function renderThroughPinsB(state: Store, anchor: Anchor): string {
	function points(pin: PartialPin): Points {
		const {x} = pin;
		const [expandedMinWidth, expandedMaxWidth] = expandedWidths(
			state,
			pin,
			true,
		);

		return [
			x - expandedMaxWidth / 2,
			x - expandedMinWidth / 2,
			x + expandedMinWidth / 2,
			x + expandedMaxWidth / 2,
		];
	}

	return renderThroughPins(state, anchor, points);
}

function renderHalfPins(
	state: Store,
	anchor: Anchor,
	glueGap: number,
	extraDepth: number,
): string {
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
	const inset = thickness * tangent + glueGap;

	const top = -extraDepth;
	const middle = dovetailLength + .5 * radius;
	const bottom = dovetailLength + 2 * dovetailDiameter;

	const buffer = minBuffer(state, false);
	const maxLeft = -buffer;
	const maxRight = materialWidth + buffer;

	const steps = [`M ${maxLeft} ${bottom}`];

	function h(x: number) {
		steps.push(`H ${x}`);
	}

	function v(y: number) {
		steps.push(`V ${y}`);
	}

	function addFinger(beginX: number, endX: number) {
		h(beginX)
		v(middle);
		h(endX);
		v(top);
	}

	if (halfPins.enabled) {
		v(middle);
		h(halfPins.width - inset);
		v(top);
	} else {
		v(top);
	}

	let sortedPins = [...pins];
	sortedPins.sort((a, b) => a.x - b.x);
	for (const pin of sortedPins) {
		const left = pin.x - pin.maxWidth / 2 + inset;
		const right = pin.x + pin.maxWidth / 2 - inset;
		addFinger(left, right);
	}

	if (halfPins.enabled) {
		h(materialWidth - halfPins.width + inset);
		v(middle);
	}
	h(maxRight);

	v(bottom);
	steps.push(`Z`);


	return renderHorizontalBase(
		state,
		anchor,
		`<path style="${pocketStyle}" d="${steps.join(' ')}" ${encodedDepth} />`,
	);
}

export function renderHalfPinsA(
	state: Store,
	glueGap: number,
	extraDepth: number,
) {
	return renderHalfPins(state, Anchor.BottomLeft, glueGap, extraDepth);
}

export function renderHalfPinsB(
	state: Store,
	glueGap: number,
	extraDepth: number,
): string {
	const {
		general: {material: {width}},
		pins,
	} = state;
	const center = width / 2;

	return renderHalfPins(
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
		glueGap,
		extraDepth,
	);
}

function minBuffer(state: Store, through: boolean): number {
	const {
		general: {
			cutter: {straightDiameter, dovetailDiameter},
			material: {width: materialWidth},
		},
		pins,
		halfPins,
	} = state;

	const cutter = through ? straightDiameter : dovetailDiameter;
	const radius = cutter / 2;

	const buffer = 1.1 * radius;
	if (!halfPins.enabled && pins.length > 0) {
		const firstPin = pins[0];
		const lastPin = pins[pins.length - 1];

		const firstPinLeft = firstPin.x - firstPin.maxWidth / 2;
		const lastPinRight = lastPin.x + lastPin.maxWidth / 2;

		const leftBuffer = cutter * 1.1 - firstPinLeft;
		const rightBuffer = cutter * 1.1 -
			(materialWidth - lastPinRight);

		return Math.max(leftBuffer, rightBuffer, buffer);
	}
	return buffer;
}
