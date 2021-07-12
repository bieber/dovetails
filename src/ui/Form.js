import DimensionInput from './DimensionInput';

export function Form({children, allowSubmit, ...rest}) {
	const onSubmit = allowSubmit ? undefined : (e) => e.preventDefault();
	return (
		<form onSubmit={onSubmit} {...rest}>
			{children}
		</form>
	);
}

export function FormSection({children}) {
	return (
		<div className="FormSection">
			{children}
		</div>
	);
}

export function FormRow({children}) {
	return (
		<div className="FormRow">
			{children}
		</div>
	);
}

export function SelectRow({id, label, options, value, onChange}) {
	const renderedOptions = options.map(
		({value, label}, i, is) => (
			<option key={i} value={value}>{label}</option>
		),
	);

	let renderedLabel = null;
	if (label !== null) {
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

export function TextRow({id, label, value, onChange, dimensionless, ...rest}) {
	let renderedLabel = null;
	if (label !== null) {
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

export function CheckRow({id, label, checked, onChange, ...rest}) {
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
