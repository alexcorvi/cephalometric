import { observer } from 'mobx-react';
import * as React from 'react';
import { Tooltip } from 'react-tippy';
import { observable, computed } from 'mobx';
import { data } from '../data/data';
import { PointView } from './point';
import { points } from '../literature/points';
import Slider from 'rc-slider';
import { image } from '../data/sample.img';
import { systems } from '../data/data';

@observer
export class SystemView extends React.Component {
	div: HTMLDivElement | null = null;
	@observable invert: number = 0;
	@observable contrast: number = 100;
	@observable brightness: number = 100;

	@observable hovered: string = '';

	@observable showControl: string = '';

	@observable showResults: boolean = false;

	@computed
	get stepDimension() {
		return (data.innerHeight - data.system.points.length * 24) / data.system.points.length;
	}

	render() {
		return (
			<main>
				<div
					className="container"
					onDragOver={(e) => {
						e.preventDefault();
					}}
					ref={(d) => {
						this.div = d;
					}}
					style={{
						width: data.dimensions.width + 'px',
						height: data.dimensions.height + 'px',
						position: 'relative'
					}}
				>
					<img
						src={image}
						style={{
							width: data.dimensions.width,
							height: data.dimensions.height,
							position: 'absolute',
							top: 0,
							left: 0,
							filter: `invert(${this.invert}%) contrast(${this.contrast}%) brightness(${this
								.brightness}%)`
						}}
						onClick={(e) => {
							if (!this.div) {
								return;
							}
							if (data.nextPointIndex === -1 || data.nextPointID === undefined) {
								return;
							}
							const left = (e.pageX - this.div.offsetLeft - 5) / data.dimensions.width * 100;
							const top = (e.pageY - this.div.offsetTop - 5) / data.dimensions.height * 100;

							data.pointCoordinates[data.nextPointID] = {
								top,
								left
							};
						}}
					/>
					<div className="points">
						{Object.keys(data.pointCoordinates).map((id) => (
							<PointView
								key={id}
								onDragged={(ev) => {
									if (!this.div) {
										return;
									}
									data.updatePointOnDrop(id, this.div, ev);
								}}
								description={points[id]}
								id={id}
								top={(data.pointCoordinates[id] || { top: 0 }).top}
								left={(data.pointCoordinates[id] || { left: 0 }).left}
							/>
						))}
					</div>
					<div className="lines">
						{data.lines.map((line) => (
							<Tooltip key={line.id} title={'Line ' + line.id + '  ' + line.description} theme="light">
								<div
									style={{
										padding: 0,
										margin: 0,
										height: 1 + 'px',
										backgroundColor: '#212121',
										lineHeight: '1px',
										position: 'absolute',
										left: line.left + 'px',
										top: line.top + 'px',
										width: line.distance + 'px',
										transform: 'rotate(' + line.angle + 'deg)'
									}}
								/>
							</Tooltip>
						))}
					</div>
					<div className="steps">
						{data.system.points.map((pointID) => (
							<div
								style={{
									height: this.stepDimension + 'px',
									width: this.stepDimension + 'px',
									lineHeight: this.stepDimension + 'px'
								}}
								className={`step ${data.pointCoordinates[pointID]
									? ' done'
									: data.nextPointID === pointID ? ' current' : ''} ${this.hovered === pointID
									? 'hovered'
									: ''}`}
								key={pointID}
								onMouseEnter={() => (this.hovered = pointID)}
								onMouseLeave={() => (this.hovered = '')}
							>
								<span className="id">{pointID}</span>
								<span className="description" style={{ right: this.stepDimension + 20 + 'px' }}>
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
									(this.showControl = this.showControl === 'brightness' ? '' : 'brightness')}
							>
								☀
							</span>
							<div
								className="control-range"
								style={{ display: this.showControl === 'brightness' ? 'block' : '' }}
							>
								<Slider
									handleStyle={{ borderColor: '#000' }}
									trackStyle={{ backgroundColor: '#e3e3e3' }}
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
								onClick={() => (this.showControl = this.showControl === 'contrast' ? '' : 'contrast')}
							>
								◐
							</span>
							<div
								className="control-range"
								style={{ display: this.showControl === 'contrast' ? 'block' : '' }}
							>
								<Slider
									handleStyle={{ borderColor: '#000' }}
									trackStyle={{ backgroundColor: '#e3e3e3' }}
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
								onClick={() => (this.showControl = this.showControl === 'invert' ? '' : 'invert')}
							>
								℧
							</span>
							<div
								className="control-range"
								style={{ display: this.showControl === 'invert' ? 'block' : '' }}
							>
								<Slider
									handleStyle={{ borderColor: '#000' }}
									trackStyle={{ backgroundColor: '#e3e3e3' }}
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

					<div className="system-selection">
						<select
							onChange={(a) => {
								data.currentSystemName = a.target.value.toLowerCase();
							}}
						>
							{Object.keys(systems).map((systemName) => <option key={systemName}>{systemName}</option>)}
						</select>
					</div>

					<div className="results">
						<button onClick={() => (this.showResults = !this.showResults)}>
							{this.showResults ? 'Hide' : 'Show'} Calculations
						</button>
						<div className="results-table" style={{ display: this.showResults ? 'block' : 'none' }}>
							<table>
								<thead>
									<tr>
										<th>Angle</th>
										<th>Normal range</th>
										<th>Value</th>
									</tr>
								</thead>
								<tbody>
									{data.angles.map((angle) => {
										return (
											<tr key={angle.description}>
												<td>{angle.description}</td>
												<td>
													{angle.normal}±{angle.deviation}
												</td>
												<td>{angle.value}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</main>
		);
	}

	componentDidMount() {
		data.innerWidth = window.innerWidth;
		data.innerHeight = window.innerHeight;
		window.addEventListener('resize', () => {
			data.innerWidth = window.innerWidth;
			data.innerHeight = window.innerHeight;
		});
	}
}
