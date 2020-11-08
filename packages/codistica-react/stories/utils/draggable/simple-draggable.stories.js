/** @flow */

import React from 'react';
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
                customStyles={{
                    root: {
                        height: '50px',
                        width: '50px',
                        backgroundColor: '#000000'
                    }
                }}
            />
        </div>
    );
}

const meta = {
    title: 'Draggable'
};

export {SimpleDraggable};
export default meta;
