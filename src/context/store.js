import {createContext, useContext, useReducer} from 'react';
import {useLocation} from 'react-router-dom';

import {initGeneral, reduceGeneral} from './general';
import {initGuides, reduceGuides} from './guides';
import {initHalfPins, reduceHalfPins, validateHalfPins} from './halfPins';
import {initPins, reducePins, validatePins} from './pins';

const Context = createContext();
const VALIDATIONS = [
	validatePins,
	validateHalfPins,
];

export function useStore() {
	return useContext(Context);
}

function isObject(x) {
	return x && typeof x === 'object' && !Array.isArray(x);
}

function deepMerge(dst, src) {
	const output = {...dst};

	for (const key in src) {
		if (!src.hasOwnProperty(key)) {
			console.log(key);
			continue;
		}

		if (isObject(src[key]) && isObject(dst[key])) {
			output[key] = deepMerge(dst[key], src[key]);
		} else {
			output[key] = src[key];
		}
	}

	return output;
}
window.deepMerge = deepMerge;

export function StoreProvider({children}) {
	const sharedState = new URLSearchParams(useLocation().search).get('s');
	let initialState = {
		general: initGeneral,
		guides: initGuides,
		halfPins: initHalfPins,
		pins: initPins,
	};
	if (sharedState) {
		initialState = deepMerge(initialState, JSON.parse(atob(sharedState)));
	}

	const [store, dispatch] = useReducer(
		(state, action) => {
			let newState = state;
			let subAction = {...action, type: action.type.split(':')[1]};

			switch (action.type.split(':')[0]) {
				case 'general':
					newState = {
						...state,
						general: reduceGeneral(state.general, subAction),
					};
					break;
				case 'guides':
					newState = {
						...state,
						guides: reduceGuides(state.guides, subAction),
					};
					break;
				case 'pins':
					newState = {
						...state,
						pins: reducePins(state.pins, subAction),
					};
					break;
				case 'halfPins':
					newState = {
						...state,
						halfPins: reduceHalfPins(state.halfPins, subAction),
					};
					break;
				default:
					return state;
			}

			for (const validation of VALIDATIONS) {
				newState = validation(newState);
			}
			return newState;
		},
		initialState,
	);

	return (
		<Context.Provider value={[store, dispatch]}>
			{children}
		</Context.Provider>
	);
}
