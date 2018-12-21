import { Analysis } from './analysis';
import { angles } from '../angles';
export class Dental extends Analysis {
	title = 'Dental Analysis';
	angles = [ angles['UIe-UIa^LIe-LIa'], angles['S-N^UIe-UIa'], angles['Me-Go^LIe-LIa'] ];
}

export default new Dental();
