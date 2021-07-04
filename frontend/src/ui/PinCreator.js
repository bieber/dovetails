import {useState} from 'react';

import {useGlobalContext} from '../context/globalContext';
import {usePinContext} from '../context/pinContext';

import {Form, FormSection, TextRow} from './Form';

export default function PinCreator() {
	const [{cutter: {diameter}, material: {width}}] = useGlobalContext();
	const [pins, {addPin}] = usePinContext();
	const [maxWidth, setMaxWidth] = useState(diameter);

	let nextPin = null;
	const sorted = [...pins].sort((a, b) => a.x - b.x);

	let left = 0;
	const gaps = [];
	for (const pin of sorted) {
		const right = pin.x - pin.maxWidth / 2;
		if (right > width) {
			break;
		}

		if (right > left) {
			gaps.push([left, right]);
		}
		left = right + pin.maxWidth;
	}

	if (left < width) {
		gaps.push([left, width]);
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
