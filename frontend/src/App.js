import './App.css';

import {usePinContext} from './context/pinContext';

import GuideSettings from './ui/GuideSettings';
import GlobalSettings from './ui/GlobalSettings';
import Visualizer from './visualize/Visualizer';

export default function App() {
	const {nextPin, addPin} = usePinContext();

	return (
		<div className="App">
			<header className="App-header">
				Dovetail Generator
			</header>
			<div className="Body">
				<div className="BodyLeft">
					<GlobalSettings />
					<GuideSettings />
				</div>
				<div className="BodyRight">
					<Visualizer />
					<button onClick={addPin} disabled={!nextPin}>Add</button>
				</div>
			</div>
		</div>
	);
}
