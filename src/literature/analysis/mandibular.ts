import { Analysis } from './analysis';
import { angles } from '../angles';
export class Mandibular extends Analysis {
	title = 'Mandibular Rotation';
	angles = [ angles['S-N^Me-Go'], angles['Me-Go^Po-Or'], angles['S-Gn^Po-Or'], angles['N-Pog^Po-Or'] ];
}

export default new Mandibular();
