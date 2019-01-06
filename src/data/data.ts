import basic from "../literature/analysis/basic";
import dental from "../literature/analysis/dental";
import downs from "../literature/analysis/downs";
import eastman from "../literature/analysis/eastman";
import mandibular from "../literature/analysis/mandibular";
import steiner from "../literature/analysis/steiner";
import tweed from "../literature/analysis/tweed";
import vertical from "../literature/analysis/vertical";
import wits from "../literature/analysis/wits";
import { Analysis } from "../literature/analysis/analysis";
import { computed, observable } from "mobx";
import { findIndex } from "../utils";
import { points } from "../literature/points";

interface ImgSource {
	source: string;
	height: number;
	width: number;
}

export const AnalysisMethods: { [K: string]: Analysis } = {
	basic,
	dental,
	vertical,
	mandibular,
	downs,
	steiner,
	eastman,
	wits,
	tweed
};

class Data {
	@observable
	imgSource: ImgSource = {
		source: "",
		height: 300,
		width: 500
	};

	@observable innerWidth = innerWidth;
	@observable innerHeight = innerHeight;

	@observable currentAnalysisName: string = Object.keys(AnalysisMethods)[0];

	@observable pointCoordinates: {
		[id: string]: { top: number; left: number } | undefined;
	} = {};

	@observable asInternalApplication: boolean = false;

	@computed
	get dimensions() {
		const screenWidth = this.innerWidth;
		const screenHeight = this.innerHeight;

		const differenceProportion =
			(this.imgSource.width - this.innerWidth) / this.imgSource.width;
		const height =
			this.imgSource.height -
			differenceProportion * this.imgSource.height;
		return { width: screenWidth, height };
	}

	@computed
	get analysisMethod() {
		return AnalysisMethods[this.currentAnalysisName];
	}

	@computed
	get nextPointIndex() {
		return findIndex(
			this.analysisMethod.requiredPoints,
			pointID => !this.pointCoordinates[pointID]
		);
	}

	@computed
	get nextPointID(): string | undefined {
		return this.analysisMethod.requiredPoints[this.nextPointIndex];
	}

	@computed
	get nextPointDescription(): string | undefined {
		return points[this.nextPointID || ""];
	}

	updatePointOnDrop(
		id: string,
		container: HTMLDivElement,
		e: React.DragEvent<HTMLDivElement>
	) {
		const left =
			((e.pageX - container.offsetLeft - 5) / this.dimensions.width) *
			100;
		const top =
			((e.pageY - container.offsetTop - 5) / this.dimensions.height) *
			100;
		this.pointCoordinates[id] = {
			left,
			top
		};
	}
}

export const data = new Data();
