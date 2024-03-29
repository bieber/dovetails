import {z} from 'zod';

import {minPinSpacing} from '../util/limits';

import type {Store} from './store';

export const ContextHalfPinsSchema = z.object(
	{
		enabled: z.boolean(),
		width: z.number(),
	},
);
export type ContextHalfPins = z.infer<typeof ContextHalfPinsSchema>;

export const initHalfPins: ContextHalfPins = {
	enabled: false,
	width: 0,
};

export function validateHalfPins(state: Store): Store {
	const {
		general: {kind, cutter, material},
		halfPins,
	} = state;
	const {width: materialWidth} = material;
	const minSpacing = minPinSpacing(kind, cutter, material);

	let maxWidth = materialWidth / 2 - minSpacing / 2;

	if (halfPins.width > maxWidth) {
		if (maxWidth < 0) {
			return {
				...state,
				halfPins: {...halfPins, enabled: false, width: 0},
			};
		} else {
			return {...state, halfPins: {...halfPins, width: maxWidth}};
		}
	}
	return state;
}

enum Action {
	Update = 'update',
}

export function reduceHalfPins(state: ContextHalfPins, action: HalfPinsAction) {
	switch (action.type) {
		case Action.Update:
			return {...state, ...action.delta};
	}
	return state;
}

type UpdateAction = {
	store: 'halfPins',
	type: Action.Update,
	delta: Partial<ContextHalfPins>,
};
export function update(delta: Partial<ContextHalfPins>): UpdateAction {
	return {store: 'halfPins', type: Action.Update, delta};
}

export type HalfPinsAction = UpdateAction;
