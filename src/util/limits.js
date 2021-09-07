import {useStore} from '../context/store';

export function useLimits() {
	const [{general: {kind, cutter, material}}] = useStore();
	return {
		pins: {
			minWidth: minPinWidth(cutter.dovetailDiameter),
			minSpacing: minPinSpacing(kind, cutter, material),
		},
		material: {
			maxThickness: maxMaterialThickness(cutter.height),
		},
	};
}

export function minPinWidth(dovetailDiameter) {
	return dovetailDiameter + 0.1;
}

export function minPinSpacing(kind, cutter, material) {
	const {straightDiameter, dovetailDiameter, angle} = cutter;
	const {thickness} = material;

	if (kind === 'through') {
		return straightDiameter;
	} else {
		const tangent = Math.tan(2 * angle * Math.PI / 360);
		return dovetailDiameter - 2 * thickness * tangent + 0.1;
	}
}

export function maxMaterialThickness(cutterHeight) {
	return cutterHeight;
}
