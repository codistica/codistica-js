/** @flow */

import React from 'react';
import logo from './logo.svg';
import './app.css';

// TODO: ADAPT @codistica/demo create-react-app TEMPLATE RESULT TO CODISTICA CONVENTION.
// TODO: CREATE CODISTICA TEMPLATE FOR create-react-app?

/**
 * @description App main component.
 * @returns {React.Component} App main component.
 */
function App() {
    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className='App-link'
                    href='https://reactjs.org'
                    target='_blank'
                    rel='noopener noreferrer'>
                    Learn React
                </a>
            </header>
        </div>
    );
}

export {App};
