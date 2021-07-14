import './App.css';

import {useStore} from './context/store';
import renderTails from './render/tails';
import {renderPinsA, renderPinsB} from './render/pins';

import GuideSettings from './ui/GuideSettings';
import GlobalSettings from './ui/GlobalSettings';
import HalfPinEditor from './ui/HalfPinEditor';
import PinCreator from './ui/PinCreator';
import PinEditor from './ui/PinEditor';
import Submit from './ui/Submit';
import Visualizer from './visualize/Visualizer';

export default function App() {
	const [store] = useStore();
	const tailsRendered = renderTails(store, 20);
	const pinsARendered = renderPinsA(store, 20);
	const pinsBRendered = renderPinsB(store, 20);
	const tailsSrc = `data:image/svg+xml;base64,${btoa(tailsRendered)}`;
	const pinsASrc = `data:image/svg+xml;base64,${btoa(pinsARendered)}`;
	const pinsBSrc = `data:image/svg+xml;base64,${btoa(pinsBRendered)}`;

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
			<img src={tailsSrc} alt="Tails preview" />
			<img src={pinsASrc} alt="Pins A preview" />
			<img src={pinsBSrc} alt="Pins B preview" />
		</div>
	);
}
