import renderBase, {pocketStyle} from './base';

function renderPins(state, buffer, points) {
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

	return renderBase(
		state,
		buffer,
		`<path style="${pocketStyle}" d="${steps.join(' ')}" />`,
	);
}

function expandedWidths(state, pin) {
	const {
		general: {
			cutter: {straightDiameter, angle},
			material: {thickness},
		},
	} = state;

	const radius = straightDiameter / 2;

	const top = -1.1 * radius;
	const middle = thickness + .5 * radius;
	const bottom = thickness + 2 * straightDiameter;

	// This trig is probably suboptimal, but it should work.
	// Consider the following diagram of a dovetail
	//
	//               -----
	//              /     |\
	//             /      | \
	//             --------d0-
	//            /       |   \
	//           -----------d1-
	//
	// We can calculate the length of segments d1 and d0, then
	// subtract and multiply by two to get the amount we need to add
	// to maxWidth to account for the extra space at the bottom
	// (which ensures clearance of the bit when cutting with a
	// negative offset to add glue gap).  Then we can just use the
	// same calculation from the Pin renderer to get the minimum
	// width at the top height

	const {maxWidth} = pin;

	const tangent = Math.tan(2 * angle * Math.PI / 360);
	const d1 = tangent / bottom;
	const d0 = tangent / thickness;
	const expandedMaxWidth = maxWidth + 2 * (d1-d0);
	const expandedMinWidth = expandedMaxWidth - (
		2 * tangent * (middle - top)
	);

	return [expandedMinWidth, expandedMaxWidth];
}

export function renderPinsA(state, buffer) {
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

	return renderPins(state, buffer, points);
}

export function renderPinsB(state, buffer) {
	function points(pin) {
		const {x} = pin;
		const [expandedMinWidth, expandedMaxWidth] = expandedWidths(state, pin);

		return [
			x - expandedMaxWidth / 2,
			x - expandedMinWidth / 2,
			x + expandedMinWidth / 2,
			x + expandedMaxWidth / 2,
		];
	}

	return renderPins(state, buffer, points);
}
