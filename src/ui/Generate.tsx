import {useStore} from '../context/store';

import GenerateHalf from './GenerateHalf';
import GenerateThrough from './GenerateThrough';

export default function Generate() {
	const [{general: {kind}}] = useStore();

	if (kind === 'through') {
		return <GenerateThrough />;
	} else if (kind === 'half') {
		return <GenerateHalf />;
	}

	return null;
}
