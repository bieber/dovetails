import {useStore} from '../context/store';
import {usePinContext} from '../context/pinContext';

import {Form, FormSection, TextRow, CheckRow} from './Form';

export default function HalfPinEditor() {
	const [{general: {material: {width}}}] = useStore();
	const [{pins, halfPins}, {updateHalfPins}] = usePinContext();

	let widthMax = width / 2;
	for (const {x, maxWidth} of pins) {
		const leftEdge = x - maxWidth / 2;
		const rightEdge = x + maxWidth / 2;
		widthMax = Math.min(widthMax, leftEdge, width - rightEdge);
	}

	function onToggle() {
		updateHalfPins(halfPins ? null : widthMax / 2);
	}

	function onUpdate(width) {
		updateHalfPins(width);
	}

	let widthSection = null;
	if (halfPins !== null) {
		widthSection = (
			<FormSection>
				<TextRow
					id="half_pin_width_input"
					label="Half Pin Width"
					value={halfPins}
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
						checked={halfPins !== null}
						onChange={onToggle}
					/>
				</FormSection>
				{widthSection}
			</Form>
		</div>
	);
}
