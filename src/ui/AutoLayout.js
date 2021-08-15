import {useState} from 'react';

import {useStore} from '../context/store';
import {autolayout} from '../context/pins';

import {useLimits} from '../util/limits';

import {Form, FormSection, SelectRow, TextRow} from './Form';

export default function AutoLayout() {
	const [{general: {material, cutter}, halfPins}, dispatch] = useStore();
	const {pins: {minWidth, minSpacing}} = useLimits();

	const [method, setMethod] = useState('even');
	const [count, setCount] = useState(0);
	const [width, setWidth] = useState(0);

	const methodOptions = [
		{value: 'even', label: 'Even Spacing'},
		{value: 'pins', label: 'Fixed Pins'},
		{value: 'tails', label: 'Fixed Tails'},
	];

	const tangent = Math.tan(2 * cutter.angle * Math.PI / 360);
	const overlap = material.thickness * tangent;
	let minTailWidth = minSpacing + 2 * overlap;
	minTailWidth = Math.ceil(minTailWidth * 10) / 10;

	function onMethodChange(newMethod) {
		switch (newMethod) {
			case 'even':
				setCount(1);
				break;

			case 'pins':
				setCount(1);
				setWidth(minWidth);
				break;

			case 'tails':
				setCount(2);
				setWidth(minTailWidth);
				break;

			default:
				break;
		}
		setMethod(newMethod);
	}

	let availableSpace = material.width;
	if (halfPins.enabled) {
		availableSpace -= 2 * halfPins.width;
	}

	let maxCount = 0;
	let settingsUI = null;
	let onSubmit = null;
	switch (method) {
		case 'even':
			// Since we're spacing evenly, use the bigger of the
			// pin/tails minimum size to determine how many pins
			// we can place
			const factor = Math.max(minWidth, minSpacing);
			maxCount = Math.floor((availableSpace - factor) / (2 * factor));

			if (count > 0 && count <= maxCount) {
				onSubmit = () => {
					dispatch(
						autolayout(method, count, 0, material, cutter, halfPins)
					);
				};
			}

			settingsUI = (
				<FormSection>
					<TextRow
						id="count_input"
						label="Pin Count"
						value={count}
						onChange={(count) => setCount(count)}
						step={1}
						min={0}
						max={maxCount}
						dimensionless
						integer
					/>
				</FormSection>
			);
			break;

		case 'pins':
			maxCount = Math.floor(
				(availableSpace - minSpacing) / (width + minSpacing),
			);

			if (count > 0 && count <= maxCount) {
				onSubmit = () => {
					dispatch(
						autolayout(
							method,
							count,
							width,
							material,
							cutter,
							halfPins,
						),
					);
				};
			}

			settingsUI = (
				<FormSection>
					<TextRow
						id="pin_count_input"
						label="Pin Count"
						value={count}
						onChange={(count) => setCount(count)}
						step={1}
						min={0}
						max={maxCount}
						dimensionless
						integer
					/>
					<TextRow
						id="pin_width_input"
						label="Pin Width"
						value={width}
						onChange={(width) => setWidth(width)}
						step={0.1}
						min={minWidth}
					/>
				</FormSection>
			);

			break;

		case 'tails':
			availableSpace += 2 * overlap;
			maxCount = Math.floor(
				(availableSpace - minWidth) / (width + minWidth),
			) + 1;

			if (count > 0 && count <= maxCount) {
				onSubmit = () => {
					dispatch(
						autolayout(
							method,
							count,
							width,
							material,
							cutter,
							halfPins,
						),
					);
				};
			}

			settingsUI = (
				<FormSection>
					<TextRow
						id="tail_count_input"
						label="Tail Count"
						value={count}
						onChange={(count) => setCount(count)}
						step={1}
						min={2}
						max={maxCount}
						dimensionless
						integer
					/>
					<TextRow
						id="tail_width_input"
						label="Tail Width"
						value={width}
						onChange={(width) => setWidth(width)}
						step={0.1}
						min={minTailWidth}
					/>
				</FormSection>
			);

			break;
		default:
			break;
	}

	return (
		<div className="Block Settings">
			<Form>
				<FormSection>
					<SelectRow
						id="method_input"
						label="Auto Layout Method"
						options={methodOptions}
						onChange={onMethodChange}
					/>
				</FormSection>
				{settingsUI}
				<FormSection>
					<button disabled={onSubmit === null} onClick={onSubmit}>
						Auto Layout
					</button>
				</FormSection>
			</Form>
		</div>
	);
}
