import {useState} from 'react';
import {Link} from 'react-router-dom';

import {useStore} from '../context/store';
import {renderHalfTailsA, renderHalfTailsB} from '../render/tails';
import {renderThroughPinsA, renderThroughPinsB} from '../render/pins';

import {Form, FormSection, TextRow} from './Form';

function dataURI(svg) {
	return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export default function GenerateHalf() {
	const [store] = useStore();
	const [glueGap, setGlueGap] = useState(0.05);

	const shareLink = {
		path: '/',
		search: `?s=${btoa(JSON.stringify(store))}`,
	};

	return (
		<div className="Block Settings">
			<Form>
				<FormSection>
					<TextRow
						id="glue_input"
						label="Glue Gap"
						min={0}
						value={glueGap}
						onChange={setGlueGap}
					/>
				</FormSection>
				<span>Download</span>
				<FormSection>
					<div className="TwoButtonRow">
						<a
							href={dataURI(renderHalfTailsA(store))}
							download="tails_a.svg">
							Tails (A)
						</a>
						<a
							href={dataURI(renderHalfTailsB(store))}
							download="tails_b.svg">
							Tails (B)
						</a>
					</div>
					<div className="TwoButtonRow">
						<a
							href={dataURI(renderThroughPinsA(store))}
							download="pins_a.svg">
							Pins (A)
						</a>
						<a
							href={dataURI(renderThroughPinsB(store))}
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
