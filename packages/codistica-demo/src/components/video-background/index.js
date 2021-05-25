/** @flow */

import {mergeClassNames} from '@codistica/react';
import React from 'react';
import componentClassNames from './index.module.scss';

type Props = {
    src: string,
    type: string,
    loop: boolean,
    style: {[string]: any},
    className: string
};

/**
 * @typedef videoBackgroundProps
 * @property {string} src - Video source.
 * @property {string} [type='video/mp4'] - MIME type.
 * @property {boolean} [loop=true] - Should video play in loop.
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {string} [className=''] - React prop.
 */

/**
 * @description Image background component.
 * @param {videoBackgroundProps} props - React props.
 * @returns {Object<string,*>} React component.
 */
function VideoBackground(props: Props) {
    const {src, type, loop, style, className} = props;
    return (
        <div className={mergeClassNames(componentClassNames.root, className)}>
            <video
                muted={true}
                autoPlay={'autoplay'}
                loop={loop}
                onCanPlayThrough={onCanPlayThroughHandler}
                style={style}
                className={componentClassNames.video}>
                <source src={src} type={type} />
            </video>
        </div>
    );

    /**
     * @description Callback for canPlayThrough event.
     * @returns {void} Void.
     */
    function onCanPlayThroughHandler() {
        console.log('CAN PLAY THROUGH!');
    }
}

VideoBackground.defaultProps = {
    type: 'video/mp4',
    loop: true,
    style: {},
    className: ''
};

export {VideoBackground};
