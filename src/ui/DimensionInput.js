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

export default function DimensionInput(props) {
	const {id, value, dimensionless, onChange, min, max, ...rest} = props;
	let [{unit}] = useGlobalContext();
	const [{existingUnit, existingText, existingValue}, setState] = useState({
		existingValue: value,
		existingUnit: unit,
		existingText: text(value, unit),
	});

	// If we just want a numeric input without conversion to inches
	// (e.g. for angles, or counts) we can set the dimensionless flag
	if (dimensionless) {
		unit = 'mm';
	}

	function onUnitChange() {
		setState({
			existingUnit: unit,
			existingText: text(value, unit),
		});
	}

	function reset() {
		setState(
			{
				existingValue: value,
				existingUnit: unit,
				existingText: text(value, unit),
			},
		)
	}

	if (unit !== existingUnit) {
		onUnitChange();
	}


	if (value !== existingValue) {
		reset();
	}

	function onInnerChange(event) {
		const newText = event.target.value;
		let newValue = (newText === '' || newText === '.')
			? 0
			: parseFloat(newText);
		if (isNaN(newValue)) {
			return;
		}
		if (unit === 'inch') {
			newValue *= MM_PER_INCH;
		}
		if (min !== undefined && newValue < min) {
			newValue = round(min);
		}
		if (max !== undefined && newValue > max) {
			newValue = round(max);
		}

		if (newValue !== existingValue) {
			onChange(round(newValue));
		}

		setState(
			{
				existingValue: newValue,
				existingUnit: unit,
				existingText: newText,
			},
		);
	}

	return (
		<input
			id={id}
			type="text"
			value={existingText}
			onChange={onInnerChange}
			onBlur={reset}
			{...rest}
		/>
	);
}
