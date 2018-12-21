import * as React from 'react';
import { AnalysisView } from './analysis-view';
import { data } from '../data/data';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Tooltip } from 'react-tippy';

@observer
export class Main extends React.Component {
	input: HTMLInputElement | null = null;

	render() {
		return (
			<div>
				{data.imgSource.source ? (
					<AnalysisView />
				) : (
					<div className="choose">
						<p>Please upload your cephalometric radiograph, or use the sample for demonstration purposes</p>
						<input
							ref={(el) => (this.input = el)}
							type="file"
							onChange={() => {
								if (this.input && this.input.files && this.input.files[0]) {
									const FR = new FileReader();
									FR.addEventListener('load', (e) => {
										const source = (e.target as any).result;
										let img = new Image();
										img.onload = function() {
											data.imgSource.height = img.height;
											data.imgSource.width = img.width;
											data.imgSource.source = source;
										};
										img.src = source;
									});
									FR.readAsDataURL(this.input.files[0]);
								}
							}}
						/>
						<button
							onClick={() => {
								data.imgSource.source = './sample.png';
								let img = new Image();
								img.onload = function() {
									data.imgSource.height = img.height;
									data.imgSource.width = img.width;
								};
								img.src = './sample.png';
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
