/** @flow */

import React, {useState} from 'react';
import {BGS_LIGHT} from '../../../../.storybook/custom-backgrounds.js';
import {DotNavigation, Slide} from '../../../../src/index.js';
import styles from './index.module.scss';

/**
 * @description A full screen slide demo.
 * @returns {Object<string,*>} React component.
 */
function FullScreenSlide() {
    const [slideAPI, setSlideAPI] = useState({
        switchBy: null,
        switchTo: null
    });

    const [dotIndex, setDotIndex] = useState(0);

    return (
        <div className={styles.container}>
            <Slide
                rootStyle={{height: '100vh', width: '100vw'}}
                responsive={true}
                direction={'column'}
                onAPI={(API) => {
                    setSlideAPI(API);
                }}
                onPositionChange={setDotIndex}>
                {['#f2a6aa', '#a2c1cc', '#32a6aa', '#12aa21'].map(
                    (color, index) => (
                        <span
                            key={index}
                            className={styles.slideItem}
                            style={{backgroundColor: color}}>
                            {index}
                        </span>
                    )
                )}
            </Slide>
            <DotNavigation
                quantity={4}
                direction={'column'}
                style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                }}
                onSwitch={slideAPI.switchTo}
                dotIndex={dotIndex}
                auto={false}
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
