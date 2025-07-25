import {useStore} from '../context/store';
import {
	Unit,
	Kind,
	UnitSchema,
	KindSchema,
	setKind,
	setUnit,
	setCutter,
	setMaterial,
} from '../context/general';

import {useLimits} from '../util/limits';

import {Form, FormSection, SelectRow, TextRow} from './Form';

export default function GlobalSettings() {
	const [{general: {kind, unit, cutter, material}}, dispatch] = useStore();
	let {material: {maxThickness}} = useLimits();

	const kindOptions = [
		{value: Kind.Through, label: 'Through'},
		{value: Kind.Half, label: 'Half-Blind'},
	];

	const unitOptions = [
		{value: Unit.MM, label: 'mm'},
		{value: Unit.Inch, label: 'inch'},
	];

	function onDovetailChange(dovetailDiameter: number) {
		dispatch(setCutter({dovetailDiameter}));
	}

	function onStraightChange(straightDiameter: number) {
		dispatch(setCutter({straightDiameter}));
	}

	function updateKind(kind: string) {
		dispatch(setKind(KindSchema.parse(kind)));
	}

	function updateUnit(unit: string) {
		dispatch(setUnit(UnitSchema.parse(unit)));
	}

	let thicknessLabel = 'Material Thickness';
	let lengthInput = null;
	if (kind === 'half') {
		thicknessLabel = 'Dovetail Depth';
		lengthInput = (
			<TextRow
				id="length_input"
				label="Material Thickness"
				value={material.dovetailLength}
				onChange={(l) => dispatch(setMaterial({dovetailLength: l}))}
			/>
		);
	}

	let straightInput = null;
	if (kind === 'through') {
		straightInput = (
			<TextRow
				id="straight_diameter_input"
				label="Straight Diameter"
				value={cutter.straightDiameter}
				onChange={onStraightChange}
			/>
		);
	}

	return (
		<div className="Settings Block">
			<Form>
				<FormSection>
					<SelectRow
						id="type_input"
						label="Dovetail Type"
						options={kindOptions}
						value={kind}
						onChange={updateKind}
					/>
					<SelectRow
						id="units_input"
						label="Units"
						options={unitOptions}
						value={unit}
						onChange={updateUnit}
					/>
				</FormSection>
				<FormSection>
					<TextRow
						id="dovetail_diameter_input"
						label="Dovetail Diameter"
						value={cutter.dovetailDiameter}
						onChange={onDovetailChange}
					/>
					{straightInput}
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
					{lengthInput}
					<TextRow
						id="thickness_input"
						label={thicknessLabel}
						value={material.thickness}
						max={maxThickness}
						min={1}
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
