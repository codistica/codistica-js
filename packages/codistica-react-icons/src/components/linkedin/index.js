/** @flow */

/** @module react-icons/components/linkedin */

import React from 'react';
import {Icon} from '../../utils/icon.js';
import type {ExternalProps} from '../../utils/icon.js';
import linkedinColorIcon from './img/socials-linkedin-color.svg';
import linkedinGrayIcon from './img/socials-linkedin-gray.svg';

/**
 * @typedef linkedinPropsType
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
 * @description Linkedin icon component.
 * @param {linkedinPropsType} props - Props.
 * @returns {Object<string,*>} React component.
 */
function Linkedin(props: ExternalProps) {
    return (
        <Icon
            {...props}
            defaultImg={linkedinGrayIcon}
            onHoverImg={linkedinColorIcon}
        />
    );
}

export {Linkedin};
