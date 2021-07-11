import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {StoreProvider} from './context/store';

import App from './App';


ReactDOM.render(
	<React.StrictMode>
		<StoreProvider>
			<App />
		</StoreProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
