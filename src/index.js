import React from 'react';
import ReactDOM from 'react-dom';

import './stylesheets/base.scss';
import { App } from './components';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
