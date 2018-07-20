export interface System {
	points: string[];
	lines: string[];
	angularCalculations: { [key: string]: { description: string; normal: number; deviation: number } };
}
