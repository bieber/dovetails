export const initGeneral = {
	unit: 'mm',
	cutter: {
		diameter: 12.7,
		height: 12.7,
		angle: 14,
	},
	material: {
		thickness: 10,
		width: 100,
	},
};

export function reduceGeneral(state, action) {
	switch (action.type) {
		case 'setUnit':
			return {...state, unit: action.unit};
		case 'setCutter':
			return {...state, cutter: {...state.cutter, ...action.cutter}};
		case 'setMaterial':
			return {
				...state,
				material: {...state.material, ...action.material},
			};
		default:
			return state;
	}
}

export function setUnit(unit) {
	return {type: 'general:setUnit', unit};
}

export function setCutter(cutter) {
	return {type: 'general:setCutter', cutter};
}

export function setMaterial(material) {
	return {type: 'general:setMaterial', material};
}
