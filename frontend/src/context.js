import React, {createContext, useState} from 'react';

const Context = createContext();

export function useContext() {
	return React.useContext(Context);
};

export function ContextProvider({children}) {
	const [context, setContext] = useState({
		unit: 'mm',
	});

	return (
		<Context.Provider value={{context, setContext}}>
			{children}
		</Context.Provider>
	);
}
