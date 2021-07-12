import './App.css';

import {useStore} from './context/store';
import renderTails from './render/tails';

import GuideSettings from './ui/GuideSettings';
import GlobalSettings from './ui/GlobalSettings';
import HalfPinEditor from './ui/HalfPinEditor';
import PinCreator from './ui/PinCreator';
import PinEditor from './ui/PinEditor';
import Submit from './ui/Submit';
import Visualizer from './visualize/Visualizer';

export default function App() {
	const [store] = useStore();
	const rendered = renderTails(store, 20);
	const src = `data:image/svg+xml;base64,${btoa(rendered)}`;

	return (
		<div className="App">
			<header className="App-header">
				Dovetail Generator
			</header>
			<div className="Body">
				<div className="BodyLeft">
					<GlobalSettings />
					<GuideSettings />
					<Submit />
				</div>
				<div className="BodyRight">
					<Visualizer />
					<div className="VisualizerTray">
						<PinCreator />
						<PinEditor />
						<HalfPinEditor />
					</div>
				</div>
			</div>
			<img src={src} alt="Tails preview" />
		</div>
	);
}
