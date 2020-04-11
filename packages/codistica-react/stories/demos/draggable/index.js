/** @flow */

import React from 'react';
import {Draggable} from '../../../src/components/draggable/index.js';

/**
 * @description Draggable demo.
 * @returns {Object<string,*>} React component.
 */
function DraggableDemo() {
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

export {DraggableDemo};
