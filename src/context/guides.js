import {useStore} from './store';

export const initGuides = {
	enabled: false,
	spacing: 0,
	from: 'center',
};

export function useGuideLocations() {
	const [
		{
			general: {material: {width}},
			guides: {enabled, spacing, from},
		},
	] = useStore();

	if (!enabled || spacing === 0) {
		return [];
	}

	// There's probably a more elegant way to do this, but it works
	// well enough
	let guides = [];
	switch (from) {
		case 'left':
			for (let x = 0; x <= width; x += spacing) {
				guides.push(x);
			}
			return guides;

		case 'center':
			guides.push(width / 2);
			for (let x = width / 2 + spacing; x <= width; x += spacing) {
				guides.unshift(width - x);
				guides.push(x);
			}
			return guides;

		case 'right':
			for (let x = width; x >= 0; x -= spacing) {
				guides.unshift(x);
			}
			return guides;

		default:
			return [];
	}
}

export function reduceGuides(state, action) {
	const {type: _, ...rest} = action;
	return {...state, ...rest};
}

export function update(delta) {
	return {type: 'guides:update', ...delta};
}
