/** @flow */

import React from 'react';
import componentClassNames from './app.module.scss';
import logo from './logo.svg';

/**
 * @description App main component.
 * @returns {Object<string,*>} App main component.
 */
function App() {
    return (
        <div className={componentClassNames.app}>
            <header className={componentClassNames.appHeader}>
                <img
                    src={logo}
                    alt='logo'
                    className={componentClassNames.appLogo}
                />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    href='https://reactjs.org'
                    target='_blank'
                    rel='noopener noreferrer'
                    className={componentClassNames.appLink}>
                    Learn React
                </a>
            </header>
        </div>
    );
}

export {App};
