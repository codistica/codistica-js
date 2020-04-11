/** @flow */

import React, {useState} from 'react';
import {DotNavigation} from '../../../../src/components/dot-navigation/index.js';
import {Slide} from '../../../../src/components/slide/index.js';
import Styles from './index.module.scss';

/**
 * @description Slide full screen demo.
 * @returns {Object<string,*>} React component.
 */
function SlideDemoFullScreen() {
    const [slideAPI, setSlideAPI] = useState({
        switchBy: null,
        switchTo: null
    });

    const [dotIndex, setDotIndex] = useState(0);

    return (
        <div className={Styles.container}>
            <Slide
                masterStyle={{height: '100vh', width: '100vw'}}
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
                            className={Styles.slideItem}
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

export {SlideDemoFullScreen};
