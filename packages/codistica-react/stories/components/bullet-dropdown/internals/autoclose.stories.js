/** @flow */

import React from 'react';
import {BulletDropdown} from '../../../../src/index.js';

function AutoClose() {
    return (
        <div>
            <div
                style={{
                    padding: 50,
                    backgroundColor: '#ffffff',
                    marginBottom: 20
                }}>
                {'OTHER ELEMENTS'}
            </div>
            <BulletDropdown
                title={'Auto Close'}
                items={{
                    Codistica: 'https://www.codistica.com',
                    Yahoo: 'https://www.yahoo.com',
                    Facebook: 'https://www.facebook.com',
                    Youtube: 'https://www.youtube.com',
                    Google: 'https://www.google.com'
                }}
                autoClose={true}
            />
            <div
                style={{
                    padding: 50,
                    backgroundColor: '#ffffff',
                    marginTop: 20
                }}>
                {'OTHER ELEMENTS'}
            </div>
        </div>
    );
}

export {AutoClose};
