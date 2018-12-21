import { Analysis } from './analysis';
import { angles } from '../angles';

export class Basic extends Analysis {
	title = 'Basic Analysis';
	angles = [ angles['S-N^N-A'], angles['S-N^N-B'], angles['N-B^N-A'], angles['N-A^A-Pog'], angles['Me-Go^ANS-PNS'] ];
}

export default new Basic();
