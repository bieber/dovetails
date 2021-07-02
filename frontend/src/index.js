import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {GuideContextProvider} from './context/guideContext';
import {GlobalContextProvider} from './context/globalContext';

import App from './App';


ReactDOM.render(
	<React.StrictMode>
		<GuideContextProvider>
			<GlobalContextProvider>
				<App />
			</GlobalContextProvider>
		</GuideContextProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
