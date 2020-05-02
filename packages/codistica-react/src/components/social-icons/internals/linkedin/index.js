/** @flow */

/** @module react/components/social-icons/linkedin */

import React from 'react';
import {HoverIcon} from '../../../hover-icon/index.js';
import linkedinColorIcon from './img/socials-linkedin-color.svg';
import linkedinGrayIcon from './img/socials-linkedin-gray.svg';

type Props = {
    height: string | number,
    width: string | number,
    href: ?string,
    style: {[string]: any}
};

Linkedin.defaultProps = {
    height: undefined,
    width: undefined,
    href: null,
    style: {}
};

/**
 * @typedef linkedinPropsType
 * @property {string} [height=40] - Icon height.
 * @property {string} [width='auto'] - Icon width.
 * @property {(string|null)} [href=null] - Social media link.
 * @property {Object<string,*>} [style={}] - React prop.
 */

/**
 * @description Linkedin icon component.
 * @param {linkedinPropsType} props - Props.
 * @returns {Object<string,*>} Component.
 */
function Linkedin(props: Props) {
    const {height, width, href, style, ...others} = props;
    const sizeStyle =
        !height && !width
            ? {
                  height: 40,
                  width: 'auto'
              }
            : {
                  height: height ? height : 'auto',
                  width: width ? width : 'auto'
              };
    return (
        <HoverIcon
            {...others}
            style={{...sizeStyle, ...(style: any)}}
            onHoverImg={linkedinColorIcon}
            defaultImg={linkedinGrayIcon}
            href={href}
        />
    );
}

export {Linkedin};
