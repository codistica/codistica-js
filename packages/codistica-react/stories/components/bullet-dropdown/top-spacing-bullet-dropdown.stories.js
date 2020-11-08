/** @flow */

import React from 'react';
import {BulletDropdown} from '../../../src/index.js';

/**
 * @description A top spacing bullet dropdown demo.
 * @returns {Object<string,*>} React component.
 */
function TopSpacingBulletDropdown() {
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
                title={'Auto Spacing Top'}
                items={{
                    Codistica: 'https://www.codistica.com',
                    Yahoo: 'https://www.yahoo.com',
                    Facebook: 'https://www.facebook.com',
                    Youtube: 'https://www.youtube.com',
                    Google: 'https://www.google.com'
                }}
                autoSpacing={'top'}
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

const meta = {
    title: 'Bullet Dropdown',
    parameters: {
        backgrounds: {
            default: 'Dark'
        }
    }
};

export {TopSpacingBulletDropdown};
export default meta;
