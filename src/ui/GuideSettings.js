import {useGuideContext} from '../context/guideContext';
import {useStore} from '../context/store';

import {Form, FormSection, CheckRow, SelectRow, TextRow} from './Form';

export default function GuideSettings() {
	const [{enabled, spacing, from}, setGuides] = useGuideContext();
	const [{general: {cutter: {diameter}}}] = useStore();

	let extraOptions = null;
	if (enabled) {
		const fromOptions = [
			{label: 'Left', value: 'left'},
			{label: 'Center', value: 'center'},
			{label: 'Right', value: 'right'},
		];

		extraOptions = (
			<FormSection>
				<TextRow
					id="spacing_input"
					label="Guide Spacing"
					value={spacing}
					onChange={(spacing) => setGuides({spacing})}
				/>
				<SelectRow
					id="from_input"
					label="Guides From"
					options={fromOptions}
					value={from}
					onChange={(from) => setGuides({from})}
p				/>
			</FormSection>
		);
	}

	function updateEnabled(newValue) {
		if (newValue && spacing === 0) {
			setGuides({enabled: true, spacing: diameter});
		} else {
			setGuides({enabled: newValue});
		}
	}

	return (
		<div className="Settings Block">
			<Form>
				<FormSection>
					<CheckRow
						id="enabled_input"
						label="Enable Guides"
						value={enabled}
						onChange={updateEnabled}
					/>
				</FormSection>
				{extraOptions}
			</Form>
		</div>
	);
}
