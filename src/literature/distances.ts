export interface Distance {
	id: string;
	description: string;
	mean: number;
	deviation: number;
	inc: string;
	dec: string;
	norm: string;
	mightBeNegative?: boolean;
}

export const distances: { [k: string]: Distance } = {
	'Me-MMP': {
		id: 'Me-MMP',
		description: 'lower anterior facial height',
		mean: 65,
		deviation: 10,
		inc: 'Increased lower facial height',
		dec: 'Decreased lower facial height',
		norm: 'Normal lower facial height'
	},
	'N-NMP': {
		id: 'N-NMP',
		description: 'upper anterior facial height',
		mean: 54,
		deviation: 10,
		inc: 'Increased upper facial height',
		dec: 'Decreased upper facial height',
		norm: 'Normal upper facial height'
	},
	'AOP-BOP': {
		id: 'AOP-BOP',
		description: 'AOP-BOP distance, relating the maxilla and mandible to each other using the occlusal plane',
		mean: 0.5,
		deviation: 1.5,
		inc: 'Class III wits tendency',
		dec: 'Class II wits tendency',
		norm: 'Class I wits tendency',
		mightBeNegative: true
	}
};
