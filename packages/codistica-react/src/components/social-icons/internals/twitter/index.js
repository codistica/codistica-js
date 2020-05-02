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
    style: {[string]: any}
};

Twitter.defaultProps = {
    height: undefined,
    width: undefined,
    href: null,
    style: {}
};

/**
 * @typedef twitterPropsType
 * @property {string} [height=40] - Icon height.
 * @property {string} [width='auto'] - Icon width.
 * @property {(string|null)} [href=null] - Social media link.
 * @property {Object<string,*>} [style={}] - React prop.
 */

/**
 * @description Twitter icon component.
 * @param {twitterPropsType} props - Props.
 * @returns {Object<string,*>} Component.
 */
function Twitter(props: Props) {
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
            onHoverImg={twitterColorIcon}
            defaultImg={twitterGrayIcon}
            href={href}
        />
    );
}

export {Twitter};
