/** @flow */

import React, {useState} from 'react';
import {BGS_LIGHT} from '../../../../.storybook/custom-backgrounds.js';
import {Button, Slide} from '../../../../src/index.js';
import styles from './index.module.scss';

/**
 * @description A viewport responsive slide demo.
 * @returns {React.Component} React component.
 */
function ViewportResponsiveSlide() {
    const [slideAPI, setSlideAPI] = useState({
        switchBy: null,
        switchTo: null
    });

    return (
        <div className={styles.container}>
            <Slide
                masterStyle={{
                    height: '10vh',
                    width: '15vw',
                    marginBottom: '50px'
                }}
                responsive={true}
                direction={'column'}
                onAPI={(API) => {
                    setSlideAPI(API);
                }}>
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
            <Button
                className={styles.button}
                onClick={() => {
                    slideAPI.switchBy && slideAPI.switchBy(-1);
                }}
                text={'PREVIOUS'}
            />
            <Button
                className={styles.button}
                onClick={() => {
                    slideAPI.switchBy && slideAPI.switchBy(1);
                }}
                text={'NEXT'}
            />
        </div>
    );
}

export {ViewportResponsiveSlide};

export default {
    title: 'Slide',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
