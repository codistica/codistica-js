/** @flow */

/** @module react/components/icons/linkedin */

import React from 'react';
import {HoverIcon} from '../../../hover-icon/index.js';
import linkedinColorIcon from './img/socials-linkedin-color.svg';
import linkedinGrayIcon from './img/socials-linkedin-gray.svg';

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

Linkedin.defaultProps = {
    height: undefined,
    width: undefined,
    href: null,
    customStyles: {},
    customClassNames: {}
};

/**
 * @typedef linkedinPropsType
 * @property {string} [height=40] - Icon height.
 * @property {string} [width='auto'] - Icon width.
 * @property {(string|null)} [href=null] - Social media link.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 */

/**
 * @description Linkedin icon component.
 * @param {linkedinPropsType} props - Props.
 * @returns {Object<string,*>} Component.
 */
function Linkedin(props: Props) {
    const {height, width, href, customStyles, customClassNames} = props;
    return (
        <HoverIcon
            onHoverImg={linkedinColorIcon}
            defaultImg={linkedinGrayIcon}
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

export {Linkedin};
