import {useStore} from '../context/store';
import {mirror} from '../context/pins';
import {partitionPins} from '../util/pins';

import {Form, FormSection} from './Form';

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
				<FormSection>
					<div className="TwoButtonRow">
						<button
							disabled={pinsLeftOfCenter.length === 0}
							onClick={mirrorLTR}>
							Mirror Left to Right
						</button>
						<button
							disabled={pinsRightOfCenter.length === 0}
							onClick={mirrorRTL}>
							Mirror Right to Left
						</button>
					</div>
				</FormSection>
			</Form>
		</div>
	);
}
