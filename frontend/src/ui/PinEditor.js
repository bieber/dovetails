import {useGlobalContext} from '../context/globalContext';
import {usePinContext} from '../context/pinContext';

import {Form, FormSection, TextRow} from './Form';

export default function PinEditor() {
	const [{cutter: {diameter}, material: {width}}] = useGlobalContext();
	const [pins, {selectedPin, updatePin, deletePin}] = usePinContext();

	const sorted = pins.sort((a, b) => a.x - b.x);
	let leftX = 0;
	let rightX = width;
	let widthMax = width;
	if (selectedPin) {
		for (let i = 0; i < sorted.length; i++) {
			if (sorted[i].id === selectedPin.id) {
				if (i > 0) {
					const previous = sorted[i - 1];
					leftX = previous.x + previous.maxWidth / 2;
				}
				const leftMax = (selectedPin.x - leftX) * 2;

				if (i < sorted.length - 1) {
					const next = sorted[i + 1];
					if (!next) {
						console.log(sorted, i);
					}
					rightX = next.x - next.maxWidth / 2;
				}
				const rightMax = (rightX - selectedPin.x) * 2;

				widthMax = Math.min(widthMax, leftMax, rightMax);
			}
		}
	}

	function onChangeMaxWidth(maxWidth) {
		updatePin(selectedPin.id, {maxWidth});
	}

	function onChangeX(x) {
		updatePin(selectedPin.id, {x});
	}

	let xMin = leftX;
	let xMax = rightX;
	if (selectedPin) {
		xMin += selectedPin.maxWidth / 2;
		xMax -= selectedPin.maxWidth / 2;
	}

	return (
		<div className="Block Settings">
			<Form>
				<FormSection>
					<TextRow
						id="selected_width_input"
						label="Selected Pin Width"
						value={selectedPin?.maxWidth || 0}
						onChange={onChangeMaxWidth}
						disabled={!selectedPin}
						min={diameter}
						max={widthMax}
					/>
					<TextRow
						id="selected_x_input"
						label="Selected Pin X"
						value={selectedPin?.x || 0}
						onChange={onChangeX}
						disabled={!selectedPin}
						min={xMin}
						max={xMax}
					/>
				</FormSection>
			</Form>
			<Form>
				<FormSection>
					<button
						disabled={!selectedPin}
						onClick={() => deletePin(selectedPin.id)}>
						Delete Selected
					</button>
				</FormSection>
			</Form>
		</div>
	);
}
