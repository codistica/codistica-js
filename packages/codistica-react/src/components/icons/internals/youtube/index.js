/** @flow */

/** @module react/components/icons/youtube */

import React from 'react';
import type {Node} from 'react';
import resetClassNames from '../../../../css/reset.module.scss';
import {mergeClassNames} from '../../../../modules/merge-class-names.js';
import {mergeStyles} from '../../../../modules/merge-styles.js';
import {HoverIcon} from '../../../hover-icon/index.js';
import youtubeColorIcon from './img/socials-youtube-color.svg';
import youtubeGrayIcon from './img/socials-youtube-gray.svg';

type Props = {
    height: string | number,
    width: string | number,
    href: string,
    style: {[string]: any},
    className: string,
    customStyles: {
        root?: {[string]: any}
    },
    customClassNames: {
        root?: string
    },
    globalTheme: 'default' | string | null
};

type GlobalStyles = {
    [string]: {
        root: {[string]: any}
    }
};

type GlobalClassNames = {
    [string]: {
        root: string
    }
};

type CallableObj = {
    (props: Props): Node,
    globalStyles: GlobalStyles,
    globalClassNames: GlobalClassNames,
    defaultProps: {[string]: any}
};

/**
 * @typedef youtubePropsType
 * @property {string} [height=40] - Icon height.
 * @property {string} [width='auto'] - Icon width.
 * @property {(string|null)} [href=null] - Social media link.
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {string} [className=''] - React prop.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 * @property {('default'|string|null)} [globalTheme='default'] - Global theme to be used.
 */

/**
 * @description Youtube icon component.
 * @param {youtubePropsType} props - Props.
 * @returns {Object<string,*>} React component.
 */
const Youtube: CallableObj = function Youtube(props: Props) {
    const {
        height,
        width,
        href,
        style,
        className,
        customStyles,
        customClassNames,
        globalTheme
    } = props;

    const globalStyles = globalTheme
        ? Youtube.globalStyles[globalTheme] || {}
        : {};

    const globalClassNames = globalTheme
        ? Youtube.globalClassNames[globalTheme] || {}
        : {};

    const mergedStyles = {
        root: mergeStyles(globalStyles.root, customStyles.root, style)
    };

    const mergedClassNames = {
        root: mergeClassNames(
            resetClassNames.root,
            globalClassNames.root,
            customClassNames.root,
            className
        )
    };

    return (
        <HoverIcon
            onHoverImg={youtubeColorIcon}
            defaultImg={youtubeGrayIcon}
            href={href}
            customStyles={{
                root: mergedStyles.root,
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
                root: mergedClassNames.root
            }}
        />
    );
};

Youtube.globalStyles = {
    default: {
        root: {}
    }
};

Youtube.globalClassNames = {
    default: {
        root: ''
    }
};

Youtube.defaultProps = {
    height: undefined,
    width: undefined,
    href: null,
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    globalTheme: 'default'
};

export {Youtube};
