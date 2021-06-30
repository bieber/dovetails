export function Form({children}) {
	return (
		<form onSubmit={(e) => e.preventDefault()}>
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

export function TextRow({id, label, value, onChange}) {
	let renderedLabel = null;
	if (label !== null) {
		renderedLabel = <label htmlFor={id}>{label}</label>;
	}

	return (
		<FormRow>
			{renderedLabel}
			<input
				id={id}
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</FormRow>
	);
}
