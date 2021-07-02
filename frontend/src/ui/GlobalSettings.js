import {useGlobalContext} from '../context/globalContext';

import {Form, FormSection, SelectRow, TextRow} from './Form';

export default function GlobalSettings() {
	const [
		{unit, cutter, material},
		{setUnit, setCutter, setMaterial},
	] = useGlobalContext();

	const unitOptions = [
		{value: 'mm', label: 'mm'},
		{value: 'inch', label: 'inch'},
	];
	return (
		<div className="GlobalSettings Settings">
			<Form>
				<FormSection>
					<SelectRow
						label="Units"
						options={unitOptions}
						value={unit}
						onChange={setUnit}
					/>
				</FormSection>
				<FormSection>
					<TextRow
						id="diameter_input"
						label="Cutter Diameter"
						value={cutter.diameter}
						onChange={(diameter) => setCutter({diameter})}
					/>
					<TextRow
						id="height_input"
						label="Cutter Height"
						value={cutter.height}
						onChange={(height) => setCutter({height})}
					/>
					<TextRow
						id="angle_input"
						label="Cutter Angle (deg)"
						value={cutter.angle}
						onChange={(angle) => setCutter({angle})}
						dimensionless
					/>
				</FormSection>
				<FormSection>
					<TextRow
						id="thickness_input"
						label="Material Thickness"
						value={material.thickness}
						onChange={(thickness) => setMaterial({thickness})}
					/>
					<TextRow
						id="width_input"
						label="Material Width"
						value={material.width}
						onChange={(width) => setMaterial({width})}
					/>
				</FormSection>
			</Form>
		</div>
	);
}
