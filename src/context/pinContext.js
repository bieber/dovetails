import {createContext, useState, useContext} from 'react';

const Context = createContext();

let pinID = 0;

export function usePinContext() {
	return useContext(Context);
}

export function PinContextProvider({children}) {
	const [{pins, halfPins}, setState] = useState({pins: [], halfPins: null});

	const selectedPin = pins.filter((p, i, ps) => p.selected)[0];

	function addPin(x, maxWidth) {
		const deselected = pins.map(
			(p, i, ps) => ({...p, selected: false}),
		);
		setState(
			{
				pins: [...deselected, {id: pinID, x, maxWidth, selected: true}],
				halfPins,
			},
		);
		pinID += 2;
	}

	function updatePin(id, delta) {
		let existing = [...pins];
		if (delta.selected) {
			existing = existing.map((p, i, ps) => ({...p, selected: false}));
		}

		setState(
			{
				pins: existing.map(
					(p, i, ps) => {
						if (p.id === id) {
							return {...p, ...delta};
						} else {
							return p;
						}
					},
				),
				halfPins,
			},
		);
	}

	function deletePin(id) {
		setState({pins: pins.filter((p, i, ps) => p.id !== id), halfPins});
	}

	function updateHalfPins(width) {
		setState({pins, halfPins: width});
	}

	const context = [
		{pins, halfPins},
		{selectedPin, addPin, updatePin, deletePin, updateHalfPins},
	];
	return (
		<Context.Provider value={context}>
			{children}
		</Context.Provider>
	);
}
