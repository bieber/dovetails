import {createContext, useState, useContext} from 'react';

import {useStore} from './store';

const Context = createContext();

export function useGuideContext() {
	return useContext(Context);
};

export function useGuideLocations() {
	const [{general: {material: {width}}}] = useStore();
	const [{enabled, spacing, from}] = useGuideContext();

	if (!enabled) {
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

export function GuideContextProvider({children}) {
	const [context, setContext] = useState({
		enabled: false,
		spacing: 0,
		from: 'center',
	});

	function mergeContext(newContext) {
		setContext({...context, ...newContext});
	}

	return (
		<Context.Provider value={[context, mergeContext]}>
			{children}
		</Context.Provider>
	);
}
