/** @flow */

/** @module react/components/icons/facebook */

import React from 'react';
import {HoverIcon} from '../../../hover-icon/index.js';
import facebookColorIcon from './img/socials-facebook-color.svg';
import facebookGrayIcon from './img/socials-facebook-gray.svg';

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

Facebook.defaultProps = {
    height: undefined,
    width: undefined,
    href: null,
    customStyles: {},
    customClassNames: {}
};

/**
 * @typedef facebookPropsType
 * @property {string} [height=40] - Icon height.
 * @property {string} [width='auto'] - Icon width.
 * @property {(string|null)} [href=null] - Social media link.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 */

/**
 * @description Facebook icon component.
 * @param {facebookPropsType} props - Props.
 * @returns {Object<string,*>} Component.
 */
function Facebook(props: Props) {
    const {height, width, href, customStyles, customClassNames} = props;
    return (
        <HoverIcon
            onHoverImg={facebookColorIcon}
            defaultImg={facebookGrayIcon}
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

export {Facebook};
