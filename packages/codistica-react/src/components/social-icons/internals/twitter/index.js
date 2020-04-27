/** @flow */

/** @module react/components/social-icons/twitter */

import React from 'react';
import {HoverIcon} from '../../../hover-icon/index.js';
import twitterColorIcon from './img/socials-twitter-color.svg';
import twitterGrayIcon from './img/socials-twitter-gray.svg';

type Props = {
    height: string | number,
    width: string | number,
    href: ?string,
    style: Object
};

Twitter.defaultProps = {
    height: 40,
    width: 'auto',
    href: null,
    style: {}
};

/**
 * @typedef twitterPropsType
 * @property {string} [height=40] - Icon height.
 * @property {string} [width='auto'] - Icon width.
 * @property {(string|null)} [href=null] - Social media link.
 * @property {Object} [style={}] - Style object.
 */

/**
 * @description Twitter icon component.
 * @param {twitterPropsType} props - Props.
 * @returns {React.Component} Component.
 */
function Twitter(props: Props) {
    const {height, width, href, style, ...others} = props;
    return (
        <HoverIcon
            {...others}
            style={{height, width, ...style}}
            onHoverImg={twitterColorIcon}
            defaultImg={twitterGrayIcon}
            href={href}
        />
    );
}

export {Twitter};
