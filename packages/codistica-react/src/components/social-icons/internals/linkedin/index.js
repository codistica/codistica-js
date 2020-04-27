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
    style: Object
};

Linkedin.defaultProps = {
    height: 40,
    width: 'auto',
    href: null,
    style: {}
};

/**
 * @typedef linkedinPropsType
 * @property {string} [height=40] - Icon height.
 * @property {string} [width='auto'] - Icon width.
 * @property {(string|null)} [href=null] - Social media link.
 * @property {Object} [style={}] - Style object.
 */

/**
 * @description Linkedin icon component.
 * @param {linkedinPropsType} props - Props.
 * @returns {React.Component} Component.
 */
function Linkedin(props: Props) {
    const {height, width, href, style, ...others} = props;
    return (
        <HoverIcon
            {...others}
            style={{height, width, ...style}}
            onHoverImg={linkedinColorIcon}
            defaultImg={linkedinGrayIcon}
            href={href}
        />
    );
}

export {Linkedin};
