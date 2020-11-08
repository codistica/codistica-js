/** @flow */

import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {App} from './app.js';
import * as serviceWorker from './service-worker.js';
import './fonts/iceland-codistica/iceland-codistica.css';
import './fonts/jura-codistica/jura-codistica.css';

// TODO: REPLACE create-react-app SETUP WITH A CUSTOM SETUP FROM SCRATCH.
// TODO: REMOVE JSDOC.

ReactDOM.render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
