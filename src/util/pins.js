export function partitionPins(pins, width, dovetailDiameter) {
	const center = width / 2;
	const centerRight = center + (dovetailDiameter + 0.1) /2;
	const centerLeft = center - (dovetailDiameter + 0.1) / 2;
	const pinsRightOfCenter = pins.filter(
		(p, i, ps) => p.x + p.maxWidth / 2 > centerRight,
	);
	const pinsLeftOfCenter = pins.filter(
		(p, i, ps) => p.x - p.maxWidth / 2 < centerLeft,
	);

	return [pinsLeftOfCenter, pinsRightOfCenter];
}

export function mirrorPins(pins, direction, width, dovetailDiameter) {
	const [pinsLeftOfCenter, pinsRightOfCenter] = partitionPins(
		pins,
		width,
		dovetailDiameter,
	);
	const center = width / 2;
	const newPins = [];

	if (direction === 'ltr') {
		const centerLeft = width / 2 - (dovetailDiameter + 0.1) / 2;
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
		const centerRight = width / 2 + (dovetailDiameter + 0.1) / 2;
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
