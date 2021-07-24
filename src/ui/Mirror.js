import {useStore} from '../context/store';
import {mirror} from '../context/pins';
import {partitionPins} from '../util/pins';

import {Form, FormSection, FormHeader} from './Form';

export default function Mirror() {
	const [
		{
			general: {
				material: {width},
				cutter: {dovetailDiameter},
			},
			pins,
		},
		dispatch,
	] = useStore();

	const [pinsLeftOfCenter, pinsRightOfCenter] = partitionPins(
		pins,
		width,
		dovetailDiameter,
	);

	function mirrorLTR() {
		dispatch(mirror('ltr', width, dovetailDiameter));
	}

	function mirrorRTL() {
		dispatch(mirror('rtl', width, dovetailDiameter));
	}

	return (
		<div className="Block Settings">
			<Form>
				<FormHeader>
					<span>Mirror Design</span>
				</FormHeader>
				<FormSection>
					<div className="TwoButtonRow">
						<button
							disabled={pinsLeftOfCenter.length === 0}
							onClick={mirrorLTR}>
							Left to Right
						</button>
						<button
							disabled={pinsRightOfCenter.length === 0}
							onClick={mirrorRTL}>
							Right to Left
						</button>
					</div>
				</FormSection>
			</Form>
		</div>
	);
}
