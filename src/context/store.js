import {createContext, useContext, useReducer} from 'react';

import {initGeneral, reduceGeneral} from './generalStore';

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
				default:
					return state;
			}
			return newState;
		},
		{
			general: initGeneral,
		},
	);

	return (
		<Context.Provider value={[store, dispatch]}>
			{children}
		</Context.Provider>
	);
}
