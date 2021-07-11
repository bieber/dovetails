// TODO: Remove this and move to client-rendered SVG files

import {Form, FormSection} from './Form';

export default function Submit() {

	return (
		<div className="Block Settings">
			<Form method="post" action="/generate" allowSubmit>
				<FormSection>
					<input type="submit" value="Generate" />
				</FormSection>
			</Form>
		</div>
	);
}
