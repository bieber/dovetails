import './App.css';
import GlobalSettings from './GlobalSettings';
import Visualizer from './Visualizer';

export default function App() {
	return (
		<div className="App">
			<header className="App-header">
				Dovetail Generator
			</header>
			<div className="Body">
				<GlobalSettings />
				<Visualizer />
			</div>
		</div>
	);
}
