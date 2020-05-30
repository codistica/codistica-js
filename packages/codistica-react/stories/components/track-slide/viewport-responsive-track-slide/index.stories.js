/** @flow */

import React, {useRef} from 'react';
import {BGS_LIGHT} from '../../../../.storybook/custom-backgrounds.js';
import {Button, TrackSlide} from '../../../../src/index.js';
import componentClassNames from './index.module.scss';

/**
 * @description A viewport responsive track slide demo.
 * @returns {Object<string,*>} React component.
 */
function ViewportResponsiveTrackSlide() {
    const controlsRef = useRef(null);

    return (
        <div className={componentClassNames.root}>
            <TrackSlide
                direction={'column'}
                dimensions={{
                    height: '10vh',
                    width: '15vw'
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
                            className={componentClassNames.slideItem}>
                            {index}
                        </span>
                    )
                )}
            </TrackSlide>
            <Button
                title={'PREVIOUS'}
                onClick={() => {
                    controlsRef.current && controlsRef.current.previous();
                }}
                className={componentClassNames.button}
            />
            <Button
                title={'NEXT'}
                onClick={() => {
                    controlsRef.current && controlsRef.current.next();
                }}
                className={componentClassNames.button}
            />
        </div>
    );
}

export {ViewportResponsiveTrackSlide};

export default {
    title: 'Track Slide',
    parameters: {
        backgrounds: BGS_LIGHT
    }
};
