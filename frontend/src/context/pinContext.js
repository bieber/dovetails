import {createContext, useState, useContext} from 'react';

import {useGlobalContext} from './globalContext';

const Context = createContext();

export function usePinContext() {
	return useContext(Context);
}


export function PinContextProvider({children}) {
	const [pins, setPins] = useState([]);
	const [{material: {width}, cutter: {diameter}}] = useGlobalContext();

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
	if (biggestGap && biggestGap[1] - biggestGap[0] >= diameter) {
		nextPin = (biggestGap[1] + biggestGap[0]) / 2;
	}

	function addPin() {
		if (nextPin === null) {
			return;
		}
		setPins(
			[
				...pins,
				{
					x: nextPin,
					maxWidth: diameter,
				},
			],
		);
	}

	function updatePin(i, delta) {
		const newPins = [...pins];
		newPins[i] = {...newPins[i], ...delta};
		setPins(newPins);
	}

	return (
		<Context.Provider value={{pins, nextPin, addPin, updatePin}}>
			{children}
		</Context.Provider>
	);
}
