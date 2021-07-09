import {useState} from 'react';

import {useGlobalContext} from '../context/globalContext';
import {usePinContext} from '../context/pinContext';

import {Form, FormSection, TextRow} from './Form';

export default function PinCreator() {
	const [{cutter: {diameter}, material: {width}}] = useGlobalContext();
	const [{pins, halfPins}, {addPin}] = usePinContext();
	const [maxWidth, setMaxWidth] = useState(diameter);

	const netWidth = width - (halfPins || 0);
	let nextPin = null;
	const sorted = [...pins].sort((a, b) => a.x - b.x);

	let left = halfPins || 0;
	const gaps = [];
	for (const pin of sorted) {
		const right = pin.x - pin.maxWidth / 2;
		if (right > netWidth) {
			break;
		}

		if (right > left) {
			gaps.push([left, right]);
		}
		left = right + pin.maxWidth;
	}

	if (left < netWidth) {
		gaps.push([left, netWidth]);
	}

	gaps.sort((a, b) => (b[1] - b[0]) - (a[1] - a[0]));
	const biggestGap = gaps[0];
	if (biggestGap && biggestGap[1] - biggestGap[0] >= maxWidth) {
		nextPin = (biggestGap[1] + biggestGap[0]) / 2;
	}

	return (
		<div className="Block Settings">
			<Form>
				<FormSection>
					<TextRow
						id="width_input"
						label="New Pin Width"
						value={maxWidth}
						onChange={(w) => setMaxWidth(w)}
					/>
				</FormSection>
				<FormSection>
					<button
						disabled={!nextPin}
						onClick={() => addPin(nextPin, maxWidth)}>
						Add Pin
					</button>
				</FormSection>
			</Form>
		</div>
	);
}
