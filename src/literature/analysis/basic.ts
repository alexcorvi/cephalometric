import { Analysis } from './analysis';
import { angles } from '../angles';
import { distances } from '../distances';

export class Basic extends Analysis {
	title = 'Basic Analysis';
	angles = [
		angles['S-N^N-A'],
		angles['S-N^N-B'],
		angles['N-B^N-A'],
		angles['N-A^A-Pog'],
		angles['Me-Go^ANS-PNS'],
		angles['N-Pog^Po-Or']
	];
}

export default new Basic();
