import { Angle } from '../angles';
import { computed } from 'mobx';
import { data } from '../../data/data';
import { Distance } from '../distances';
import { findIndex } from '../../utils';

export interface Line {
	id: string;
	distance?: number;
	left?: number;
	top?: number;
	angle?: number;
	x1?: number;
	y1?: number;
	x2?: number;
	y2?: number;
}

export class Analysis {
	title: string = '';

	@computed
	get requiredPoints() {
		return this.lines.reduce((arr: string[], line) => {
			line.id.split('-').forEach((x) => (arr.indexOf(x) === -1 ? arr.push(x) : ''));
			return arr;
		}, []);
	}

	@computed
	get lines() {
		// get angle lines
		return (
			this.angles
				.map((angle) => angle.id)
				.reduce((arr: string[], angleID) => {
					angleID.split('^').forEach((x) => (arr.indexOf(x) === -1 ? arr.push(x) : ''));
					return arr;
				}, [])
				// and reference lines
				.concat(this.distances.length ? [ '0mm-10mm' ] : [])
				// and auxillary lines
				.concat(this.auxLines)
				// and distance lines
				.concat(this.distances.map((x) => x.id))
				.map((id) => {
					const pointAID = id.split('-')[0];
					const pointBID = id.split('-')[1];

					const pointACoordinates = data.pointCoordinates[pointAID];
					const pointBCoordinates = data.pointCoordinates[pointBID];

					if (!(pointACoordinates && pointBCoordinates)) {
						return { id };
					}

					const x1 = pointACoordinates.left / 100 * data.dimensions.width + 5;
					const x2 = pointBCoordinates.left / 100 * data.dimensions.width + 5;
					const y1 = pointACoordinates.top / 100 * data.dimensions.height + 5;
					const y2 = pointBCoordinates.top / 100 * data.dimensions.height + 5;

					const distance = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
					const left = (x1 + x2) / 2 - distance / 2;
					const top = (y1 + y2) / 2 - 1 / 2;
					const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);

					const x_left = (x1 + x2) / 2 - 3000 / 2;
					const x_top = (y1 + y2) / 2 - 1 / 2;
					const x_angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);

					return {
						distance,
						left,
						top,
						angle,
						x1,
						y1,
						x2,
						y2,
						id,
						x: { x_left, x_top, x_angle, x_distance: 3000 }
					};
				})
		);
	}

	@computed
	get anglesValues() {
		return this.angles.map((angle) => {
			const lineAID = angle.id.split('^')[0];
			const lineBID = angle.id.split('^')[1];

			const lineAIndex = findIndex(this.lines, (line) => line.id === lineAID);
			const lineBIndex = findIndex(this.lines, (line) => line.id === lineBID);

			const lineA = this.lines[lineAIndex];
			const lineB = this.lines[lineBIndex];

			const angleValue = lineA && lineB ? this.calculateAngle(lineA, lineB, angle.abs, angle.invert) : 'NA';

			const max = angle.mean + angle.deviation;
			const min = angle.mean - angle.deviation;

			return {
				id: angle.id,
				description: angle.description,
				mean: angle.mean,
				deviation: angle.deviation,
				value: angleValue,
				interpretation:
					angleValue === 'NA' || angleValue === undefined
						? ''
						: angleValue > max ? angle.inc : angleValue < min ? angle.dec : angle.norm
			};
		});
	}

	@computed
	get DistanceValues() {
		return this.distances.map((distance) => {
			const distanceValue = this.calculateDistance(distance.id, distance.mightBeNegative);
			const max = distance.mean + distance.deviation;
			const min = distance.mean - distance.deviation;
			return {
				id: distance.id,
				description: distance.description,
				mean: distance.mean,
				deviation: distance.deviation,
				value: distanceValue,
				interpretation:
					distanceValue === undefined
						? ''
						: distanceValue > max ? distance.inc : distanceValue < min ? distance.dec : distance.norm
			};
		});
	}

	calculateDistance(lineID: string, negative?: boolean) {
		const refPixels = this.lines[findIndex(this.lines, (line) => line.id === '0mm-10mm')].distance;
		const targetLine = this.lines[findIndex(this.lines, (line) => line.id === lineID)];
		const targetLineDistance = targetLine.distance;
		if (refPixels && targetLineDistance && targetLine.x1 && targetLine.x2) {
			const distance = Math.round(targetLineDistance * (10 / refPixels) * 10) / 10;
			if (targetLine.x1 > targetLine.x2 && negative) {
				return distance * -1;
			}
			return distance;
		} else {
			return undefined;
		}
	}

	calculateAngle(lineA: Line, lineB: Line, abs?: boolean, invert?: boolean) {
		if (!(lineA.angle && lineB.angle)) {
			return;
		}
		let angle = Math.round((lineA.angle - lineB.angle) * 10) / 10;
		if (angle > 180) {
			angle = angle - 180;
		}

		if (abs) {
			angle = Math.abs(angle);
		}

		if (invert) {
			angle = 180 - angle;
		}

		return Math.round(angle * 10) / 10;
	}
	angles: Angle[] = [];

	distances: Distance[] = [];

	auxLines: string[] = [];

	get otherAnalysisResultComment() {
		return '';
	}
}
