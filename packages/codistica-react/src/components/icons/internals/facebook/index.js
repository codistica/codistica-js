/** @flow */

/** @module react/components/icons/facebook */

import React from 'react';
import type {Node} from 'react';
import resetClassNames from '../../../../css/reset.module.scss';
import {mergeClassNames} from '../../../../modules/merge-class-names.js';
import {mergeStyles} from '../../../../modules/merge-styles.js';
import {HoverIcon} from '../../../hover-icon/index.js';
import facebookColorIcon from './img/socials-facebook-color.svg';
import facebookGrayIcon from './img/socials-facebook-gray.svg';

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
 * @typedef facebookPropsType
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
 * @description Facebook icon component.
 * @param {facebookPropsType} props - Props.
 * @returns {Object<string,*>} Component.
 */
const Facebook: CallableObj = function Facebook(props: Props) {
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
        ? Facebook.globalStyles[globalTheme] || {}
        : {};

    const globalClassNames = globalTheme
        ? Facebook.globalClassNames[globalTheme] || {}
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
            onHoverImg={facebookColorIcon}
            defaultImg={facebookGrayIcon}
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

Facebook.globalStyles = {
    default: {
        root: {}
    }
};

Facebook.globalClassNames = {
    default: {
        root: ''
    }
};

Facebook.defaultProps = {
    height: undefined,
    width: undefined,
    href: null,
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    globalTheme: 'default'
};

export {Facebook};
