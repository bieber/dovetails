import {useState} from 'react';

import {Unit} from '../context/general';
import {useStore} from '../context/store';

const MM_PER_INCH = 25.4;

function text(value: number, unit: Unit) {
	let dimensionValue = value;
	if (unit === Unit.Inch) {
		dimensionValue /= MM_PER_INCH;
	}
	return round(dimensionValue).toString();
}

function round(x: number) {
	return parseFloat(x.toFixed(5));
}

export type Props = {
	id: string,
	value: number,
	dimensionless?: boolean,
	integer?: boolean,
	onChange: (x: number) => void,
	min?: number,
	max?: number,
} & Omit<React.HTMLProps<HTMLInputElement>, "onChange">;
type State = {
	existingValue: number,
	existingUnit: Unit,
	existingText: string,
};
export default function DimensionInput(props: Props) {
	const {
		id,
		value,
		dimensionless,
		integer,
		onChange,
		min,
		max,
		...rest
	} = props;
	let [{general: {unit}}] = useStore();
	const [
		{existingUnit, existingText, existingValue},
		setState,
	] = useState<State>({
		existingValue: value,
		existingUnit: unit,
		existingText: text(value, unit),
	});

	// If we just want a numeric input without conversion to inches
	// (e.g. for angles, or counts) we can set the dimensionless flag
	if (dimensionless) {
		unit = Unit.MM;
	}

	function onUnitChange() {
		setState({
			existingValue,
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

	function onInnerChange(event: React.ChangeEvent<HTMLInputElement>) {
		const newText = event.target?.value || '';
		let newValue = (newText === '' || newText === '.')
			? 0
			: parseFloat(newText);
		if (isNaN(newValue)) {
			return;
		}
		if (unit === Unit.Inch) {
			newValue *= MM_PER_INCH;
		}

		if (min !== undefined && newValue < min) {
			newValue = round(min);
		}
		if (max !== undefined && newValue > max) {
			newValue = round(max);
		}

		if (integer) {
			newValue = Math.floor(newValue);
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

	const unitFactor = unit === Unit.Inch ? 1 / MM_PER_INCH : 1;
	return (
		<input
			id={id}
			type="number"
			value={existingText}
			min={min ? min * unitFactor : undefined}
			max={max ? max * unitFactor : undefined}
			step={0.1}
			onChange={onInnerChange}
			onBlur={reset}
			{...rest}
		/>
	);
}
