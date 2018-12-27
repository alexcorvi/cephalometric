import { Analysis } from './analysis';
import { angles } from '../angles';
import { distances } from '../distances';

export class Downs extends Analysis {
	title = 'Downs Analysis';
	angles = [
		angles['N-Pog^Po-Or'],
		angles['N-A^A-Pog'],
		angles['N-Pog^A-B'],
		angles['Me-Go^Po-Or'],
		angles['S-Gn^Po-Or'],
		angles['UIe-UIa^LIe-LIa'],
		angles['Ms-Mi^Po-Or'],
		angles['LIa-LIe^Ms-Mi'],
		angles['Me-Go^LIe-LIa']
	];
}

export default new Downs();
