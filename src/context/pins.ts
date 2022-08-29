import {z} from 'zod';

import {mirrorPins, autolayoutPins} from '../util/pins';
import {minPinWidth, minPinSpacing} from '../util/limits';

import type {ContextGeneral, Material, Cutter} from './general';
import type {ContextHalfPins} from './halfPins';

let pinID = 0;

export enum MirrorDirection {
	LeftToRight = 'ltr',
	RightToLeft = 'rtl',
}

export enum AutolayoutMethod {
	EvenSpacing = 'even',
	FixedPins = 'pins',
	FixedTails = 'tails',
}

const PinSchema = z.object(
	{
		id: z.number(),
		selected: z.boolean(),
		x: z.number(),
		maxWidth: z.number(),
	},
);
export type Pin = z.infer<typeof PinSchema>;
export type PinWithoutID = Omit<Pin, "id">;

const ContextSchema = z.array(PinSchema);
type ContextPins = z.infer<typeof ContextSchema>;

export const initPins: ContextPins = [];

type State = {
	general: ContextGeneral,
	halfPins: ContextHalfPins,
	pins: ContextPins,
};
export function validatePins(state: State): State {
	const {
		general: {kind, cutter, material},
		pins,
		halfPins,
	} = state;
	const {width} = material;

	const minWidth = minPinWidth(cutter.dovetailDiameter);
	const minSpacing = minPinSpacing(kind, cutter, material);

	function filterPin(pin: Pin, i: number, pins: ContextPins) {
		if (pin.maxWidth < minWidth) {
			return false;
		}

		const halfPinFactor = halfPins.enabled ? halfPins.width : 0;
		const maxLeft = halfPinFactor;
		const maxRight = width - halfPinFactor;

		const left = pin.x - pin.maxWidth / 2;
		const right = pin.x + pin.maxWidth / 2;

		if (left < maxLeft || right > maxRight) {
			return false;
		}
		for (const otherPin of pins) {
			if (otherPin.id === pin.id) {
				continue;
			}

			const otherLeft = otherPin.x - otherPin.maxWidth / 2;
			const otherRight = otherPin.x + otherPin.maxWidth / 2;
			const margin = otherPin.x > pin.x
				? otherLeft - right
				: left - otherRight;
			if (minSpacing - margin > 0.0001) {
				return false;
			}
		}

		return true;
	}

	return {...state, pins: pins.filter(filterPin)};
}

function addIDs(pins: PinWithoutID[]): Pin[] {
	const newPins = [];
	for (const pin of pins) {
		newPins.push({...pin, id: pinID});
		pinID += 2;
	}
	return newPins;
}

enum Action {
	Add = 'add',
	Update = 'update',
	Delete = 'delete',
	Mirror = 'mirror',
	Autolayout = 'autolayout',
}

export function reducePins(state: ContextPins, action: PinsAction) {
	switch (action.type) {
		case Action.Add:
			const deselected = state.map(
				(p, i, ps) => ({...p, selected: false}),
			);
			const id = pinID;
			pinID += 2;
			return [
				...deselected,
				{...action.pin, id},
			];

		case Action.Update:
			let existing = [...state];
			if (action.delta.selected) {
				existing = existing.map(
					(p, i, ps) => ({...p, selected: false}),
				);
			}

			return existing.map(
				(p, i, ps) => {
					if (p.id === action.id) {
						return {...p, ...action.delta};
					} else {
						return p;
					}
				},
			);

		case Action.Delete:
			return state.filter((p, i, ps) => p.id !== action.id);

		case Action.Mirror:
			const {direction, width, dovetailDiameter} = action;
			return addIDs(
				mirrorPins(
					state,
					direction,
					width,
					dovetailDiameter,
				),
			);

		case Action.Autolayout:
			return addIDs(autolayoutPins(action));

		default:
			return state;
	}
}

type AddAction = {store: 'pins', type: Action.Add, pin: Pin};
export function add(x: number, maxWidth: number): AddAction {
	return {
		store: 'pins',
		type: Action.Add,
		pin: {id: 0, selected: true, x, maxWidth},
	};
}

type UpdateAction = {
	store: 'pins',
	type: Action.Update,
	id: number,
	delta: Partial<Pin>,
};
export function update(id: number, delta: Partial<Pin>): UpdateAction {
	return {store: 'pins', type: Action.Update, id, delta};
}

type RemoveAction = {store: 'pins', type: Action.Delete, id: number};
export function remove(id: number): RemoveAction {
	return {store: 'pins', type: Action.Delete, id};
}

type MirrorAction = {
	store: 'pins',
	type: Action.Mirror,
	direction: MirrorDirection,
	width: number,
	dovetailDiameter: number,
};
export function mirror(
	direction: MirrorDirection,
	width: number,
	dovetailDiameter: number,
): MirrorAction {
	return {
		store: 'pins',
		type: Action.Mirror,
		direction,
		width,
		dovetailDiameter,
	};
}

export type AutolayoutAction = {
	store: 'pins',
	type: Action.Autolayout,
	method: AutolayoutMethod,
	count: number,
	width: number,
	material: Material,
	cutter: Cutter,
	halfPins: ContextHalfPins,
};
export function autolayout(
	method: AutolayoutMethod,
	count: number,
	width: number,
	material: Material,
	cutter: Cutter,
	halfPins: ContextHalfPins,
): AutolayoutAction {
	return {
		store: 'pins',
		type: Action.Autolayout,
		method,
		count,
		width,
		material,
		cutter,
		halfPins,
	};
}

export type PinsAction = (
	AddAction |
		UpdateAction |
		RemoveAction |
		MirrorAction |
		AutolayoutAction
);
