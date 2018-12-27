export interface Angle {
	id: string;
	description: string;
	mean: number;
	deviation: number;
	inc: string;
	dec: string;
	norm: string;

	abs?: boolean;
	invert?: boolean;
}

export const angles: { [k: string]: Angle } = {
	'S-N^N-A': {
		id: 'S-N^N-A',
		description: 'SNA angle, describes anteroposterior position of the maxilla in relation to the cranial base',
		mean: 82,
		deviation: 2,
		inc: 'Prognathic maxilla',
		dec: 'Retrognathic maxilla',
		norm: 'Normal anteroposterior position of the maxilla'
	},
	'S-N^N-B': {
		id: 'S-N^N-B',
		description: 'SNB angle, describes anteroposterior position of the mandible in relation to the cranial base',
		mean: 80,
		deviation: 2,
		inc: 'Prognathic mandible',
		dec: 'Retrognathic mandible',
		norm: 'Normal anteroposterior position of the mandible'
	},
	'N-B^N-A': {
		id: 'N-B^N-A',
		description: 'ANB, a relative determination of the relation­ship of the maxilla to the mandible.',
		mean: 2,
		deviation: 2,
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
		deviation: 5,
		inc: 'Skeletal open bite, increases facial height',
		dec: 'Skeletal deep bite, decreases facial height',
		norm: 'Normal skeletal bite, normal facial height'
	},
	'S-N^ANS-PNS': {
		id: 'S-N^ANS-PNS',
		description: 'Maxillary plane to cranial base',
		mean: 8,
		deviation: 3,
		inc: 'Increased maxillary plane downward growth',
		dec: 'Decreased maxillary plane downward growth',
		norm: 'Normal maxillary plane growth',
		invert: true
	},
	'UIe-UIa^LIe-LIa': {
		id: 'UIe-UIa^LIe-LIa',
		description: 'Interincisal angle',
		mean: 135,
		deviation: 10,
		inc: 'Increased interincisal angle, dolichocephalic characteristic',
		dec: 'Decreased interincisal angle, brachycephalic characteristic',
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
			'IMPA, Line through the long axis of the lower incisors forms an angle with the mandibular plane. Measures the inclination of the lower incisors to the mandible plane',
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
		inc: 'Clockwise rotation of the mandible growth, unfavorable hyperdivergent pattern',
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
		inc:
			'Clockwise rotation of the mandible growth, vertical growth exceeding horizontal growth pattern, downward position of the chin in relation to upper face.',
		dec:
			'Counterclockwise rotation of the mandible growth, horizontal growth exceeding vertical growth, upward position of the chin in relation to upper face.',
		norm: 'Normal mandible rotation'
	},
	'Me-Go^Po-Or': {
		id: 'Me-Go^Po-Or',
		description: 'FMA, Frankfurt mandibular plane angle',
		mean: 27,
		deviation: 5,
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
	},
	'N-Pog^Po-Or': {
		id: 'N-Pog^Po-Or',
		description:
			'Facial Angle, Frankfort plane with N-Pog, measure the degree of retrusion or protrusion of the lower jaw.',
		mean: 87.8,
		deviation: 3.6,
		dec: 'Prominent, prognathic chin & mandible',
		inc: 'Retrognathic chin, mandible',
		norm: 'Normal chin, mandible'
	},
	'N-Pog^A-B': {
		id: 'N-Pog^A-B',
		description:
			'The A–B plane in relation to the facial plane (N–Pog) relates the anterior limit of the dentition to the facial profile',
		mean: -4.6,
		deviation: 3.8,
		dec: 'dentition is out of the profile limit',
		inc: 'dentition is out of the profile limit',
		norm: 'dentition is within profile limit'
	},
	'Ms-Mi^Po-Or': {
		id: 'Ms-Mi^Po-Or',
		description: 'Cant of the occlusal plane in relation to the Frankfort plane',
		mean: 9.3,
		deviation: 8.3,
		dec: 'decreased slope of occlusal plane',
		inc: 'increased slope of occlusal plane, indicative of Class II',
		norm: 'normal slope of occlusal plane'
	},
	'LIa-LIe^Ms-Mi': {
		id: 'LIa-LIe^Ms-Mi',
		description: 'Axial inclination of the mandibular incisors to the occlusal plane',
		mean: 90 + 14.5,
		deviation: 3.5,
		dec: 'decreased inclination',
		inc: 'increased inclination',
		norm: 'normal inclination'
	},
	'S-N^OLp-OLa': {
		id: 'S-N^OLp-OLa',
		description: 'Relating the occlusal plane to the SN plane.',
		mean: 14.5,
		deviation: 4,
		dec: 'skeletal deep bite, horizontally growing pattern',
		inc: 'skeletal open bite, vertically growing pattern',
		norm: 'normal relation',
		invert: true
	}
};

/*




*/
