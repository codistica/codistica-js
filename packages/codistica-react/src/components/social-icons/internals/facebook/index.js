/** @flow */

/** @module react/components/social-icons/facebook */

import React from 'react';
import {HoverIcon} from '../../../hover-icon/index.js';
import facebookColorIcon from './img/socials-facebook-color.svg';
import facebookGrayIcon from './img/socials-facebook-gray.svg';

type Props = {
    height: string | number,
    width: string | number,
    href: ?string,
    style: {[string]: any}
};

Facebook.defaultProps = {
    height: undefined,
    width: undefined,
    href: null,
    style: {}
};

/**
 * @typedef facebookPropsType
 * @property {string} [height=40] - Icon height.
 * @property {string} [width='auto'] - Icon width.
 * @property {(string|null)} [href=null] - Social media link.
 * @property {Object<string,*>} [style={}] - React prop.
 */

/**
 * @description Facebook icon component.
 * @param {facebookPropsType} props - Props.
 * @returns {Object<string,*>} Component.
 */
function Facebook(props: Props) {
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
            onHoverImg={facebookColorIcon}
            defaultImg={facebookGrayIcon}
            href={href}
        />
    );
}

export {Facebook};
