/** @flow */

import React, {useState, useRef} from 'react';
import {DotNavigation, FullScreenSlide} from '../../../../src/index.js';
import componentClassNames from './index.module.scss';

/**
 * @description A full screen slide column demo.
 * @returns {Object<string,*>} React component.
 */
function FullScreenSlideColumn() {
    const [dotIndex, setDotIndex] = useState(0);
    const controlsRef = useRef(null);

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
                    transform: 'translateY(-50%)'
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
                        className={componentClassNames.slideItem}>
                        {index}
                    </span>
                )
            )}
        </FullScreenSlide>
    );
}

export {FullScreenSlideColumn};

export default {
    title: 'Full Screen Slide'
};
