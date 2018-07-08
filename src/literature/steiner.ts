import { Literature } from './literature.interface';

export const points: { [key: string]: string } = {
	S: `(sella), the midpoint of the cavity of sella turcica`,
	N: `(nasion), Most anterior point on frontonasal suture`,
	A: `the innermost point on the contour of the premaxilla between anterior nasal spine and the incisor tooth`,
	B: `the innermost point on the contour of the mandible between the incisor tooth and the bony chin`,
	Pg: `(pogonion), the most anterior point on the contour of the chin`,
	Me: `(menton), the most inferior point on the mandibular symphysis (i.e., the bottom of the chin)`,
	Gn: `(gnathion), Point located perpendicular on mandibular symphysis midway between pogonion and menton`,
	Go: `(gonion), the midpoint of the contour connecting the ramus and body of the mandible`,
	Isa: 'Incisor superior apex (upper incisor root)',
	Is: 'Incisor superior (upper incisor tip)',
	Ii: 'Incisor inferior (lower incisor tip)',
	Iia: 'Incisor inferior apex (lower incisor root)',
	OLp: 'Occlusal Line, posterior point, distal tip of the first molar',
	OLa: 'Occlusal Line, anterior point, distal tip of the first premolar'
};

export const lines: { [key: string]: string } = {
	'S-N':
		'(sella–nasion line), This plane is represents the anterior cranial base and is formed by projecting a plane from the sella-nasion line',
	'OLp-OLa': 'Occlusal line',
	'Go-Gn':
		'(mandibular plane), This plane is formed by connecting the point gonion to gnathion at the inferior border of the mandible.',
	'N-A': 'upper facial inclination',
	'N-B': 'lower facial inclination',
	'Iia-Ii': 'lower incisor inclination',
	'Isa-Is': 'upper incisor inclination'
};

export const angles: { [key: string]: { description: string; normal: number; deviation: number } } = {
	'S-N^N-A': {
		description: 'SNA The angle around the center <N> and between the markers <A> and <S>.',
		normal: 82,
		deviation: 0
	},
	'S-N^N-B': {
		description: 'SNB The angle around the center <N> and between the markers <B> and <S>.',
		normal: 80,
		deviation: 0
	},
	'N-A^N-B': {
		description: 'ANB The angle around the center <N> and between the markers <A> and <B>.',
		normal: 2,
		deviation: 0
	},
	'OLp-OLa^S-N': {
		description: 'The angle between the anterior cranial base and the line occlusal plane',
		normal: 14,
		deviation: 0
	},
	'Go-Gn^S-N': {
		description: 'The angle between the anterior cranial base and the mandibular plane',
		normal: 32,
		deviation: 0
	},
	'Isa-Is^N-A': {
		description: 'The angle between the upper incisor inclination and the upper facial inclination',
		normal: 22,
		deviation: 0
	},
	'Iia-Ii^N-B': {
		description: 'The angle between the lower incisor inclination and the lower facial inclination',
		normal: 25,
		deviation: 0
	},
	'Iia-Ii^Isa-Is': {
		description: 'The interincisal angle, between the upper incisor inclination and the lower incisor inclination',
		normal: 130,
		deviation: 0
	}
};

export const steiner: Literature = {
	points,
	lines,
	angles
};

export default steiner;
