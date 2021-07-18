import {useState} from 'react';
import {Link} from 'react-router-dom';

import {useStore} from '../context/store';
import renderTails from '../render/tails';
import {renderPinsA, renderPinsB} from '../render/pins';

import {Form, FormSection, TextRow} from './Form';

function dataURI(svg) {
	return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export default function Submit() {
	const [store] = useStore();
	const [buffer, setBuffer] = useState(20);

	const {general: {cutter: {dovetailDiameter}}} = store;

	const minBuffer = 1.5 * dovetailDiameter;
	if (minBuffer > buffer) {
		setBuffer(minBuffer);
	}

	const shareLink = {
		path: '/',
		search: `?s=${btoa(JSON.stringify(store))}`,
	};

	return (
		<div className="Block Settings">
			<Form>
				<FormSection>
					<TextRow
						id="buffer_input"
						label="Outer Guide Buffer"
						min={minBuffer}
						value={buffer}
						onChange={setBuffer}
					/>
				</FormSection>
				<span>Download</span>
				<FormSection>
					<div className="ThreeButtonRow">
						<a
							href={dataURI(renderTails(store, buffer))}
							download="tails.svg">
							Tails
						</a>
						<a
							href={dataURI(renderPinsA(store, buffer))}
							download="pins_a.svg">
							Pins (A)
						</a>
						<a
							href={dataURI(renderPinsB(store, buffer))}
							download="pins_b.svg">
							Pins (B)
						</a>
					</div>
				</FormSection>
				<span>Share</span>
				<div className="OneButtonRow">
					<Link to={shareLink}>Link to this design</Link>
				</div>
			</Form>
		</div>
	);
}
