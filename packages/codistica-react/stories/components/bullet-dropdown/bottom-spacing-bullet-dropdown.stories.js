/** @flow */

import React from 'react';
import {BulletDropdown} from '../../../src/index.js';

/**
 * @description A bottom spacing bullet dropdown demo.
 * @returns {Object<string,*>} React component.
 */
function BottomSpacingBulletDropdown() {
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
                title={'Auto Spacing Bottom'}
                items={{
                    Codistica: 'https://www.codistica.com',
                    Yahoo: 'https://www.yahoo.com',
                    Facebook: 'https://www.facebook.com',
                    Youtube: 'https://www.youtube.com',
                    Google: 'https://www.google.com'
                }}
                autoSpacing={'bottom'}
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

export {BottomSpacingBulletDropdown};

export default {
    title: 'Bullet Dropdown',
    parameters: {
        backgrounds: {
            default: 'Dark'
        }
    }
};
