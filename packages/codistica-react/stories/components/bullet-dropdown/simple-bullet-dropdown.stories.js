/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {BulletDropdown} from '../../../src/index.js';

/**
 * @description A simple bullet dropdown demo.
 * @returns {Object<string,*>} React component.
 */
function SimpleBulletDropdown() {
    return (
        <div>
            <div
                style={{
                    padding: 50,
                    backgroundColor: '#ffffff',
                    marginBottom: 20
                }}>
                OTHER ELEMENTS
            </div>
            <BulletDropdown
                title={'Simple Menu'}
                items={{
                    Codistica: 'https://www.codistica.com',
                    Yahoo: 'https://www.yahoo.com',
                    Facebook: 'https://www.facebook.com',
                    Youtube: 'https://www.youtube.com',
                    Google: 'https://www.google.com'
                }}
            />
            <div
                style={{
                    padding: 50,
                    backgroundColor: '#ffffff',
                    marginTop: 20
                }}>
                OTHER ELEMENTS
            </div>
        </div>
    );
}

export {SimpleBulletDropdown};

export default {
    title: 'Bullet Dropdown',
    parameters: {
        backgrounds: BGS_DARK
    }
};
