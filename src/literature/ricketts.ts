import { System } from './literature.interface';

export const points = [ 'N', 'Or', 'Pt', 'A', 'Ii', 'Iia', 'Pg', 'Me', 'Gn', 'Go', 'Ba', 'Po' ];

export const lines = [ 'Po-Or', 'Go-Gn', 'N-Pg', 'Pt-Gn', 'N-Ba', 'Pg-A', 'Iia-Ii' ];

export const angularCalculations: { [key: string]: { description: string; normal: number; deviation: number } } = {
	'Pt-Gn^N-Ba': {
		description: '(Facial axis), The angle between the line <Pt>-<Gn> and the line <N>-<Ba>',
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

export const ricketts: System = {
	points,
	lines,
	angularCalculations
};

export default ricketts;
