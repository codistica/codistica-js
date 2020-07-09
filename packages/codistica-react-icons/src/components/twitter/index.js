/** @flow */

/** @module react-icons/components/twitter */

import React from 'react';
import {Icon} from '../../utils/icon.js';
import type {ExternalProps} from '../../utils/icon.js';
import twitterColorIcon from './img/socials-twitter-color.svg';
import twitterGrayIcon from './img/socials-twitter-gray.svg';

/**
 * @typedef twitterPropsType
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
 * @description Twitter icon component.
 * @param {twitterPropsType} props - Props.
 * @returns {Object<string,*>} React component.
 */
function Twitter(props: ExternalProps) {
    return (
        <Icon
            {...props}
            defaultImg={twitterGrayIcon}
            onHoverImg={twitterColorIcon}
        />
    );
}

export {Twitter};
