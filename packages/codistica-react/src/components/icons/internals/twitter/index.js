/** @flow */

/** @module react/components/icons/twitter */

import React from 'react';
import {HoverIcon} from '../../../hover-icon/index.js';
import twitterColorIcon from './img/socials-twitter-color.svg';
import twitterGrayIcon from './img/socials-twitter-gray.svg';

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

Twitter.defaultProps = {
    height: undefined,
    width: undefined,
    href: null,
    customStyles: {},
    customClassNames: {}
};

/**
 * @typedef twitterPropsType
 * @property {string} [height=40] - Icon height.
 * @property {string} [width='auto'] - Icon width.
 * @property {(string|null)} [href=null] - Social media link.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 */

/**
 * @description Twitter icon component.
 * @param {twitterPropsType} props - Props.
 * @returns {Object<string,*>} Component.
 */
function Twitter(props: Props) {
    const {height, width, href, customStyles, customClassNames} = props;
    return (
        <HoverIcon
            onHoverImg={twitterColorIcon}
            defaultImg={twitterGrayIcon}
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

export {Twitter};
