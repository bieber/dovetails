import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {GlobalContextProvider} from './context/globalContext';

ReactDOM.render(
	<React.StrictMode>
		<GlobalContextProvider>
			<App />
		</GlobalContextProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
