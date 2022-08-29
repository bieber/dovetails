import {Kind} from '../context/general';
import {useStore} from '../context/store';

import type {Cutter, Material} from '../context/general';

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

export function minPinWidth(dovetailDiameter: number) {
	return dovetailDiameter + 0.1;
}

export function minPinSpacing(kind: Kind, cutter: Cutter, material: Material) {
	const {straightDiameter, dovetailDiameter, angle} = cutter;
	const {thickness} = material;

	if (kind === Kind.Through) {
		return straightDiameter;
	} else {
		const tangent = Math.tan(2 * angle * Math.PI / 360);
		return dovetailDiameter - 2 * thickness * tangent + 0.1;
	}
}

export function maxMaterialThickness(cutterHeight: number) {
	return cutterHeight;
}
