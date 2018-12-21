import { Analysis } from './analysis';
import { angles } from '../angles';
export class Vertical extends Analysis {
	title = 'Vertical Analysis';
	angles = [ angles['Me-Go^Po-Or'], angles['Me-Go^ANS-PNS'] ];
}

export default new Vertical();
