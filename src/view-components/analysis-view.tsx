import * as React from "react";
import * as utils from "../utils";
import Slider from "rc-slider";
import { AnalysisMethods } from "../data/data";
import { computed, observable } from "mobx";
import { data } from "../data/data";
import { observer } from "mobx-react";
import { points } from "../literature/points";
import { PointView } from "./point";

@observer
export class AnalysisView extends React.Component {
	div: HTMLDivElement | null = null;
	@observable invert: number = 0;
	@observable contrast: number = 100;
	@observable brightness: number = 100;
	@observable showCross: boolean = true;
	@observable showPointNames: boolean = true;
	@observable showAdditionalLines: boolean = true;
	@observable hoveredPoint: string = "";

	@observable showControl: string = "";

	@observable showResults: boolean = false;

	@observable markLines: string[] = [];

	@observable mouseCoords: number[] = [];

	@computed
	get stepDimension() {
		const calculated =
			(data.innerHeight -
				data.analysisMethod.requiredPoints.length * 30) /
			data.analysisMethod.requiredPoints.length;
		if (calculated > 40) {
			return 40;
		} else {
			return calculated;
		}
	}

	render() {
		return (
			<main>
				{this.showCross ? (
					<div>
						<div
							className="cursor-line vertical"
							style={{ left: this.mouseCoords[0] + 3 }}
						/>
						<div
							className="cursor-line horizontal"
							style={{ top: this.mouseCoords[1] + 3 }}
						/>
					</div>
				) : (
					""
				)}
				<div
					id="container"
					className="container"
					onDragOver={e => {
						e.preventDefault();
					}}
					ref={d => {
						this.div = d;
					}}
					style={{
						width: data.dimensions.width + "px",
						height: data.dimensions.height + "px",
						position: "relative"
					}}
				>
					<img
						onMouseMove={e => {
							this.mouseCoords = [e.clientX, e.clientY];
						}}
						src={data.imgSource.source}
						style={{
							width: data.dimensions.width,
							height: data.dimensions.height,
							position: "absolute",
							top: 0,
							left: 0,
							filter: `invert(${this.invert}%) contrast(${
								this.contrast
							}%) brightness(${this.brightness}%)`
						}}
						onClick={e => {
							if (!this.div) {
								return;
							}
							if (
								data.nextPointIndex === -1 ||
								data.nextPointID === undefined
							) {
								return;
							}
							const left =
								((e.pageX - this.div.offsetLeft - 5) /
									data.dimensions.width) *
								100;
							const top =
								((e.pageY - this.div.offsetTop - 5) /
									data.dimensions.height) *
								100;

							data.pointCoordinates[data.nextPointID] = {
								top,
								left
							};
						}}
					/>
					<div className="points">
						{Object.keys(data.pointCoordinates)
							.filter(
								x =>
									data.analysisMethod.requiredPoints.indexOf(
										x
									) > -1
							)
							.map(id => (
								<PointView
									showNames={this.showPointNames}
									key={id}
									onDragged={ev => {
										if (!this.div) {
											return;
										}
										data.updatePointOnDrop(
											id,
											this.div,
											ev
										);
									}}
									description={points[id]}
									id={id}
									top={
										(
											data.pointCoordinates[id] || {
												top: 0
											}
										).top
									}
									left={
										(
											data.pointCoordinates[id] || {
												left: 0
											}
										).left
									}
								/>
							))}
					</div>
					<div className="lines">
						{data.analysisMethod.lines.map(line => (
							<div key={line.id}>
								<div
									className={
										line.id === "0mm-10mm" ||
										data.analysisMethod.distances
											.map(x => x.id)
											.indexOf(line.id) > -1
											? "distance"
											: ""
									}
									id={line.id}
									style={{
										padding: 0,
										margin: 0,
										height: 2 + "px",
										backgroundColor:
											this.markLines.indexOf(line.id) !==
											-1
												? "gold"
												: "#212121",
										borderColor:
											this.markLines.indexOf(line.id) !==
											-1
												? "gold"
												: "#212121",
										lineHeight: "1px",
										position: "absolute",
										left: line.left + "px",
										top: line.top + "px",
										width: line.distance + "px",
										transform:
											"rotate(" + line.angle + "deg)"
									}}
								/>
								<div
									id={line.id + "additional"}
									style={{
										display: this.showAdditionalLines
											? ""
											: "none",
										padding: 0,
										margin: 0,
										height: 1 + "px",
										borderBottom: "1px dashed #e3e3e3",
										borderColor:
											this.markLines.indexOf(line.id) !==
											-1
												? "gold"
												: "#e3e3e3",
										lineHeight: "1px",
										position: "absolute",
										left:
											(line.x || { x_left: 0 }).x_left +
											"px",
										top:
											(line.x || { x_top: 0 }).x_top +
											"px",
										width:
											(line.x || { x_distance: 0 })
												.x_distance + "px",
										transform:
											"rotate(" +
											(line.x || { x_angle: 0 }).x_angle +
											"deg)"
									}}
								/>
							</div>
						))}
					</div>
				</div>
				<div className="steps">
					{data.analysisMethod.requiredPoints.map(pointID => (
						<div
							style={{
								height: this.stepDimension + "px",
								width: this.stepDimension + "px",
								lineHeight: this.stepDimension + "px"
							}}
							className={`step ${
								data.pointCoordinates[pointID]
									? " done"
									: data.nextPointID === pointID
									? " current"
									: ""
							} ${
								this.hoveredPoint === pointID ? "hovered" : ""
							}`}
							key={pointID}
							onMouseEnter={() => (this.hoveredPoint = pointID)}
							onMouseLeave={() => (this.hoveredPoint = "")}
						>
							<span className="id">{pointID}</span>
							<span
								className="description"
								style={{
									right: this.stepDimension + 20 + "px"
								}}
							>
								{points[pointID]}
							</span>
						</div>
					))}
				</div>
				<div className="controls">
					<div className="control-button">
						<span
							className="control-symbol"
							onClick={() =>
								(this.showAdditionalLines = this
									.showAdditionalLines
									? false
									: true)
							}
						>
							⇢
						</span>
					</div>
					<div className="control-button">
						<span
							className="control-symbol"
							onClick={() =>
								(this.showPointNames = this.showPointNames
									? false
									: true)
							}
						>
							♇
						</span>
					</div>
					<div className="control-button">
						<span
							className="control-symbol"
							onClick={() =>
								(this.showCross = this.showCross ? false : true)
							}
						>
							✛
						</span>
					</div>
					<div className="control-button">
						<span
							className="control-symbol"
							onClick={() =>
								(this.showControl =
									this.showControl === "brightness"
										? ""
										: "brightness")
							}
						>
							☀
						</span>
						<div
							className="control-range"
							style={{
								display:
									this.showControl === "brightness"
										? "block"
										: ""
							}}
						>
							<Slider
								handleStyle={{ borderColor: "#000" }}
								trackStyle={{ backgroundColor: "#e3e3e3" }}
								min={0}
								max={200}
								value={this.brightness}
								onChange={(n: number) => {
									this.brightness = n;
								}}
							/>
						</div>
					</div>
					<div className="control-button">
						<span
							className="control-symbol"
							onClick={() =>
								(this.showControl =
									this.showControl === "contrast"
										? ""
										: "contrast")
							}
						>
							◐
						</span>
						<div
							className="control-range"
							style={{
								display:
									this.showControl === "contrast"
										? "block"
										: ""
							}}
						>
							<Slider
								handleStyle={{ borderColor: "#000" }}
								trackStyle={{ backgroundColor: "#e3e3e3" }}
								min={0}
								max={500}
								value={this.contrast}
								onChange={(n: number) => {
									this.contrast = n;
								}}
							/>
						</div>
					</div>
					<div className="control-button">
						<span
							className="control-symbol"
							onClick={() =>
								(this.showControl =
									this.showControl === "invert"
										? ""
										: "invert")
							}
						>
							℧
						</span>
						<div
							className="control-range"
							style={{
								display:
									this.showControl === "invert" ? "block" : ""
							}}
						>
							<Slider
								handleStyle={{ borderColor: "#000" }}
								trackStyle={{ backgroundColor: "#e3e3e3" }}
								min={0}
								max={100}
								value={this.invert}
								onChange={(n: number) => {
									this.invert = n;
								}}
							/>
						</div>
					</div>
				</div>

				<div className="analysis-selection">
					<select
						onChange={a => {
							data.currentAnalysisName = a.target.value.toLowerCase();
						}}
					>
						{Object.keys(AnalysisMethods).map(methodName => (
							<option key={methodName} value={methodName}>
								{AnalysisMethods[methodName].title}
							</option>
						))}
					</select>
				</div>

				<div className={"results-container "}>
					{data.asInternalApplication ? (
						<button
							className="save-project"
							onClick={() => {
								utils.saveToPatient();
							}}
						>
							⤓ Save to patient
						</button>
					) : (
						""
					)}

					<button
						className="export-project"
						onClick={() => {
							utils.export2Base64();
						}}
					>
						⤓ Export project
					</button>

					<button
						className="export-image"
						onClick={() => {
							utils.exportDiv(
								"#container",
								`${
									data.analysisMethod.title
								}_image_${new Date().toLocaleDateString()}`
							);
						}}
					>
						⤓ Save image
					</button>

					<button
						className={this.showResults ? "show" : ""}
						onClick={() => (this.showResults = !this.showResults)}
					>
						☲ {this.showResults ? "Hide results" : "Show results"}
					</button>
					<div
						className="results"
						style={{ display: this.showResults ? "block" : "none" }}
					>
						<div id="result">
							<table>
								<thead>
									<tr>
										<th>Parameter</th>
										<th>Value</th>
										<th>Population mean</th>
										<th>Interpretation</th>
									</tr>
								</thead>
								<tbody>
									{data.analysisMethod.anglesValues
										.concat(
											data.analysisMethod.DistanceValues
										)
										.map(param => {
											const isAngle =
												param.id.indexOf("^") > -1;
											return (
												<tr
													key={param.description}
													onMouseEnter={() => {
														this.markLines = [];
														param.id
															.split("^")
															.forEach(lineID =>
																this.markLines.push(
																	lineID
																)
															);
													}}
													onMouseLeave={() => {
														this.markLines = [];
													}}
												>
													<td>
														{isAngle
															? "Angle: "
															: "Distance: "}
														{param.description}
													</td>
													<td>
														{param.value}
														{param.value
															? isAngle
																? "°"
																: "mm"
															: ""}
													</td>
													<td>
														{param.mean} ±{" "}
														{param.deviation}
														{isAngle ? "°" : "mm"}
													</td>
													<td>
														{param.interpretation}
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
							<p className="additional-comment">
								{data.analysisMethod.otherAnalysisResultComment
									? data.analysisMethod
											.otherAnalysisResultComment
									: ""}
							</p>
						</div>
						<button
							className="export-table"
							onClick={() => {
								utils.exportDiv(
									"#result",
									`${
										data.analysisMethod.title
									}_results_${new Date().toLocaleDateString()}`
								);
							}}
						>
							⤓ Save table
						</button>
					</div>
				</div>
			</main>
		);
	}

	componentDidMount() {
		data.innerWidth = window.innerWidth;
		data.innerHeight = window.innerHeight;
		window.addEventListener("resize", () => {
			data.innerWidth = window.innerWidth;
			data.innerHeight = window.innerHeight;
		});
	}
}
