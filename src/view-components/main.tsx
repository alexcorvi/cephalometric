import { observer } from 'mobx-react';
import * as React from 'react';
import { Tooltip } from 'react-tippy';
import { observable } from 'mobx';
import { data } from '../data/data';
import { SystemView } from './system';

import rickettsLiterature from '../literature/ricketts';
import steinerLiterature from '../literature/steiner';

@observer
export class Main extends React.Component {
	@observable imgSource: undefined | string;

	input: HTMLInputElement | null = null;

	render() {
		return (
			<div>
				{true ? (
					<SystemView />
				) : (
					<div className="choose">
						<p>Please upload your lateral radiograph, or use the sample for demonstration purposes</p>
						<input
							ref={(el) => (this.input = el)}
							type="file"
							onChange={() => {
								if (this.input && this.input.files && this.input.files[0]) {
									const FR = new FileReader();
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
				)}
			</div>
		);
	}
}
