import {createContext, useContext, useReducer} from 'react';

import {initGeneral, reduceGeneral} from './general';
import {initGuides, reduceGuides} from './guides';

const Context = createContext();

export function useStore() {
	return useContext(Context);
}

export function StoreProvider({children}) {
	const [store, dispatch] = useReducer(
		(state, action) => {
			let newState = state;
			let subAction = {...action, type: action.type.split(':')[1]};

			switch (action.type.split(':')[0]) {
				case 'general':
					newState = {
						...state,
						general: reduceGeneral(state.general, subAction),
					}
					break;
				case 'guides':
					newState = {
						...state,
						guides: reduceGuides(state.guides, subAction),
					}
					break;
				default:
					return state;
			}

			return newState;
		},
		{
			general: initGeneral,
			guides: initGuides,
		},
	);

	return (
		<Context.Provider value={[store, dispatch]}>
			{children}
		</Context.Provider>
	);
}
