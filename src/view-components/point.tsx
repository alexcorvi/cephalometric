import { observer } from 'mobx-react';
import * as React from 'react';
import { Tooltip } from 'react-tippy';
import { Point } from '../data/point';

@observer
export class PointView extends React.Component<{
	point: Point;
	onDragged: (ev: React.DragEvent<HTMLDivElement>) => void;
}> {
	render() {
		return (
			<Tooltip title={'Point ' + this.props.point.id + '  ' + this.props.point.description} theme="light">
				<div
					onDragEnd={(ev) => this.props.onDragged(ev)}
					onDragLeave={(ev) => this.props.onDragged(ev)}
					id={this.props.point.id}
					draggable
					style={{
						top: this.props.point.top + '%',
						left: this.props.point.left + '%',
						background: 'gold',
						width: '10px',
						height: '10px',
						borderRadius: 5,
						position: 'absolute'
					}}
				/>
			</Tooltip>
		);
	}
}
