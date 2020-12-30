/** @flow */

import React, {useState, useRef} from 'react';
import {
    DotNavigation,
    FullScreenSlide,
    createSophistication
} from '../../../../src/index.js';

const useSophistication = createSophistication({
    slideItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    }
});

function FullScreenColumn() {
    const [dotIndex, setDotIndex] = useState(0);
    const controlsRef = useRef(null);

    const jssClassNames = useSophistication();

    const dotNavigation = (
        <DotNavigation
            quantity={4}
            direction={'column'}
            dotIndex={dotIndex}
            auto={false}
            onSwitch={(val) =>
                controlsRef.current && controlsRef.current.goTo(val)
            }
            customStyles={{
                root: {
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10
                }
            }}
        />
    );

    return (
        <FullScreenSlide
            direction={'column'}
            onNewPosition={setDotIndex}
            onMount={(controls) => {
                controlsRef.current = controls;
            }}
            elements={dotNavigation}>
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
        </FullScreenSlide>
    );
}

export {FullScreenColumn};
