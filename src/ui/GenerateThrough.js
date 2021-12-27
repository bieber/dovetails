import {useState} from 'react';
import {Link} from 'react-router-dom';

import {useStore} from '../context/store';
import {renderThroughTails} from '../render/tails';
import {renderThroughPinsA, renderThroughPinsB} from '../render/pins';

import {Form, FormSection, SelectRow} from './Form';

function dataURI(svg) {
	return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export default function GenerateThrough() {
	const [store] = useStore();
	const [anchor, setAnchor] = useState('bottomleft');

	const shareLink = {
		path: '/',
		search: `?s=${btoa(JSON.stringify(store))}`,
	};

	const anchorOptions = [
		{value: 'bottomleft', label: 'Bottom Left'},
		{value: 'bottomright', label: 'Bottom Right'},
		{value: 'topright', label: 'Top Right'},
		{value: 'topleft', label: 'Top Left'},
	];

	return (
		<div className="Block Settings">
			<Form>
				<FormSection>
					<SelectRow
						id="anchor_input"
						label="Anchor Position"
						options={anchorOptions}
						value={anchor}
						onChange={setAnchor}
					/>
				</FormSection>
				<span>Download</span>
				<FormSection>
					<div className="ThreeButtonRow">
						<a
							href={dataURI(renderThroughTails(store, anchor))}
							download="tails.svg">
							Tails
						</a>
						<a
							href={dataURI(renderThroughPinsA(store, anchor))}
							download="pins_a.svg">
							Pins (A)
						</a>
						<a
							href={dataURI(renderThroughPinsB(store, anchor))}
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
