import {useState} from 'react';

import {useGlobalContext} from '../context/globalContext';

const MM_PER_INCH = 25.4;

function text(value, unit) {
	let dimensionValue = value;
	if (unit === 'inch') {
		dimensionValue /= MM_PER_INCH;
	}
	return round(dimensionValue).toString();
}

function round(x) {
	return parseFloat(x.toFixed(5));
}

export default function DimensionInput({id, value, dimensionless, onChange}) {
	let [{unit}] = useGlobalContext();
	const [{existingUnit, existingText}, setState] = useState({
		existingUnit: unit,
		existingText: text(value, unit),
	});

	// If we just want a numeric input without conversion to inches
	// (e.g. for angles, or counts) we can set the dimensionless flag
	if (dimensionless) {
		unit = 'mm';
	}

	if (unit !== existingUnit) {
		setState({
			existingUnit: unit,
			existingText: text(value, unit),
		});
	}

	function onInnerChange(event) {
		const newText = event.target.value;
		const parsed = newText === '' ? 0 : parseFloat(newText);
		if (isNaN(parsed)) {
			return;
		}

		if (parsed !== parseFloat(existingText)) {
			let newValue = parsed;
			if (unit === 'inch') {
				newValue *= MM_PER_INCH;
			}
			onChange(round(newValue));
		}

		setState({existingUnit: unit, existingText: newText});
	}

	return (
		<input
			id={id}
			type="text"
			value={existingText}
			onChange={onInnerChange}
		/>
	);
}
