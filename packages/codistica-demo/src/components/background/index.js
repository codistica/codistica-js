/** @flow */

import React, {useContext} from 'react';
import {useTransition, animated} from 'react-spring';
import {BackgroundContext} from '../../contexts/background-context.js';
import {ImageBackground} from '../image-background/index.js';
import {VideoBackground} from '../video-background/index.js';
import componentClassNames from './index.module.scss';

/**
 * @description Background component.
 * @returns {Object<string,*>} React component.
 */
function Background() {
    const backgroundContext = useContext(BackgroundContext);

    const transitions = useTransition(
        backgroundContext.imgSrc || backgroundContext.movSrc,
        null,
        {
            from: {opacity: 0},
            enter: {opacity: 1},
            leave: {opacity: 0},
            config: {duration: 1000}
        }
    );

    return (
        <div className={componentClassNames.root}>
            <div
                className={componentClassNames.opacityLayer}
                style={{opacity: backgroundContext.opacity}}
            />
            {transitions.map((transition) => {
                return (
                    <animated.div
                        key={transition.key}
                        className={componentClassNames.bgContainer}
                        style={{
                            opacity: transition.props.opacity
                        }}>
                        {backgroundContext.movSrc ? (
                            <VideoBackground src={transition.item} />
                        ) : (
                            <ImageBackground src={transition.item} />
                        )}
                    </animated.div>
                );
            })}
        </div>
    );
}

export {Background};
