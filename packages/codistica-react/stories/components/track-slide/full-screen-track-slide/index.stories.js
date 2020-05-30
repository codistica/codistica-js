/** @flow */

import React, {useState, useRef} from 'react';
import {BGS_LIGHT} from '../../../../.storybook/custom-backgrounds.js';
import {DotNavigation, TrackSlide} from '../../../../src/index.js';
import componentClassNames from './index.module.scss';

// TODO: REMAKE! USE FullScreenSlide WHEN READY.

/**
 * @description A full screen track slide demo.
 * @returns {Object<string,*>} React component.
 */
function FullScreenTrackSlide() {
    const [dotIndex, setDotIndex] = useState(0);
    const controlsRef = useRef(null);

    return (
        <div className={componentClassNames.root}>
            <TrackSlide
                direction={'column'}
                dimensions={{height: '100vh', width: '100vw'}}
                onNewPosition={setDotIndex}
                onMount={(controls) => {
                    controlsRef.current = controls;
                }}>
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
            </TrackSlide>
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
        </div>
    );
}

export {FullScreenTrackSlide};

export default {
    title: 'Track Slide',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
