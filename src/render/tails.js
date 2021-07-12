import renderBase from './base';

export default function renderTails(state, buffer) {
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

	return renderBase(
		state,
		buffer,
		`<path class="pocket" d="${steps.join(' ')}" />`,
	);
}
