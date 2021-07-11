import {useStore} from '../context/store';
import {update} from '../context/halfPins';

import {Form, FormSection, TextRow, CheckRow} from './Form';

export default function HalfPinEditor() {
	const [
		{
			general: {material: {width: materialWidth}},
			pins,
			halfPins: {enabled, width},
		},
		dispatch,
	] = useStore();

	let widthMax = materialWidth / 2;
	for (const {x, maxWidth} of pins) {
		const leftEdge = x - maxWidth / 2;
		const rightEdge = x + maxWidth / 2;
		widthMax = Math.min(widthMax, leftEdge, materialWidth - rightEdge);
	}

	function onToggle() {
		dispatch(update({enabled: !enabled, width: widthMax / 2}));
	}

	function onUpdate(width) {
		dispatch(update({width}));
	}

	let widthSection = null;
	if (enabled) {
		widthSection = (
			<FormSection>
				<TextRow
					id="half_pin_width_input"
					label="Half Pin Width"
					value={width}
					onChange={onUpdate}
					min={0}
					max={widthMax}
				/>
			</FormSection>
		);
	}

	return (
		<div className="Block Settings">
			<Form>
				<FormSection>
					<CheckRow
						id="enable_half_pins_input"
						label="Enable Half Pins"
						checked={enabled}
						onChange={onToggle}
					/>
				</FormSection>
				{widthSection}
			</Form>
		</div>
	);
}
