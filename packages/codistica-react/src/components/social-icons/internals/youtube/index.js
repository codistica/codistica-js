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
    style: {[string]: any}
};

Youtube.defaultProps = {
    height: undefined,
    width: undefined,
    href: null,
    style: {}
};

/**
 * @typedef youtubePropsType
 * @property {string} [height=40] - Icon height.
 * @property {string} [width='auto'] - Icon width.
 * @property {(string|null)} [href=null] - Social media link.
 * @property {Object<string,*>} [style={}] - React prop.
 */

/**
 * @description Youtube icon component.
 * @param {youtubePropsType} props - Props.
 * @returns {Object<string,*>} Component.
 */
function Youtube(props: Props) {
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
            onHoverImg={youtubeColorIcon}
            defaultImg={youtubeGrayIcon}
            href={href}
        />
    );
}

export {Youtube};
