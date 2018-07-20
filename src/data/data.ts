import { observable, computed } from 'mobx';
import { System } from '../literature/literature.interface';
import { findIndex } from '../utils';

interface Line {
	id: string;
	description: string;
	distance?: number;
	left?: number;
	top?: number;
	angle?: number;
	x1?: number;
	y1?: number;
	x2?: number;
	y2?: number;
}

interface ImgSource {
	source: string;
	height: number;
	width: number;
}

import { points } from '../literature/points';
import { lines } from '../literature/lines';

import { ricketts } from '../literature/ricketts';
import { steiner } from '../literature/steiner';
import { image } from './sample.img';

export const systems: { [K: string]: System } = {
	ricketts,
	steiner
};

class Data {
	@observable
	imgSource: ImgSource = {
		source: image,
		height: 1818,
		width: 2272
	};

	@observable innerWidth = innerWidth;
	@observable innerHeight = innerHeight;

	@computed
	get dimensions() {
		const screenWidth = this.innerWidth;
		const screenHeight = this.innerHeight;

		const differenceProportion = (this.imgSource.width - this.innerWidth) / this.imgSource.width;
		const height = this.imgSource.height - differenceProportion * this.imgSource.height;
		return { width: screenWidth, height };
	}

	@observable currentSystemName: string = Object.keys(systems)[0];

	@observable pointCoordinates: { [id: string]: { top: number; left: number } | undefined } = {};

	@computed
	get system() {
		return systems[this.currentSystemName];
	}

	@computed
	get lines(): Line[] {
		return this.system.lines.map((id) => {
			const pointAID = id.split('-')[0];
			const pointBID = id.split('-')[1];

			const pointACoordinates = this.pointCoordinates[pointAID];
			const pointBCoordinates = this.pointCoordinates[pointBID];
			const description = lines[id];

			if (!(pointACoordinates && pointBCoordinates)) {
				return { id, description };
			}

			const x1 = pointACoordinates.left / 100 * this.dimensions.width + 5;
			const x2 = pointBCoordinates.left / 100 * this.dimensions.width + 5;
			const y1 = pointACoordinates.top / 100 * this.dimensions.height + 5;
			const y2 = pointBCoordinates.top / 100 * this.dimensions.height + 5;

			const distance = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
			const left = (x1 + x2) / 2 - distance / 2;
			const top = (y1 + y2) / 2 - 1 / 2;
			const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);

			return { distance, left, top, angle, x1, y1, x2, y2, id, description };
		});
	}

	@computed
	get angles() {
		return Object.keys(this.system.angularCalculations).map((angleID) => {
			const lineAID = angleID.split('^')[0];
			const lineBID = angleID.split('^')[1];

			const lineAIndex = findIndex(this.lines, (line) => line.id === lineAID);
			const lineBIndex = findIndex(this.lines, (line) => line.id === lineBID);

			const lineA = this.lines[lineAIndex];
			const lineB = this.lines[lineBIndex];

			const angleValue = lineA && lineB ? this.calculateAngle(lineA, lineB) : 'NA';

			return {
				description: this.system.angularCalculations[angleID].description,
				normal: this.system.angularCalculations[angleID].normal,
				deviation: this.system.angularCalculations[angleID].deviation,
				value: angleValue
			};
		});
	}

	@computed
	get nextPointIndex() {
		return findIndex(this.system.points, (pointID) => !this.pointCoordinates[pointID]);
	}

	@computed
	get nextPointID(): string | undefined {
		return this.system.points[this.nextPointIndex];
	}

	@computed
	get nextPointDescription(): string | undefined {
		return points[this.nextPointID || ''];
	}

	updatePointOnDrop(id: string, container: HTMLDivElement, e: React.DragEvent<HTMLDivElement>) {
		const left = (e.pageX - container.offsetLeft - 5) / this.dimensions.width * 100;
		const top = (e.pageY - container.offsetTop - 5) / this.dimensions.height * 100;
		this.pointCoordinates[id] = {
			left,
			top
		};
	}

	calculateAngle(lineA: Line, lineB: Line) {
		if (!(lineA.angle && lineB.angle)) {
			return;
		}
		let angle = Math.round(Math.abs(lineA.angle - lineB.angle));
		if (angle > 180) {
			angle = 180 - angle;
		}
		return Math.abs(angle);
	}
}

export const data = new Data();
