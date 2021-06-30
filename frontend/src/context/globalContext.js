import React, {createContext, useState} from 'react';

const Context = createContext();

export function useGlobalContext() {
	return React.useContext(Context);
};

export function GlobalContextProvider({children}) {
	const [context, setContext] = useState({
		unit: 'mm',
		cutter: {
			diameter: 12.7,
			height: 12.7,
			angle: 14,
		},
		material: {
			thickness: 10,
			width: 150,
		},
	});

	function setUnit(unit) {
		setContext({...context, unit});
	}

	function setCutter(cutter) {
		setContext({...context, cutter: {...context.cutter, ...cutter}});
	}

	function setMaterial(material) {
		setContext({...context, material: {...context.material, ...material}});
	}

	return (
		<Context.Provider value={[context, {setUnit, setCutter, setMaterial}]}>
			{children}
		</Context.Provider>
	);
}
