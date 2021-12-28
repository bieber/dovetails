import {renderHorizontalBase, renderVerticalBase, pocketStyle} from './base';

function renderThroughPins(state, anchor, points) {
	const {
		general: {
			cutter: {straightDiameter},
			material: {thickness, width: materialWidth},
		},
		pins,
		halfPins,
	} = state;

	const halfPinsEnabled = halfPins.enabled && pins.length > 0;

	const radius = straightDiameter / 2;

	const top = -1.1 * radius;
	const middle = thickness + .5 * radius;
	const bottom = thickness + 2 * straightDiameter;

	const maxLeft = -1.1 * radius;
	const maxRight = materialWidth + 1.1 * radius;

	const steps = [`M ${maxLeft} ${bottom}`];

	if (halfPinsEnabled) {
		const leftPoints = points({x: 0, maxWidth: halfPins.width * 2});
		steps.push(`V ${middle}`);
		steps.push(`H ${leftPoints[2]}`);
		steps.push(`L ${leftPoints[3]} ${top}`);
	} else {
		steps.push(`V ${top}`);
	}

	for (const pin of pins) {
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
		`<path style="${pocketStyle}" d="${steps.join(' ')}" />`,
	);
}

function expandedWidths(state, pin, invert) {
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

export function renderThroughPinsA(state, anchor) {
	function points(pin) {
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

export function renderThroughPinsB(state, anchor) {
	function points(pin) {
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

function renderHalfPins(state, anchor, glueGap, extraDepth) {
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
	const inset = thickness * tangent + glueGap;

	const top = -extraDepth;
	const middle = dovetailLength + .5 * radius;
	const bottom = dovetailLength + 2 * dovetailDiameter;

	const maxLeft = -1.1 * radius;
	const maxRight = materialWidth + 1.1 * radius;

	const steps = [`M ${maxLeft} ${bottom}`];

	function h(x) {
		steps.push(`H ${x}`);
	}

	function v(y) {
		steps.push(`V ${y}`);
	}

	function addFinger(beginX, endX) {
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
		`<path style="${pocketStyle}" d="${steps.join(' ')}" />`,
	);
}

export function renderHalfPinsA(state, glueGap, extraDepth) {
	return renderHalfPins(state, 'bottomleft', glueGap, extraDepth);
}

export function renderHalfPinsB(state, glueGap, extraDepth) {
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
		'bottomright',
		glueGap,
		extraDepth,
	);
}
