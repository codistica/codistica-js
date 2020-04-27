/** @flow */

/** @module react/components/social-icons/youtube */

import React from 'react';
import {HoverIcon} from '../../../hover-icon/index.js';
import youtubeColorIcon from './img/socials-youtube-color.svg';
import youtubeGrayIcon from './img/socials-youtube-gray.svg';

type Props = {
    height: string | number,
    width: string | number,
    href: ?string,
    style: Object
};

Youtube.defaultProps = {
    height: 40,
    width: 'auto',
    href: null,
    style: {}
};

/**
 * @typedef youtubePropsType
 * @property {string} [height=40] - Icon height.
 * @property {string} [width='auto'] - Icon width.
 * @property {(string|null)} [href=null] - Social media link.
 * @property {Object} [style={}] - Style object.
 */

/**
 * @description Youtube icon component.
 * @param {youtubePropsType} props - Props.
 * @returns {React.Component} Component.
 */
function Youtube(props: Props) {
    const {height, width, href, style, ...others} = props;
    return (
        <HoverIcon
            {...others}
            style={{height, width, ...style}}
            onHoverImg={youtubeColorIcon}
            defaultImg={youtubeGrayIcon}
            href={href}
        />
    );
}

export {Youtube};
