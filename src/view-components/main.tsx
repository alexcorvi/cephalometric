import * as React from "react";
import { AnalysisView } from "./analysis-view";
import { data } from "../data/data";
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
export class Main extends React.Component {
	input: HTMLInputElement | null = null;

	componentDidMount() {
		window.onmessage = function(e) {
			let messageData = e.data;
			if (!messageData) return;
			if (typeof messageData !== "string") return;
			if (!messageData.startsWith("cephalometric-open:")) return;
			messageData = messageData.split("cephalometric-open:")[1];
			data.asInternalApplication = true;
			if (messageData !== "new") {
				messageData = JSON.parse(messageData);
				data.imgSource = messageData.imgSource;
				data.pointCoordinates = messageData.pointCoordinates;
				data.currentAnalysisName = messageData.currentAnalysisName;
			}
		};
	}

	render() {
		return (
			<div>
				{data.imgSource.source ? (
					<AnalysisView />
				) : (
					<div className="choose">
						<p>
							Please upload your cephalometric radiograph, project
							file, or use the sample for demonstration purposes
						</p>
						<input
							ref={el => (this.input = el)}
							type="file"
							onChange={() => {
								if (
									this.input &&
									this.input.files &&
									this.input.files[0]
								) {
									const FR = new FileReader();
									FR.addEventListener("load", e => {
										const fileContents = (e.target as any)
											.result;
										const cephalometricProjectFile = atob(
											fileContents.split(",")[1]
										);
										if (
											cephalometricProjectFile.startsWith(
												"cephalometric_project:"
											)
										) {
											const contents = cephalometricProjectFile.split(
												"cephalometric_project:"
											)[1];
											const fileData: typeof data = JSON.parse(
												atob(contents)
											);
											data.imgSource = fileData.imgSource;
											data.pointCoordinates =
												fileData.pointCoordinates;
											data.currentAnalysisName =
												fileData.currentAnalysisName;
										} else {
											const img = new Image();
											img.onload = function() {
												data.imgSource.height =
													img.height;
												data.imgSource.width =
													img.width;
												data.imgSource.source = fileContents;
											};
											img.src = fileContents;
										}
									});
									FR.readAsDataURL(this.input.files[0]);
								}
							}}
						/>
						<button
							onClick={() => {
								data.imgSource.source = "./sample.png";
								const img = new Image();
								img.onload = function() {
									data.imgSource.height = img.height;
									data.imgSource.width = img.width;
								};
								img.src = "./sample.png";
							}}
						>
							Use the demo
						</button>
					</div>
				)}
			</div>
		);
	}
}
