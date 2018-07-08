import { observer } from 'mobx-react';
import * as React from 'react';
import { Tooltip } from 'react-tippy';
import { Point } from '../data/point';
import { observable } from "mobx";
import { System } from '../data/system';
import { PointView } from "./point";
import Slider from "rc-slider";


@observer
export class SystemView extends React.Component<{ system: System; imgSource: string }> {
    div: HTMLDivElement | null = null;

    @observable invert: number = 0;
    @observable contrast: number = 100;
    @observable brightness: number = 100;

    render() {
        return (
            <main>
                <div>
                    {this.props.system.nextToBeAddIndex !== -1 ? (
                        <p className="top-hint">
                            Next: add point{' '}
                            <span>{this.props.system.points[this.props.system.nextToBeAddIndex].id}</span>,{' '}
                            {this.props.system.points[this.props.system.nextToBeAddIndex].description}
                        </p>
                    ) : (
                            <div className="results">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Angle</th>
                                            <th>Normal range</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.system.angles.map((angle) => {
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
                        )}
                </div>
                <div
                    className="container"
                    onDragOver={(e) => {
                        e.preventDefault();
                    }}
                    ref={(d) => {
                        this.div = d;
                    }}
                    style={{
                        filter: `invert(${this.invert}%) contrast(${this.contrast}%) brightness(${this.brightness}%)`,
                        width: '700px',
                        height: '700px',
                        position: 'relative',
                        backgroundImage: `url(${this.props.imgSource})`,
                        backgroundSize: 'cover'
                    }}
                    onClick={(e) => {
                        if (!this.div) return;
                        if (this.props.system.nextToBeAddIndex === -1) return;
                        const left = (e.pageX - this.div.offsetLeft - 5) / 700 * 100;
                        const top = (e.pageY - this.div.offsetTop - 5) / 700 * 100;
                        this.props.system.points[this.props.system.nextToBeAddIndex].top = top;
                        this.props.system.points[this.props.system.nextToBeAddIndex].left = left;
                    }}
                >
                    <div className="points">
                        {this.props.system.points.filter((x) => x.added).map((point) => (
                            <PointView
                                key={point.id}
                                point={point}
                                onDragged={(ev) => {
                                    if (!this.div) return;
                                    this.props.system.updatePointOnDrop(point, this.div, ev);
                                }}
                            />
                        ))}
                    </div>
                    <div className="lines">
                        {this.props.system.lines.filter((x) => x.values).map((line) => (
                            <Tooltip key={line.id} title={'Line ' + line.id + '  ' + line.description} theme="light">
                                <div
                                    style={
                                        line.values(this.props.system) ? (
                                            {
                                                padding: 0,
                                                margin: 0,
                                                height: 3 + 'px',
                                                backgroundColor: 'red',
                                                lineHeight: '1px',
                                                position: 'absolute',
                                                left: (line.values(this.props.system) || { left: 0 }).left + 'px',
                                                top: (line.values(this.props.system) || { top: 0 }).top + 'px',
                                                width:
                                                    (line.values(this.props.system) || { distance: 0 }).distance +
                                                    'px',
                                                transform:
                                                    'rotate(' +
                                                    (line.values(this.props.system) || { angle: 0 }).angle +
                                                    'deg)'
                                            }
                                        ) : (
                                                {}
                                            )
                                    }
                                />
                            </Tooltip>
                        ))}
                    </div>
                </div>
                <div className="controls" style={{ width: '700px', margin: '0 auto' }}>
                    <div style={{ width: '33.333%', float: 'left', textAlign: 'center' }}>
                        <p style={{ color: '#f44336' }}>Invert</p>
                        <Slider
                            handleStyle={{ borderColor: '#f44336' }}
                            trackStyle={{ backgroundColor: '#f44336' }}
                            min={0}
                            max={100}
                            value={this.invert}
                            onChange={(n: number) => {
                                this.invert = n;
                            }}
                        />
                    </div>

                    <div style={{ width: '33.333%', float: 'left', textAlign: 'center' }}>
                        <p style={{ color: '#673ab7' }}>Contrast</p>
                        <Slider
                            handleStyle={{ borderColor: '#673ab7' }}
                            trackStyle={{ backgroundColor: '#673ab7' }}
                            min={0}
                            max={500}
                            value={this.contrast}
                            onChange={(n: number) => {
                                this.contrast = n;
                            }}
                        />
                    </div>
                    <div style={{ width: '33.333%', float: 'left', textAlign: 'center' }}>
                        <p style={{ color: '#ff9800' }}>Brightness</p>
                        <Slider
                            handleStyle={{ borderColor: '#ff9800' }}
                            trackStyle={{ backgroundColor: '#ff9800' }}
                            min={0}
                            max={200}
                            value={this.brightness}
                            onChange={(n: number) => {
                                this.brightness = n;
                            }}
                        />
                    </div>
                </div>
            </main>
        );
    }
}