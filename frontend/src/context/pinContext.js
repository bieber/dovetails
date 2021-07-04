import {createContext, useState, useContext} from 'react';

const Context = createContext();

let pinID = 0;

export function usePinContext() {
	return useContext(Context);
}

export function PinContextProvider({children}) {
	const [pins, setPins] = useState([]);

	const selectedPin = pins.filter((p, i, ps) => p.selected)[0];

	function addPin(x, maxWidth) {
		const deselected = pins.map(
			(p, i, ps) => ({...p, selected: false}),
		);
		setPins([...deselected, {id: pinID, x, maxWidth, selected: true}]);
		pinID += 2;
	}

	function updatePin(id, delta) {
		let existing = [...pins];
		if (delta.selected) {
			existing = existing.map((p, i, ps) => ({...p, selected: false}));
		}

		setPins(
			existing.map(
				(p, i, ps) => {
					if (p.id === id) {
						return {...p, ...delta};
					} else {
						return p;
					}
				},
			),
		);
	}

	function deletePin(id) {
		setPins(pins.filter((p, i, ps) => p.id !== id));
	}

	const context = [
		pins,
		{selectedPin, addPin, updatePin, deletePin},
	];
	return (
		<Context.Provider value={context}>
			{children}
		</Context.Provider>
	);
}
