/** @flow */

import React, {useState} from 'react';
import {Draggable, createSophistication} from '../../../../src/index.js';

const useSophistication = createSophistication({
    root: {
        display: 'inline-flex',
        flexDirection: 'column'
    },
    buttons: {
        display: 'flex',
        '& button': {
            margin: '10px 0'
        },
        '& div': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-star',
            margin: 40
        }
    }
});

function Demo() {
    const [boundary, setBoundary] = useState('parent');
    const [momentum, setMomentum] = useState(true);
    const [grabThreshold, setGrabThreshold] = useState(0);
    const jssClassNames = useSophistication();
    return (
        <div className={jssClassNames.root}>
            <div
                style={{
                    position: 'relative',
                    height: '500px',
                    width: '500px',
                    border: '1px solid #000000'
                }}>
                <Draggable
                    momentum={momentum}
                    boundary={boundary}
                    grabThreshold={grabThreshold}
                    customStyles={{
                        root: {
                            height: '50px',
                            width: '50px',
                            backgroundColor: '#ff0000',
                            border: '1px solid #00ffff'
                        }
                    }}
                />
            </div>
            <div className={jssClassNames.buttons}>
                <div>
                    <button onClick={() => setBoundary('none')}>
                        {'Boundary: none'}
                    </button>
                    <button onClick={() => setBoundary('viewport')}>
                        {'Boundary: viewport'}
                    </button>
                    <button onClick={() => setBoundary('parent')}>
                        {'Boundary: parent'}
                    </button>
                    <button
                        onClick={() =>
                            setBoundary(
                                document.getElementsByTagName('body')[0]
                            )
                        }>
                        {'Boundary: <body>'}
                    </button>
                </div>
                <div>
                    <button
                        onClick={() =>
                            setMomentum((prevMomentum) => !prevMomentum)
                        }>
                        {'Toggle Momentum'}
                    </button>
                    <button
                        onClick={() =>
                            setGrabThreshold((prevGrabThreshold) =>
                                prevGrabThreshold ? 0 : 100
                            )
                        }>
                        {'Toggle Grab Threshold'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export {Demo};
