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
    style: Object
};

Instagram.defaultProps = {
    height: 40,
    width: 'auto',
    href: null,
    style: {}
};

/**
 * @typedef instagramPropsType
 * @property {string} [height=40] - Icon height.
 * @property {string} [width='auto'] - Icon width.
 * @property {(string|null)} [href=null] - Social media link.
 * @property {Object} [style={}] - Style object.
 */

/**
 * @description Instagram icon component.
 * @param {instagramPropsType} props - Props.
 * @returns {React.Component} Component.
 */
function Instagram(props: Props) {
    const {height, width, href, style, ...others} = props;
    return (
        <HoverIcon
            {...others}
            style={{height, width, ...style}}
            onHoverImg={instagramColorIcon}
            defaultImg={instagramGrayIcon}
            href={href}
        />
    );
}

export {Instagram};
