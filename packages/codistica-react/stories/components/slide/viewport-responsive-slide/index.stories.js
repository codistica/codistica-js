/** @flow */

import React, {useState} from 'react';
import {BGS_LIGHT} from '../../../../.storybook/custom-backgrounds.js';
import {Button, Slide} from '../../../../src/index.js';
import componentClassNames from './index.module.scss';

/**
 * @description A viewport responsive slide demo.
 * @returns {Object<string,*>} React component.
 */
function ViewportResponsiveSlide() {
    const [slideControls, setSlideControls] = useState({
        switchBy: null,
        switchTo: null
    });

    return (
        <div className={componentClassNames.root}>
            <Slide
                responsive={true}
                direction={'column'}
                onMount={(controls) => {
                    setSlideControls(controls);
                }}
                customStyles={{
                    root: {
                        height: '10vh',
                        width: '15vw',
                        marginBottom: '50px'
                    }
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
            </Slide>
            <Button
                title={'PREVIOUS'}
                onClick={() => {
                    slideControls.switchBy && slideControls.switchBy(-1);
                }}
                className={componentClassNames.button}
            />
            <Button
                title={'NEXT'}
                onClick={() => {
                    slideControls.switchBy && slideControls.switchBy(1);
                }}
                className={componentClassNames.button}
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
