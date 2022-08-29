import {createContext, useContext, useReducer} from 'react';
import merge from '../util/merge';
import {useLocation} from 'react-router-dom';
import {z} from 'zod';

import {initGeneral, reduceGeneral, ContextGeneralSchema} from './general';
import {initGuides, reduceGuides, ContextGuidesSchema} from './guides';
import {
	initHalfPins,
	reduceHalfPins,
	validateHalfPins,
	ContextHalfPinsSchema,
} from './halfPins';
import {initPins, reducePins, validatePins, ContextPinsSchema} from './pins';

import type {GeneralAction} from './general';
import type {GuidesAction} from './guides';
import type {HalfPinsAction} from './halfPins';
import type {PinsAction} from './pins';

const StoreSchema = z.object(
	{
		general: ContextGeneralSchema,
		guides: ContextGuidesSchema,
		halfPins: ContextHalfPinsSchema,
		pins: ContextPinsSchema,
	},
);
export type Store = z.infer<typeof StoreSchema>;

const initStore = {
	general: initGeneral,
	guides: initGuides,
	halfPins: initHalfPins,
	pins: initPins,
};

type Action = GeneralAction | GuidesAction | HalfPinsAction | PinsAction;

type TContext = [Store, React.Dispatch<Action>]
const Context = createContext<TContext>([initStore, () => {}]);
const VALIDATIONS = [
	validatePins,
	validateHalfPins,
];

export function useStore(): TContext {
	return useContext(Context);
}

type Props = {children: React.ReactNode | React.ReactNode[]};
export function StoreProvider({children}:  Props) {
	const sharedState = new URLSearchParams(useLocation().search).get('s');
	let initialState = {
		general: initGeneral,
		guides: initGuides,
		halfPins: initHalfPins,
		pins: initPins,
	};
	if (sharedState) {
		initialState = merge(
			initialState,
			StoreSchema.deepPartial().parse(JSON.parse(atob(sharedState))),
		);
	}

	const [store, dispatch] = useReducer(
		(state: Store, action: Action) => {
			let newState = state;

			switch (action.store) {
				case 'general':
					newState = {
						...state,
						general: reduceGeneral(state.general, action),
					};
					break;
				case 'guides':
					newState = {
						...state,
						guides: reduceGuides(state.guides, action),
					};
					break;
				case 'pins':
					newState = {
						...state,
						pins: reducePins(state.pins, action),
					};
					break;
				case 'halfPins':
					newState = {
						...state,
						halfPins: reduceHalfPins(state.halfPins, action),
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
