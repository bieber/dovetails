import {minPinSpacing} from '../util/limits';

export const initHalfPins = {
	enabled: false,
	width: 0,
};

export function validateHalfPins(state) {
	const {
		general: {
			cutter: {straightDiameter},
			material: {width: materialWidth},
		},
		halfPins,
	} = state;
	const minSpacing = minPinSpacing(straightDiameter);

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

export function reduceHalfPins(state, action) {
	const {type: _, ...rest} = action;
	return {...state, ...rest};
}

export function update(delta) {
	return {type: 'halfPins:update', ...delta};
}
