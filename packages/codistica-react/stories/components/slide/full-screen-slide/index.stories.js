/** @flow */

import React, {useState} from 'react';
import {BGS_LIGHT} from '../../../../.storybook/custom-backgrounds.js';
import {DotNavigation, Slide} from '../../../../src/index.js';
import classNames from './index.module.scss';

/**
 * @description A full screen slide demo.
 * @returns {Object<string,*>} React component.
 */
function FullScreenSlide() {
    const [slideControls, setSlideControls] = useState({
        switchBy: null,
        switchTo: null
    });

    const [dotIndex, setDotIndex] = useState(0);

    return (
        <div className={classNames.root}>
            <Slide
                responsive={true}
                direction={'column'}
                onMount={(controls) => {
                    setSlideControls(controls);
                }}
                onPositionChange={setDotIndex}
                customStyles={{
                    root: {height: '100vh', width: '100vw'}
                }}>
                {['#f2a6aa', '#a2c1cc', '#32a6aa', '#12aa21'].map(
                    (color, index) => (
                        <span
                            key={index}
                            style={{backgroundColor: color}}
                            className={classNames.slideItem}>
                            {index}
                        </span>
                    )
                )}
            </Slide>
            <DotNavigation
                quantity={4}
                direction={'column'}
                onSwitch={slideControls.switchTo}
                dotIndex={dotIndex}
                auto={false}
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

export {FullScreenSlide};

export default {
    title: 'Slide',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
