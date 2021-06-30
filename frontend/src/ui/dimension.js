import {useState} from 'react';

import {useGlobalContext} from '../context/globalContext';

const MM_PER_INCH = 25.4;

function text(dimension, unit) {
	let dimensionValue = dimension;
	if (unit === 'inch') {
		dimensionValue /= MM_PER_INCH;
	}
	return round(dimensionValue).toString();
}

function round(x) {
	return parseFloat(x.toFixed(5));
}

export function useDimension(dimension, onUpdate) {
	const [{unit}] = useGlobalContext();
	const [{existingUnit, existingText}, setState] = useState({
		existingUnit: unit,
		existingText: text(dimension, unit),
	});

	if (unit !== existingUnit) {
		setState({
			existingUnit: unit,
			existingText: text(dimension, unit),
		});
	}

	function update(newText) {
		const parsed = newText === '' ? 0 : parseFloat(newText);
		if (isNaN(parsed)) {
			return;
		}

		if (parsed !== parseFloat(existingText)) {
			let newValue = parsed;
			if (unit === 'inch') {
				newValue *= MM_PER_INCH;
			}
			onUpdate(round(newValue));
		}

		setState({existingUnit: unit, existingText: newText});
	}

	return [existingText, update];
}

export function useNumber(number, onUpdate) {
	const [existingText, setExistingText] = useState(text(number, 'mm'));

	function update(newText) {
		const parsed = newText === '' ? 0 : parseFloat(newText);
		if (isNaN(parsed)) {
			return;
		}

		if (parsed !== parseFloat(existingText)) {
			onUpdate(round(parsed));
		}

		setExistingText(newText);
	}

	return [existingText, update];
}
