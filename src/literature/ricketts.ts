import { Literature } from './literature.interface';

export const points: { [key: string]: string } = {
	N: `(nasion), Most anterior point on frontonasal suture`,
	Or: `(orbitale), the lowest point on the inferior margin of the orbit`,
	Pt: `(Pterygo-maxillary fissure), Point at base of fissure where anterior and posterior wall meet. Anterior wall represents posterior surface of maxillary tuberosity`,
	A: `the innermost point on the contour of the premaxilla between anterior nasal spine and the incisor tooth`,
	Ii: 'Incisor inferior (lower incisor tip)',
	Iia: 'Incisor inferior apex (lower incisor root)',
	Pg: `(pogonion), the most anterior point on the contour of the chin`,
	Me: `(menton), the most inferior point on the mandibular symphysis(i.e., the bottom of the chin)`,
	Gn: `(gnathion), Point located perpendicular on mandibular symphysis midway between pogonion and menton`,
	Go: `(gonion), the midpoint of the contour connecting the ramus and body of the mandible`,
	Ba: `(basion), the lowest point on the anterior margin of the foramen magnum, at the base of the clivus`,
	Po: `(porion), the midpoint of the upper contour of the external auditory canal (anatomic porion); or the midpoint of the upper contour of the metal ear rod of the cephalometer(machine porion)`
};

export const lines: { [key: string]: string } = {
	'Po-Or': '(Frankfurt horizontal plane), This plane represents the habitual postural position of the head.',
	'Go-Gn':
		'(mandibular plane), This plane is formed by connecting the point gonion to gnathion at the inferior border of the mandible.',
	'N-Pg': '(facial plane), This vertical plane is formed by connecting nasion to pogonion.',
	'Pt-Gn': 'Pterygo-maxillary fissure to gnathion',
	'N-Ba': 'Nasion to basion',
	'Pg-A': 'Alveolar bone inclination',
	'Iia-Ii': 'lower incisor inclination'
};

export const angles: { [key: string]: { description: string; normal: number; deviation: number } } = {
	'Pt-Gn^N-Ba': {
		description: '(Facial axis), The angle between the line <Pt>-<Gn> and the line <N>-<Ba>.',
		normal: 90,
		deviation: 3.5
	},
	'N-Pg^Po-Or': {
		description: '(Facial angle), The angle between facial plane and frankfort horizontal plane',
		normal: 89,
		deviation: 3
	},
	'Go-Gn^Po-Or': {
		description: 'The angle between mandibular plane and frankfort horizontal plane',
		normal: 24,
		deviation: 4.5
	},
	'Pg-A^Iia-Ii': {
		description: 'The angle between Alveolar bone inclination and lower incisor inclination',
		normal: 22,
		deviation: 4
	}
};

export const ricketts: Literature = {
	points,
	lines,
	angles
};

export default ricketts;
