/** @flow */

/** @module react-icons/components/youtube */

import React from 'react';
import {Icon} from '../../utils/icon.js';
import type {ExternalProps} from '../../utils/icon.js';
import youtubeColorIcon from './img/socials-youtube-color.svg';
import youtubeGrayIcon from './img/socials-youtube-gray.svg';

/**
 * @typedef youtubePropsType
 * @property {string} [height=40] - Icon height.
 * @property {string} [width='auto'] - Icon width.
 * @property {(string|null)} [href=null] - Social media link.
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {string} [className=''] - React prop.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 * @property {('default'|string|null)} [globalTheme='default'] - Global theme to be used.
 */

/**
 * @description Youtube icon component.
 * @param {youtubePropsType} props - Props.
 * @returns {Object<string,*>} React component.
 */
function Youtube(props: ExternalProps) {
    return (
        <Icon
            {...props}
            defaultImg={youtubeGrayIcon}
            onHoverImg={youtubeColorIcon}
        />
    );
}

export {Youtube};
