import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export class PointView extends React.Component<{
	id: string;
	description: string;
	top: number;
	left: number;
	onDragged: (ev: React.DragEvent<HTMLDivElement>) => void;
	showNames: boolean;
}> {
	render() {
		return (
			<div
				className="landmark"
				onDragEnd={(ev) => this.props.onDragged(ev)}
				onDragLeave={(ev) => this.props.onDragged(ev)}
				id={this.props.id}
				draggable
				style={{
					top: this.props.top + '%',
					left: this.props.left + '%'
				}}
			>
				{this.props.showNames ? this.props.id : ''}
			</div>
		);
	}
}
