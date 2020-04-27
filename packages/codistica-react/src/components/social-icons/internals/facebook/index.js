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
    style: Object
};

Facebook.defaultProps = {
    height: 40,
    width: 'auto',
    href: null,
    style: {}
};

/**
 * @typedef facebookPropsType
 * @property {string} [height=40] - Icon height.
 * @property {string} [width='auto'] - Icon width.
 * @property {(string|null)} [href=null] - Social media link.
 * @property {Object} [style={}] - Style object.
 */

/**
 * @description Facebook icon component.
 * @param {facebookPropsType} props - Props.
 * @returns {React.Component} Component.
 */
function Facebook(props: Props) {
    const {height, width, href, style, ...others} = props;
    return (
        <HoverIcon
            {...others}
            style={{height, width, ...style}}
            onHoverImg={facebookColorIcon}
            defaultImg={facebookGrayIcon}
            href={href}
        />
    );
}

export {Facebook};
