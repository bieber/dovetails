import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {StoreProvider} from './context/store';
import {GuideContextProvider} from './context/guideContext';
import {PinContextProvider} from './context/pinContext';

import App from './App';


ReactDOM.render(
	<React.StrictMode>
		<StoreProvider>
			<GuideContextProvider>
				<PinContextProvider>
					<App />
				</PinContextProvider>
			</GuideContextProvider>
		</StoreProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
