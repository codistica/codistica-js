/** @flow */

/** @module react/components/social-icons/instagram */

import React from 'react';
import {HoverIcon} from '../../../hover-icon/index.js';
import instagramColorIcon from './img/socials-instagram-color.svg';
import instagramGrayIcon from './img/socials-instagram-gray.svg';

type Props = {
    height: string | number,
    width: string | number,
    href: ?string,
    style: {[string]: any}
};

Instagram.defaultProps = {
    height: undefined,
    width: undefined,
    href: null,
    style: {}
};

/**
 * @typedef instagramPropsType
 * @property {string} [height=40] - Icon height.
 * @property {string} [width='auto'] - Icon width.
 * @property {(string|null)} [href=null] - Social media link.
 * @property {Object<string,*>} [style={}] - React prop.
 */

/**
 * @description Instagram icon component.
 * @param {instagramPropsType} props - Props.
 * @returns {Object<string,*>} Component.
 */
function Instagram(props: Props) {
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
            onHoverImg={instagramColorIcon}
            defaultImg={instagramGrayIcon}
            href={href}
        />
    );
}

export {Instagram};
