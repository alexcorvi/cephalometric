import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Main } from './view-components/main';
import './style.scss';
import './index.html';
import 'rc-slider/assets/index.css';

const rootElement = document.getElementById('root');
ReactDOM.render(<Main /> as any, rootElement);
