/** @flow */

import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {App} from './app.js';
import {reportWebVitals} from './report-web-vitals.js';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
