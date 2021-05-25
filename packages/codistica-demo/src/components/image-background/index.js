/** @flow */

import {mergeClassNames, mergeStyles} from '@codistica/react';
import React from 'react';
import componentClassNames from './index.module.scss';

type Props = {
    src: string,
    style: {[string]: any},
    className: string
};

/**
 * @typedef imageBackgroundProps
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {string} [className=''] - React prop.
 */

/**
 * @description Image background component.
 * @param {imageBackgroundProps} props - React props.
 * @returns {Object<string,*>} React component.
 */
function ImageBackground(props: Props) {
    const {src, style, className} = props;
    return (
        <div
            style={mergeStyles(style, {
                backgroundImage: `url(${src})`
            })}
            className={mergeClassNames(componentClassNames.root, className)}
        />
    );
}

ImageBackground.defaultProps = {
    style: {},
    className: ''
};

export {ImageBackground};
