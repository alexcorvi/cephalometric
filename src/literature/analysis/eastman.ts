import { Analysis } from './analysis';
import { angles } from '../angles';
import { findIndex, inRange } from '../../utils';

export class Eastman extends Analysis {
	title = 'Mills-Eastman Analysis';
	angles = [
		angles['S-N^N-A'],
		angles['S-N^N-B'],
		angles['N-B^N-A'],
		angles['Me-Go^ANS-PNS'],
		angles['S-N^ANS-PNS'],
		angles['Me-Go^Po-Or']
	];

	get otherAnalysisResultComment() {
		const SNA = this.anglesValues[findIndex(this.anglesValues, (x) => x.id === 'S-N^N-A')].value;
		let ANB = this.anglesValues[findIndex(this.anglesValues, (x) => x.id === 'N-B^N-A')].value;

		if (typeof SNA === 'number' && typeof ANB === 'number') {
			const diff = Math.abs(SNA - 81);
			if (SNA > 81) {
				ANB = ANB - 0.5 * diff;
			}
			if (SNA < 81) {
				ANB = ANB + 0.5 * diff;
			}

			ANB = Math.round(ANB * 10) / 10;
			return `The new value of ANB is = ${ANB} degree according to Mills's Eastman Correction.
            Mills' Eastman Correction: For every degree SNA is greater than 81 subtract 0.5 from the original ANB value; and for every degree SNA is less than 81 add 0.5 to the original ANB value.`;
		}
		return '';
	}
}

export default new Eastman();
