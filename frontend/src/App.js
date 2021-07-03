import './App.css';

import GuideSettings from './ui/GuideSettings';
import GlobalSettings from './ui/GlobalSettings';
import PinCreator from './ui/PinCreator';
import Visualizer from './visualize/Visualizer';

export default function App() {
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
					<div className="VisualizerTray">
						<PinCreator />
					</div>
				</div>
			</div>
		</div>
	);
}
