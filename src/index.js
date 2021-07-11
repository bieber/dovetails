import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {GuideContextProvider} from './context/guideContext';
import {GlobalContextProvider} from './context/globalContext';
import {PinContextProvider} from './context/pinContext';

import App from './App';


ReactDOM.render(
	<React.StrictMode>
		<GlobalContextProvider>
			<GuideContextProvider>
				<PinContextProvider>
					<App />
				</PinContextProvider>
			</GuideContextProvider>
		</GlobalContextProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
