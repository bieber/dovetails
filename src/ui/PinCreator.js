import {useState} from 'react';

import {useStore} from '../context/store';
import {add} from '../context/pins';

import {Form, FormSection, TextRow} from './Form';

export default function PinCreator() {
	const [
		{
			general: {
				cutter: {straightDiameter, dovetailDiameter},
				material: {width: materialWidth},
			},
			pins,
			halfPins,
		},
		dispatch,
	] = useStore();
	const [maxWidth, setMaxWidth] = useState(dovetailDiameter);

	const halfPinWidth = halfPins.enabled
		? halfPins.width + straightDiameter
		: 0;
	const netWidth = materialWidth - (halfPinWidth);
	let nextPin = null;
	const sorted = [...pins].sort((a, b) => a.x - b.x);

	let left = halfPinWidth;
	const gaps = [];
	for (const pin of sorted) {
		const right = pin.x - pin.maxWidth / 2 - straightDiameter;
		if (right > netWidth) {
			break;
		}

		if (right > left) {
			gaps.push([left, right]);
		}
		left = right + pin.maxWidth + straightDiameter * 2;
	}

	if (left < netWidth) {
		gaps.push([left, netWidth]);
	}

	gaps.sort((a, b) => (b[1] - b[0]) - (a[1] - a[0]));
	const biggestGap = gaps[0];
	const spaceNeeded = Math.max(maxWidth, dovetailDiameter);
	if (biggestGap && biggestGap[1] - biggestGap[0] >= spaceNeeded) {
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
						min={dovetailDiameter}
						max={biggestGap ? biggestGap[1] - biggestGap[0] : 0}
						disabled={!nextPin}
						onChange={(w) => setMaxWidth(w)}
					/>
				</FormSection>
				<FormSection>
					<button
						disabled={!nextPin}
						onClick={() => dispatch(add(nextPin, maxWidth))}>
						Add Pin
					</button>
				</FormSection>
			</Form>
		</div>
	);
}
