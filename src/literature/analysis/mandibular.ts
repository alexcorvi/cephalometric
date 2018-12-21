import { Analysis } from './analysis';
import { angles } from '../angles';
export class Mandibular extends Analysis {
	title = 'Mandibular Rotation';
	angles = [ angles['S-N^Me-Go'], angles['S-Gn^Po-Or'], angles['Me-Go^Po-Or'] ];
}

export default new Mandibular();
