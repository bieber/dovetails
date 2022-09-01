import DimensionInput from './DimensionInput';

import type {Props as DimensionInputProps} from './DimensionInput';


type FormProps = {
	allowSubmit?: boolean,
} & React.HTMLProps<HTMLFormElement>;
export function Form({children, allowSubmit, ...rest}: FormProps) {
	const onSubmit = allowSubmit
		? undefined
		: (e: React.FormEvent) => e.preventDefault();
	return (
		<form onSubmit={onSubmit} {...rest}>
			{children}
		</form>
	);
}

export function FormSection({children}: React.HTMLProps<HTMLDivElement>) {
	return (
		<div className="FormSection">
			{children}
		</div>
	);
}

export function FormHeader({children}: React.HTMLProps<HTMLDivElement>) {
	return (
		<div className="FormHeader">
			{children}
		</div>
	);
}

export function FormRow({children}: React.HTMLProps<HTMLDivElement>) {
	return (
		<div className="FormRow">
			{children}
		</div>
	);
}

type SelectRowProps = {
	id: string,
	label?: string,
	options: {value: string, label: string}[],
	value: string,
	onChange: (newValue: string) => void,
};
export function SelectRow(
	{id, label, options, value, onChange}: SelectRowProps,
) {
	const renderedOptions = options.map(
		({value, label}, i, is) => (
			<option key={i} value={value}>{label}</option>
		),
	);

	let renderedLabel = null;
	if (label) {
		renderedLabel = <label htmlFor={id}>{label}</label>;
	}

	return (
		<FormRow>
			{renderedLabel}
			<select
				id={id}
				value={value}
				onChange={(e) => onChange(e.target.value)}>
				{renderedOptions}
			</select>
		</FormRow>
	)
}

type TextRowProps = {
	id: string,
	label?: string,
	value: number,
	onChange: (newValue: number) => void,
	dimensionless?: boolean,
} & DimensionInputProps;
export function TextRow(
	{id, label, value, onChange, dimensionless, ...rest}: TextRowProps,
) {
	let renderedLabel = null;
	if (label) {
		renderedLabel = <label htmlFor={id}>{label}</label>;
	}

	return (
		<FormRow>
			{renderedLabel}
			<DimensionInput
				id={id}
				value={value}
				onChange={onChange}
				dimensionless={dimensionless}
				{...rest}
			/>
		</FormRow>
	);
}

type CheckRowProps = {
	id: string,
	label?: string,
	checked: boolean,
	onChange: (newChecked: boolean) => void,
} & Omit<React.HTMLProps<HTMLInputElement>, "onChange">
export function CheckRow(
	{id, label, checked, onChange, ...rest}: CheckRowProps,
) {
	let renderedLabel = null;
	if (label !== null) {
		renderedLabel = <label htmlFor={id}>{label}</label>;
	}

	return (
		<FormRow>
			{renderedLabel}
			<input
				id={id}
				type="checkbox"
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
				{...rest}
			/>
		</FormRow>
	);
}
