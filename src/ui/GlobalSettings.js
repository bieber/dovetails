import {useStore} from '../context/store';
import {setUnit, setCutter, setMaterial} from '../context/general';

import {useLimits} from '../util/limits';

import {Form, FormSection, SelectRow, TextRow} from './Form';

export default function GlobalSettings() {
	const [{general: {unit, cutter, material}}, dispatch] = useStore();
	const {material: {maxThickness}} = useLimits();

	const unitOptions = [
		{value: 'mm', label: 'mm'},
		{value: 'inch', label: 'inch'},
	];

	function onDovetailChange(dovetailDiameter) {
		dispatch(setCutter({dovetailDiameter}));
	}

	function onStraightChange(straightDiameter) {
		dispatch(setCutter({straightDiameter}));
	}

	return (
		<div className="Settings Block">
			<Form>
				<FormSection>
					<SelectRow
						id="units_input"
						label="Units"
						options={unitOptions}
						value={unit}
						onChange={(unit) => dispatch(setUnit(unit))}
					/>
				</FormSection>
				<FormSection>
					<TextRow
						id="dovetail_diameter_input"
						label="Dovetail Diameter"
						value={cutter.dovetailDiameter}
						onChange={onDovetailChange}
					/>
					<TextRow
						id="straight_diameter_input"
						label="Straight Diameter"
						value={cutter.straightDiameter}
						onChange={onStraightChange}
					/>
					<TextRow
						id="height_input"
						label="Cutter Height"
						value={cutter.height}
						onChange={(height) => dispatch(setCutter({height}))}
					/>
					<TextRow
						id="angle_input"
						label="Cutter Angle (deg)"
						value={cutter.angle}
						onChange={(angle) => dispatch(setCutter({angle}))}
						dimensionless
					/>
				</FormSection>
				<FormSection>
					<TextRow
						id="thickness_input"
						label="Material Thickness"
						value={material.thickness}
						max={maxThickness}
						onChange={(t) => dispatch(setMaterial({thickness: t}))}
					/>
					<TextRow
						id="width_input"
						label="Material Width"
						value={material.width}
						onChange={(width) => dispatch(setMaterial({width}))}
					/>
				</FormSection>
			</Form>
		</div>
	);
}
