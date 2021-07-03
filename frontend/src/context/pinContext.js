import {createContext, useState, useContext} from 'react';

const Context = createContext();

let pinID = 0;

export function usePinContext() {
	return useContext(Context);
}

export function PinContextProvider({children}) {
	const [pins, setPins] = useState([]);

	function addPin(x, maxWidth) {
		const deselected = pins.map(
			(p, i, ps) => ({...p, selected: false}),
		);
		setPins([...deselected, {id: pinID++, x, maxWidth, selected: true}]);
	}

	function updatePin(id, delta) {
		setPins(
			[...pins].map(
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

	return (
		<Context.Provider value={[pins, {addPin, updatePin}]}>
			{children}
		</Context.Provider>
	);
}
