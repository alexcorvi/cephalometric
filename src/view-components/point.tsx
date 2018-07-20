import { observer } from 'mobx-react';
import * as React from 'react';
import { Tooltip } from 'react-tippy';

@observer
export class PointView extends React.Component<{
	id: string;
	description: string;
	top: number;
	left: number;
	onDragged: (ev: React.DragEvent<HTMLDivElement>) => void;
}> {
	render() {
		return (
			<Tooltip title={'Point ' + this.props.id + '  ' + this.props.description} theme="light">
				<div
					onDragEnd={(ev) => this.props.onDragged(ev)}
					onDragLeave={(ev) => this.props.onDragged(ev)}
					id={this.props.id}
					draggable
					style={{
						top: this.props.top + '%',
						left: this.props.left + '%',
						background: '#fff',
						border: '1px solid #212121',
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
