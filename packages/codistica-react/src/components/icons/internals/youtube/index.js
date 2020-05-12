/** @flow */

/** @module react/components/icons/youtube */

import React from 'react';
import {HoverIcon} from '../../../hover-icon/index.js';
import youtubeColorIcon from './img/socials-youtube-color.svg';
import youtubeGrayIcon from './img/socials-youtube-gray.svg';

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

Youtube.defaultProps = {
    height: undefined,
    width: undefined,
    href: null,
    customStyles: {},
    customClassNames: {}
};

/**
 * @typedef youtubePropsType
 * @property {string} [height=40] - Icon height.
 * @property {string} [width='auto'] - Icon width.
 * @property {(string|null)} [href=null] - Social media link.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 */

/**
 * @description Youtube icon component.
 * @param {youtubePropsType} props - Props.
 * @returns {Object<string,*>} Component.
 */
function Youtube(props: Props) {
    const {height, width, href, customStyles, customClassNames} = props;
    return (
        <HoverIcon
            onHoverImg={youtubeColorIcon}
            defaultImg={youtubeGrayIcon}
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

export {Youtube};
