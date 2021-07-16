import {useStore} from '../context/store';
import {update, remove} from '../context/pins';

import {Form, FormSection, TextRow} from './Form';

export default function PinEditor() {
	const [
		{
			general: {
				cutter: {straightDiameter, dovetailDiameter},
				material: {width},
			},
			pins,
			halfPins,
		},
		dispatch,
	] = useStore();

	const halfPinWidth = halfPins.enabled ? halfPins.width : 0;
	const selectedPin = pins.filter((p, i, ps) => p.selected)[0];
	const sorted = pins.sort((a, b) => a.x - b.x);

	let leftX = halfPinWidth + (halfPins.enabled ? straightDiameter : 0);
	let rightX = width
		- halfPinWidth
		- (halfPins.enabled ? straightDiameter : 0);
	let widthMax = width;
	if (selectedPin) {
		for (let i = 0; i < sorted.length; i++) {
			if (sorted[i].id === selectedPin.id) {
				if (i > 0) {
					const previous = sorted[i - 1];
					leftX = previous.x
						+ previous.maxWidth / 2
						+ straightDiameter;
				}
				const leftMax = (selectedPin.x - leftX) * 2;

				if (i < sorted.length - 1) {
					const next = sorted[i + 1];
					rightX = next.x - next.maxWidth / 2 - straightDiameter;
				}
				const rightMax = (rightX - selectedPin.x) * 2;

				widthMax = Math.min(widthMax, leftMax, rightMax);
			}
		}
	}

	function onChangeMaxWidth(maxWidth) {
		if (selectedPin) {
			dispatch(update(selectedPin.id, {maxWidth}));
		}
	}

	function onChangeX(x) {
		if (selectedPin) {
			dispatch(update(selectedPin.id, {x}));
		}
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
						min={dovetailDiameter + 0.1}
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
						onClick={() => dispatch(remove(selectedPin.id))}>
						Delete Selected
					</button>
				</FormSection>
			</Form>
		</div>
	);
}
