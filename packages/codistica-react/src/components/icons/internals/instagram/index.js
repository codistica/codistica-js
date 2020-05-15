/** @flow */

/** @module react/components/icons/instagram */

import React from 'react';
import type {Node} from 'react';
import resetClassNames from '../../../../css/reset.module.scss';
import {mergeClassNames} from '../../../../modules/merge-class-names.js';
import {mergeStyles} from '../../../../modules/merge-styles.js';
import {HoverIcon} from '../../../hover-icon/index.js';
import instagramColorIcon from './img/socials-instagram-color.svg';
import instagramGrayIcon from './img/socials-instagram-gray.svg';

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
 * @typedef instagramPropsType
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
 * @description Instagram icon component.
 * @param {instagramPropsType} props - Props.
 * @returns {Object<string,*>} Component.
 */
const Instagram: CallableObj = function Instagram(props: Props) {
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
        ? Instagram.globalStyles[globalTheme] || {}
        : {};

    const globalClassNames = globalTheme
        ? Instagram.globalClassNames[globalTheme] || {}
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
            onHoverImg={instagramColorIcon}
            defaultImg={instagramGrayIcon}
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

Instagram.globalStyles = {
    default: {
        root: {}
    }
};

Instagram.globalClassNames = {
    default: {
        root: ''
    }
};

Instagram.defaultProps = {
    height: undefined,
    width: undefined,
    href: null,
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    globalTheme: 'default'
};

export {Instagram};
