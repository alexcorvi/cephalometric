import { Analysis } from './analysis';
import { angles } from '../angles';
import { distances } from '../distances';

export class Steiner extends Analysis {
	title = 'Steiner Analysis';
	angles = [ angles['S-N^N-A'], angles['S-N^N-B'], angles['N-B^N-A'], angles['S-N^Me-Go'], angles['S-N^OLp-OLa'] ];
}

export default new Steiner();
