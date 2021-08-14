import {useStore} from '../context/store';

export function useLimits() {
	const [
		{
			general: {
				cutter: {straightDiameter, dovetailDiameter, height},
			}
		},
	] = useStore();

	return {
		pins: {
			minWidth: minPinWidth(dovetailDiameter),
			minSpacing: minPinSpacing(straightDiameter),
		},
		material: {
			maxThickness: maxMaterialThickness(height),
		},
	};
}

export function minPinWidth(dovetailDiameter) {
	return dovetailDiameter + 0.1;
}

export function minPinSpacing(straightDiameter) {
	return straightDiameter;
}

export function maxMaterialThickness(cutterHeight) {
	return cutterHeight;
}
