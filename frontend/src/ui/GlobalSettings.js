import {useGlobalContext} from '../context/globalContext';
import {useDimension, useNumber} from './dimension';
import {Form, FormSection, SelectRow, TextRow} from './Form';

export default function GlobalSettings() {
	const [
		{unit, cutter, material},
		{setUnit, setCutter, setMaterial},
	] = useGlobalContext();

	const [diameterText, setDiameter] = useDimension(
		cutter.diameter,
		(diameter) => setCutter({diameter}),
	);
	const [heightText, setHeight] = useDimension(
		cutter.height,
		(height) => setCutter({height}),
	);
	const [angleText, setAngle] = useNumber(
		cutter.angle,
		(angle) => setCutter({angle}),
	);

	const [thicknessText, setThickness] = useDimension(
		material.thickness,
		(thickness) => setMaterial({thickness}),
	);
	const [widthText, setWidth] = useDimension(
		material.width,
		(width) => setMaterial({width}),
	);

	const unitOptions = [
		{value: 'mm', label: 'mm'},
		{value: 'inch', label: 'inch'},
	];
	return (
		<div className="GlobalSettings">
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
						value={diameterText}
						onChange={setDiameter}
					/>
					<TextRow
						id="heigh_input"
						label="Cutter Height"
						value={heightText}
						onChange={setHeight}
					/>
					<TextRow
						id="angle_input"
						label="Cutter Angle (deg)"
						value={angleText}
						onChange={setAngle}
					/>
				</FormSection>
				<FormSection>
					<TextRow
						id="thickness_input"
						label="Material Thickness"
						value={thicknessText}
						onChange={setThickness}
					/>
					<TextRow
						id="width_input"
						label="Material Width"
						value={widthText}
						onChange={setWidth}
					/>
				</FormSection>
			</Form>
		</div>
	);
}
