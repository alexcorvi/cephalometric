export interface Literature {
	points: { [key: string]: string };
	lines: { [key: string]: string };
	angles: { [key: string]: { description: string; normal: number; deviation: number } };
}
