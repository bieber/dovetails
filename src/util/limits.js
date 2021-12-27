import {useStore} from '../context/store';

export function useLimits() {
	const [{general: {kind, cutter}}] = useStore();
	return {
		pins: {
			minWidth: minPinWidth(cutter.dovetailDiameter),
			minSpacing: minPinSpacing(kind, cutter),
		},
		material: {
			maxThickness: maxMaterialThickness(cutter.height),
		},
	};
}

export function minPinWidth(dovetailDiameter) {
	return dovetailDiameter + 0.1;
}

export function minPinSpacing(kind, cutter) {
	const {straightDiameter, dovetailDiameter} = cutter;

	if (kind === 'through') {
		return straightDiameter;
	} else {
		return dovetailDiameter;
	}
}

export function maxMaterialThickness(cutterHeight) {
	return cutterHeight;
}
