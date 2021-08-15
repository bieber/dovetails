import {minPinWidth} from './limits';

export function partitionPins(pins, width, dovetailDiameter) {
	const minWidth = minPinWidth(dovetailDiameter);

	const center = width / 2;
	const centerRight = center + minWidth / 2;
	const centerLeft = center - minWidth / 2;
	const pinsRightOfCenter = pins.filter(
		(p, i, ps) => p.x + p.maxWidth / 2 > centerRight,
	);
	const pinsLeftOfCenter = pins.filter(
		(p, i, ps) => p.x - p.maxWidth / 2 < centerLeft,
	);

	return [pinsLeftOfCenter, pinsRightOfCenter];
}

export function mirrorPins(pins, direction, width, dovetailDiameter) {
	const minWidth = minPinWidth(dovetailDiameter);

	const [pinsLeftOfCenter, pinsRightOfCenter] = partitionPins(
		pins,
		width,
		dovetailDiameter,
	);
	const center = width / 2;
	const newPins = [];

	if (direction === 'ltr') {
		const centerLeft = width / 2 - minWidth / 2;
		for (const pin of pinsLeftOfCenter) {
			const rightEdge = pin.x + pin.maxWidth / 2;
			const leftEdge = pin.x - pin.maxWidth / 2;
			if (rightEdge >= centerLeft) {
				newPins.push(
					{
						selected: false,
						x: width / 2,
						maxWidth: (center - leftEdge) * 2,
					},
				);
			} else {
				newPins.push({...pin, selected: false});
				newPins.push(
					{
						selected: false,
						x: (width / 2 - pin.x) * 2 + pin.x,
						maxWidth: pin.maxWidth,
					},
				);
			}
		}
	} else if (direction === 'rtl') {
		const centerRight = width / 2 + minWidth / 2;
		for (const pin of pinsRightOfCenter) {
			const rightEdge = pin.x + pin.maxWidth / 2;
			const leftEdge = pin.x - pin.maxWidth / 2;
			if (leftEdge <= centerRight) {
				newPins.push(
					{
						selected: false,
						x: width / 2,
						maxWidth: (rightEdge - center) * 2,
					},
				);
			} else {
				newPins.push({...pin, selected: false});
				newPins.push(
					{
						selected: false,
						x: pin.x - 2 * (pin.x - width / 2),
						maxWidth: pin.maxWidth,
					},
				);
			}
		}
	}

	return newPins;
}

export function autolayoutPins(
	{method, count, width, material, cutter, halfPins},
) {
	const pins = [];
	let step = 0;

	const tangent = Math.tan(2 * cutter.angle * Math.PI / 360);
	const overlap = material.thickness * tangent;

	let left = 0;
	let right = material.width;
	if (halfPins.enabled) {
		left += halfPins.width;
		right -= halfPins.width;
	}
	const availableSpace = right - left;
	let space = 0;

	switch (method) {
		case 'even':
			if (halfPins.enabled) {
				width = (
					(availableSpace + (2 * count + 2) * overlap) /
					(2 * count + 1)
				);
				const space = (availableSpace - count * width) / (count + 1);
				for (let i = 0; i < count; i++) {
					const x = left + space * (i + 1) + width * (i + 0.5);
					pins.push({selected: false, x, maxWidth: width});
				}
			} else {
				width = (
					(availableSpace + overlap * 2 * count) /
					(2 * count)
				);
				step = (right - left) / (2 * count);
				for (let i = 0; i < count; i++) {
					pins.push(
						{
							selected: false,
							x: left + (2 * i + 1) * step,
							maxWidth: width,
						},
					);
				}
			}

			return pins;

		case 'pins':
			space = (availableSpace - count * width) / (count + 1);
			for (let i = 0; i < count; i++) {
				const x = left + space * (i + 1) + width * (i + 0.5);
				pins.push({selected: false, x, maxWidth: width});
			}
			return pins;

		case 'tails':
			count--;
			space = width - 2 * overlap;
			space = parseFloat(space.toFixed(5));
			width = (availableSpace - (count + 1) * space) / count;
			for (let i = 0; i < count; i++) {
				const x = left + space * (i + 1) + width * (i + 0.5);
				pins.push({selected: false, x, maxWidth: width});
			}
			return pins;
		default:
			break;
	}
}
