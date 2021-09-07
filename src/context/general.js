export const initGeneral = {
	kind: 'through',
	unit: 'mm',
	cutter: {
		dovetailDiameter: 12.7,
		straightDiameter: 6.35,
		height: 12.7,
		angle: 14,
	},
	material: {
		thickness: 10,
		width: 100,
		dovetailLength: 10,
	},
};

export function reduceGeneral(state, action) {
	switch (action.type) {
		case 'setKind':
			let materialComponent = {};
			if (action.kind === 'half') {
				materialComponent = {
					material: {
						...state.material,
						thickness: state.material.thickness * 2 / 3,
						dovetailLength: state.material.thickness,
					},
				};
			}
			return {
				...state,
				kind: action.kind,
				...materialComponent,
			};
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

export function setKind(kind) {
	return {type: 'general:setKind', kind}
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
