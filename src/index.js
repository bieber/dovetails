import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {StoreProvider} from './context/store';
import {PinContextProvider} from './context/pinContext';

import App from './App';


ReactDOM.render(
	<React.StrictMode>
		<StoreProvider>
			<PinContextProvider>
				<App />
			</PinContextProvider>
		</StoreProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
