import './App.css';
import {useContext} from './context';

export default function App() {
	const {context, setContext} = useContext();
	console.log(context.unit);
	return (
		<div className="App">
			<header className="App-header">
				Dovetail Generator
			</header>
			<div className="description">
				<form>
					<input
						type="text"
						value={context.unit}
						onChange={(e) => setContext({unit: e.target.value})}
					/>
				</form>
			</div>
		</div>
	);
}
