import {z} from 'zod';

import {useStore} from './store';

export enum From {
	Left = 'left',
	Center = 'center',
	Right = 'right',
}
export const FromSchema = z.nativeEnum(From);

export const ContextGuidesSchema = z.object(
	{
		enabled: z.boolean(),
		spacing: z.number(),
		from: FromSchema,
	},
);
export type ContextGuides = z.infer<typeof ContextGuidesSchema>;

export const initGuides: ContextGuides = {
	enabled: false,
	spacing: 0,
	from: From.Center,
};

export function useGuideLocations(): number[] {
	const [
		{
			general: {material: {width}},
			guides: {enabled, spacing, from},
		},
	] = useStore();

	if (!enabled || spacing === 0) {
		return [];
	}

	// There's probably a more elegant way to do this, but it works
	// well enough
	let guides = [];
	switch (from) {
		case 'left':
			for (let x = 0; x <= width; x += spacing) {
				guides.push(x);
			}
			return guides;

		case 'center':
			guides.push(width / 2);
			for (let x = width / 2 + spacing; x <= width; x += spacing) {
				guides.unshift(width - x);
				guides.push(x);
			}
			return guides;

		case 'right':
			for (let x = width; x >= 0; x -= spacing) {
				guides.unshift(x);
			}
			return guides;

		default:
			return [];
	}
}

enum Action {
	Update = 'update',
}

export function reduceGuides(
	state: ContextGuides,
	action: GuidesAction,
): ContextGuides {
	switch (action.type) {
		case Action.Update:
			return {...state, ...action.delta};
	}
	return state;
}

type UpdateAction = {
	store: 'guides',
	type: Action.Update,
	delta: Partial<ContextGuides>,
};
export function update(delta: Partial<ContextGuides>): UpdateAction {
	return {store: 'guides', type: Action.Update, delta};
}

export type GuidesAction = UpdateAction;
