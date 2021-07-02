import './App.css';

import GuideSettings from './ui/GuideSettings';
import GlobalSettings from './ui/GlobalSettings';
import Visualizer from './visualize/Visualizer';

export default function App() {
	return (
		<div className="App">
			<header className="App-header">
				Dovetail Generator
			</header>
			<div className="Body">
				<GlobalSettings />
				<GuideSettings />
				<Visualizer />
			</div>
		</div>
	);
}
