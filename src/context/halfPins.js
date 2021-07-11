export const initHalfPins = {
	enabled: false,
	width: 0,
};

export function reduceHalfPins(state, action) {
	const {type: _, ...rest} = action;
	return {...state, ...rest};
}

export function update(delta) {
	return {type: 'halfPins:update', ...delta};
}
