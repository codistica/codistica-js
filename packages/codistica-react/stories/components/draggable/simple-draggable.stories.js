/** @flow */

import React from 'react';
import {BGS_LIGHT} from '../../../.storybook/custom-backgrounds.js';
import {Draggable} from '../../../src/index.js';

/**
 * @description A draggable demo.
 * @returns {Object<string,*>} React component.
 */
function SimpleDraggable() {
    return (
        <div
            style={{
                position: 'relative',
                height: '500px',
                width: '500px',
                border: '1px solid #000000'
            }}>
            <Draggable
                style={{
                    height: '50px',
                    width: '50px',
                    backgroundColor: '#000000'
                }}
            />
        </div>
    );
}

export {SimpleDraggable};

export default {
    title: 'Draggable',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
