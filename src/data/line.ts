import { observable, computed } from 'mobx';
import { System } from './system';
import { findIndex } from '../utils';

export class Line {
	@observable id: string = '';
	@observable description: string = '';
	@computed
	get aID(): string {
		return this.id.split('-')[0];
	}
	@computed
	get bID(): string {
		return this.id.split('-')[1];
	}

	values(system: System) {
		const pointA = system.points[findIndex(system.points, (Point) => Point.id === this.aID)];
		const pointB = system.points[findIndex(system.points, (Point) => Point.id === this.bID)];

		if (!(pointA && pointB)) return null;
		if (!(pointA.added && pointB.added)) return null;

		const x1 = pointA.left / 100 * 700 + 5;
		const x2 = pointB.left / 100 * 700 + 5;
		const y1 = pointA.top / 100 * 700 + 5;
		const y2 = pointB.top / 100 * 700 + 5;

		const distance = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
		const left = (x1 + x2) / 2 - distance / 2;
		const top = (y1 + y2) / 2 - 1 / 2;
		const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);

		return { distance, left, top, angle, x1, y1, x2, y2 };
	}

	constructor(id: string, description: string) {
		this.id = id;
		this.description = description;
	}
}
