import { observable, computed } from 'mobx';
import { Literature } from '../literature/literature.interface';
import { Point } from './point';
import { Line } from './line';
import { findIndex } from '../utils';

export class System {
	@observable literature: Literature = { points: {}, lines: {}, angles: {} };

	@observable points: Point[] = [];
	@observable lines: Line[] = [];
	@computed
	get angles() {
		return Object.keys(this.literature.angles).map((angleID) => {
			const lineAID = angleID.split('^')[0];
			const lineBID = angleID.split('^')[1];

			const lineAIndex = findIndex(this.lines, (line) => line.id === lineAID);
			const lineBIndex = findIndex(this.lines, (line) => line.id === lineBID);

			const lineA = this.lines[lineAIndex];
			const lineB = this.lines[lineBIndex];

			const angleValue = lineA && lineB ? this.calculateAngle(lineA, lineB) : 'NA';

			return {
				description: this.literature.angles[angleID].description,
				normal: this.literature.angles[angleID].normal,
				deviation: this.literature.angles[angleID].deviation,
				value: angleValue
			};
		});
	}

	@computed
	get nextToBeAddIndex(): number {
		return findIndex(this.points, (point) => !point.added);
	}

	constructor(literature: Literature) {
		this.literature = literature;
		this.points = Object.keys(this.literature.points).map((key) => new Point(key, this.literature.points[key]));
		this.lines = Object.keys(this.literature.lines).map((key) => new Line(key, this.literature.lines[key]));
	}

	updatePointOnDrop(point: Point, container: HTMLDivElement, e: React.DragEvent<HTMLDivElement>) {
		const left = (e.pageX - container.offsetLeft - 5) / 700 * 100;
		const top = (e.pageY - container.offsetTop - 5) / 700 * 100;

		const targetIndex = findIndex(this.points, (x) => x.id === point.id);

		this.points[targetIndex].top = top;
		this.points[targetIndex].left = left;
	}

	calculateAngle(lineA: Line, lineB: Line) {
		const aValues = lineA.values(this);
		const bValues = lineB.values(this);
		if (!(aValues && bValues)) return;
		let angle = Math.round(Math.abs(aValues.angle - bValues.angle));
		if (angle > 180) {
			angle = 180 - angle;
		}
		return Math.abs(angle);
	}
}
