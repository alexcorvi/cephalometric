import { observer } from 'mobx-react';
import * as React from 'react';
import { Tooltip } from 'react-tippy';
import { Point } from '../data/point';
import { observable } from 'mobx';
import { System } from '../data/system';
import { SystemView } from './system';

import rickettsLiterature from '../literature/ricketts';
import steinerLiterature from '../literature/steiner';

@observer
export class Main extends React.Component {
	@observable system: undefined | System;

	@observable imgSource: undefined | string;

	@observable imgHeight: number = 0;
	@observable imgWidth: number = 0;

	input: HTMLInputElement | null = null;

	render() {
		return (
			<div>
				{this.system ? this.imgSource ? (
					<SystemView system={this.system} imgSource={this.imgSource} />
				) : (
					<div className="choose">
						<p>Please upload your lateral radiograph, or use the sample for demonstration purposes</p>
						<input
							ref={(el) => (this.input = el)}
							type="file"
							onChange={() => {
								if (this.input && this.input.files && this.input.files[0]) {
									var FR = new FileReader();
									FR.addEventListener('load', (e) => {
										this.imgSource = (e.target as any).result;
									});
									FR.readAsDataURL(this.input.files[0]);
								}
							}}
						/>
						<button
							onClick={() => {
								this.imgSource =
									'http://3d-cdds.com/Portals/_default/Skins/Doris/images/ceph/standard_ceph.PNG';
							}}
						>
							Use the demo
						</button>
					</div>
				) : (
					<div className="choose">
						<p>Please choose what analysis you're going to use</p>
						<button
							onClick={() => {
								this.system = new System(rickettsLiterature);
							}}
						>
							Ricketts Analysis
						</button>{' '}
						<button
							onClick={() => {
								this.system = new System(steinerLiterature);
							}}
						>
							Steiner Analysis
						</button>
					</div>
				)}
			</div>
		);
	}
}
