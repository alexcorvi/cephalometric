import { Analysis } from './analysis';
import { angles } from '../angles';
import { findIndex, inRange } from '../../utils';

export class Tweed extends Analysis {
	title = "Tweed's Triangle";
	angles = [ angles['Me-Go^Po-Or'], angles['Me-Go^LIe-LIa'], angles['LIe-LIa^Po-Or'] ];

	get otherAnalysisResultComment() {
		const FMA = this.anglesValues[findIndex(this.anglesValues, (x) => x.id === 'Me-Go^Po-Or')].value;

		const IMPA = this.anglesValues[findIndex(this.anglesValues, (x) => x.id === 'Me-Go^LIe-LIa')].value;

		const FMIA = this.anglesValues[findIndex(this.anglesValues, (x) => x.id === 'LIe-LIa^Po-Or')].value;

		let prognosis = '';
		let extractions = 'are not necessary';

		if (typeof FMA !== 'number' || typeof IMPA !== 'number' || typeof IMPA !== 'number') {
			return '';
		}

		if (inRange(FMA, 16, 28)) {
			if (inRange(FMA, 16, 22) && inRange(IMPA, 90, 97)) {
				prognosis = 'is good';
			}
			if (inRange(FMA, 21, 23) && inRange(IMPA, 89, 91)) {
				prognosis = 'is good';
			}
			if (inRange(FMA, 22, 29) && inRange(IMPA, 84, 90)) {
				prognosis = 'is good';
			}
		}
		if (inRange(FMA, 28, 35)) {
			if (inRange(FMA, 28, 29) && inRange(IMPA, 84, 86)) {
				prognosis = 'is fair';
			}
			if (inRange(FMA, 29, 35) && inRange(IMPA, 80, 85)) {
				prognosis = 'is fair';
				extractions = 'are necessary';
			}
			if (FMA > 35) {
				prognosis = 'is bad';
				extractions = 'will complicate problems';
			}
		}

		if (prognosis) {
			return `According to tweed's triangle: prognosis ${prognosis} and extractions ${extractions}. IMPA angle should be maintained between 65 and 70.`;
		} else {
			return '';
		}
	}
}

export default new Tweed();
