import {useGlobalContext} from '../context/globalContext';
import {usePinContext} from '../context/pinContext';

import {Form, FormSection} from './Form';

export default function Submit() {
	const [{cutter, material}] = useGlobalContext();
	const [{pins, halfPins}] = usePinContext();

	const submission = {cutter, material, pins, halfPins}

	return (
		<div className="Block Settings">
			<Form method="post" action="/generate" allowSubmit>
				<input
					type="hidden"
					name="submission"
					value={JSON.stringify(submission)}
				/>
				<FormSection>
					<input type="submit" value="Generate" />
				</FormSection>
			</Form>
		</div>
	);
}
