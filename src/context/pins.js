let pinID = 0;

export const initPins = [];

export function reducePins(state, action) {
	switch (action.type) {
		case 'add':
			const deselected = state.map(
				(p, i, ps) => ({...p, selected: false}),
			);
			const id = pinID;
			pinID += 2;
			return [
				...deselected,
				{id, selected: true, ...action.pin},
			];

		case 'update':
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

		case 'delete':
			return state.filter((p, i, ps) => p.id !== action.id);

		default:
			return state;
	}
}

export function add(x, maxWidth) {
	return {type: 'pins:add', pin: {x, maxWidth}};
}

export function update(id, delta) {
	return {type: 'pins:update', id, delta};
}

export function remove(id) {
	return {type: 'pins:delete', id};
}
