/** @flow */

import React, {useRef} from 'react';
import {
    Button,
    createSophistication,
    TrackSlide
} from '../../../../src/index.js';

const useSophistication = createSophistication({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    slideItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    button: {
        width: 300,
        margin: 10
    }
});

function Responsive() {
    const controlsRef = useRef(null);

    const jssClassNames = useSophistication();

    return (
        <div className={jssClassNames.root}>
            <TrackSlide
                direction={'column'}
                dimensions={{
                    height: '40vh',
                    width: '60vw'
                }}
                customStyles={{
                    root: {
                        marginBottom: '50px'
                    }
                }}
                onMount={(controls) => {
                    controlsRef.current = controls;
                }}>
                {['#f2a6aa', '#a2c1cc', '#32a6aa', '#12aa21'].map(
                    (color, index) => (
                        <span
                            key={index}
                            style={{backgroundColor: color}}
                            className={jssClassNames.slideItem}>
                            {index}
                        </span>
                    )
                )}
            </TrackSlide>
            <Button
                title={'PREVIOUS'}
                onClick={() => {
                    if (controlsRef.current) {
                        controlsRef.current.previous();
                    }
                }}
                className={jssClassNames.button}
            />
            <Button
                title={'NEXT'}
                onClick={() => {
                    if (controlsRef.current) {
                        controlsRef.current.next();
                    }
                }}
                className={jssClassNames.button}
            />
        </div>
    );
}

export {Responsive};
