/** @flow */

import React from 'react';
import {BGS_DARK} from '../../../.storybook/custom-backgrounds.js';
import {TriangleDropdown} from '../../../src/index.js';

/**
 * @description A bottom spacing triangle dropdown demo.
 * @returns {Object<string,*>} React component.
 */
function BottomSpacingTriangleDropdown() {
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
            <TriangleDropdown
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

export {BottomSpacingTriangleDropdown};

export default {
    title: 'Triangle Dropdown',
    parameters: {
        backgrounds: BGS_DARK
    }
};
