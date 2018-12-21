export interface Angle {
	id: string;
	description: string;
	mean: number;
	deviation: number;
	inc: string;
	dec: string;
	norm: string;

	abs?: true;
	invert?: boolean;
}

export const angles = {
	'S-N^N-A': {
		id: 'S-N^N-A',
		description: 'SNA angle, describes anteroposterior position of the maxilla in relation to the cranial base',
		mean: 82,
		deviation: 4,
		inc: 'Prognathic maxilla',
		dec: 'Retrognathic maxilla',
		norm: 'Normal anteroposterior position of the maxilla'
	},
	'S-N^N-B': {
		id: 'S-N^N-B',
		description: 'SNB angle, describes anteroposterior position of the mandible in relation to the cranial base',
		mean: 80,
		deviation: 4,
		inc: 'Prognathic mandible',
		dec: 'Retrognathic mandible',
		norm: 'Normal anteroposterior position of the mandible'
	},
	'N-B^N-A': {
		id: 'N-B^N-A',
		description: 'ANB, a relative determination of the relation­ship of the maxilla to the mandible.',
		mean: 2,
		deviation: 2.5,
		inc: 'Skeletal Class II relationship',
		dec: 'Skeletal Class III relationship',
		norm: 'Skeletal Class I relationship'
	},
	'N-A^A-Pog': {
		id: 'N-A^A-Pog',
		description:
			'The angle of convexity is a measure of maxillary protrusion in relation to the total profile and is the angle formed between lines running from N–A to A–Pog.',
		mean: 0,
		deviation: 5.9,
		inc: 'Concave skeletal profile',
		dec: 'Convex skeletal profile',
		norm: 'Straight skeletal profile'
	},
	'Me-Go^ANS-PNS': {
		id: 'Me-Go^ANS-PNS',
		description: 'MMPA, maxillary-mandibular plane angle',
		mean: 27,
		deviation: 4,
		inc: 'Skeletal open bite, increases facial height',
		dec: 'Skeletal deep bite, decreases facial height',
		norm: 'Normal skeletal bite, normal facial height'
	},
	'UIe-UIa^LIe-LIa': {
		id: 'UIe-UIa^LIe-LIa',
		description: 'Interincisal angle',
		mean: 135,
		deviation: 10,
		inc: 'Increased interincisal angle',
		dec: 'Decreased interincisal angle',
		norm: 'Normal interincisal angle'
	},
	'S-N^UIe-UIa': {
		id: 'S-N^UIe-UIa',
		description:
			'Line through the long axis of the upper incisors forms an angle with the SN plane horizontal. Measures the inclination of the upper incisors to the SN plane',
		mean: 103,
		deviation: 6,
		inc: 'Increased upper incisor inclination',
		dec: 'Decreased upper incisor inclination',
		norm: 'Normal upper incisor inclination'
	},
	'Me-Go^LIe-LIa': {
		id: 'Me-Go^LIe-LIa',
		description:
			'Line through the long axis of the lower incisors forms an angle with the mandibular plane. Measures the inclination of the lower incisors to the mandible plane',
		mean: 93,
		deviation: 8,
		inc: 'Increased lower incisor inclination',
		dec: 'Decreased lower incisor inclination',
		norm: 'Normal lower incisor inclination'
	},
	'S-N^Me-Go': {
		id: 'S-N^Me-Go',
		description: 'SN-MP, The mandibular plane angle, SN-NP, measure for vertical growth patterns',
		mean: 32,
		deviation: 5,
		inc: 'Clockwise rotation of the mandible growth',
		dec: 'Counterclockwise rotation of the mandible growth',
		norm: 'Normal mandible rotation',
		invert: true
	},
	'S-Gn^Po-Or': {
		id: 'S-Gn^Po-Or',
		description:
			'Y-Axis, SGn-FH, Anteroinferior angle formed by the intersect­ion of a line drawn from sella to gnathion and the Frankfort horizontal, determines the overall growth pattern of the face',
		mean: 59,
		deviation: 4,
		inc: 'Clockwise rotation of the mandible growth',
		dec: 'Counterclockwise rotation of the mandible growth',
		norm: 'Normal mandible rotation'
	},
	'Me-Go^Po-Or': {
		id: 'Me-Go^Po-Or',
		description: 'FMA, Frankfurt mandibular plane angle',
		mean: 28,
		deviation: 4,
		inc: 'Clockwise rotation of the mandible growth, increases facial height',
		dec: 'Counterclockwise rotation of the mandible growth, decreases facial height',
		norm: 'Normal mandible rotation, normal facial height'
	},
	'LIe-LIa^Po-Or': {
		id: 'LIe-LIa^Po-Or',
		description: 'FMIA, Line through the long axis of the lower incisors forms an angle with the Frankfurt plane.',
		mean: 67,
		deviation: 2.5,
		inc: '',
		dec: '',
		norm: '',
		invert: true
	}
};

/*




*/
