import { System } from './literature.interface';

export const points = [ 'S', 'N', 'A', 'B', 'Pg', 'Me', 'Gn', 'Go', 'Isa', 'Is', 'Ii', 'Iia', 'OLp', 'OLa' ];

export const lines = [ 'S-N', 'OLp-OLa', 'Go-Gn', 'N-A', 'N-B', 'Iia-Ii', 'Isa-Is' ];

export const angularCalculations: { [key: string]: { description: string; normal: number; deviation: number } } = {
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

export const steiner: System = {
	points,
	lines,
	angularCalculations
};

export default steiner;
