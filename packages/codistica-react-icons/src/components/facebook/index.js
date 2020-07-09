/** @flow */

/** @module react-icons/components/facebook */

import React from 'react';
import {Icon} from '../../utils/icon.js';
import type {ExternalProps} from '../../utils/icon.js';
import facebookColorIcon from './img/socials-facebook-color.svg';
import facebookGrayIcon from './img/socials-facebook-gray.svg';

/**
 * @typedef facebookPropsType
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
 * @description Facebook icon component.
 * @param {facebookPropsType} props - Props.
 * @returns {Object<string,*>} React component.
 */
function Facebook(props: ExternalProps) {
    return (
        <Icon
            {...props}
            defaultImg={facebookGrayIcon}
            onHoverImg={facebookColorIcon}
        />
    );
}

export {Facebook};
