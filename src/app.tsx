import './style.scss';
import 'rc-slider/assets/index.css';
import 'react-tippy/dist/tippy.css';
import './index.html';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Main } from './view-components/main';

const rootElement = document.getElementById('root');
ReactDOM.render(<Main /> as any, rootElement);
