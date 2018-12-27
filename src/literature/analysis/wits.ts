import { Analysis } from './analysis';
import { angles } from '../angles';
import { distances } from '../distances';

export class Wits extends Analysis {
	title = 'Wits appraisal';
	auxLines = [ 'OLp-OLa', 'A-OLp', 'B-OLp', 'A-AOP', 'B-BOP' ];
	distances = [ distances['AOP-BOP'] ];
	angles = [
		{
			id: 'B-BOP^OLa-OLp',
			description: 'BOP perpendicularity verification angle',
			mean: 90,
			deviation: 5,
			inc: 'Incorrect measurements',
			dec: 'Incorrect measurements',
			norm: 'Correct'
		},
		{
			id: 'A-AOP^OLa-OLp',
			description: 'AOP perpendicularity verification angle',
			mean: 90,
			deviation: 5,
			inc: 'Incorrect measurements',
			dec: 'Incorrect measurements',
			norm: 'Correct',
			abs: true
		}
	];

	get otherAnalysisResultComment() {
		return 'The average value is 1 mm (± 1.9 mm) for males and 0 mm (± 1.77 mm) for females.';
	}
}

export default new Wits();
