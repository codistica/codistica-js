/** @flow */

/** @module react/components/icons/instagram */

import React from 'react';
import {HoverIcon} from '../../../hover-icon/index.js';
import instagramColorIcon from './img/socials-instagram-color.svg';
import instagramGrayIcon from './img/socials-instagram-gray.svg';

type Props = {
    height: string | number,
    width: string | number,
    href: string,
    customStyles: {
        root?: {[string]: any}
    },
    customClassNames: {
        root?: string
    }
};

Instagram.defaultProps = {
    height: undefined,
    width: undefined,
    href: null,
    customStyles: {},
    customClassNames: {}
};

/**
 * @typedef instagramPropsType
 * @property {string} [height=40] - Icon height.
 * @property {string} [width='auto'] - Icon width.
 * @property {(string|null)} [href=null] - Social media link.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 */

/**
 * @description Instagram icon component.
 * @param {instagramPropsType} props - Props.
 * @returns {Object<string,*>} Component.
 */
function Instagram(props: Props) {
    const {height, width, href, customStyles, customClassNames} = props;
    return (
        <HoverIcon
            onHoverImg={instagramColorIcon}
            defaultImg={instagramGrayIcon}
            href={href}
            customStyles={{
                root: customStyles.root,
                img:
                    !height && !width
                        ? {
                              height: 40,
                              width: 'auto'
                          }
                        : {
                              height: height ? height : 'auto',
                              width: width ? width : 'auto'
                          }
            }}
            customClassNames={{
                root: customClassNames.root
            }}
        />
    );
}

export {Instagram};
