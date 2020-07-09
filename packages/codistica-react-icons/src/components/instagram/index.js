/** @flow */

/** @module react-icons/components/instagram */

import React from 'react';
import {Icon} from '../../utils/icon.js';
import type {ExternalProps} from '../../utils/icon.js';
import instagramColorIcon from './img/socials-instagram-color.svg';
import instagramGrayIcon from './img/socials-instagram-gray.svg';

/**
 * @typedef instagramPropsType
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
 * @description Instagram icon component.
 * @param {instagramPropsType} props - Props.
 * @returns {Object<string,*>} React component.
 */
function Instagram(props: ExternalProps) {
    return (
        <Icon
            {...props}
            defaultImg={instagramGrayIcon}
            onHoverImg={instagramColorIcon}
        />
    );
}

export {Instagram};
