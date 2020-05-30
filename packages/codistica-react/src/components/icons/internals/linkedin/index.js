/** @flow */

/** @module react/components/icons/linkedin */

import React from 'react';
import type {Node} from 'react';
import resetClassNames from '../../../../css/reset.module.scss';
import {mergeClassNames} from '../../../../modules/merge-class-names.js';
import {mergeStyles} from '../../../../modules/merge-styles.js';
import {HoverIcon} from '../../../hover-icon/index.js';
import linkedinColorIcon from './img/socials-linkedin-color.svg';
import linkedinGrayIcon from './img/socials-linkedin-gray.svg';

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
 * @typedef linkedinPropsType
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
 * @description Linkedin icon component.
 * @param {linkedinPropsType} props - Props.
 * @returns {Object<string,*>} React component.
 */
const Linkedin: CallableObj = function Linkedin(props: Props) {
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
        ? Linkedin.globalStyles[globalTheme] || {}
        : {};

    const globalClassNames = globalTheme
        ? Linkedin.globalClassNames[globalTheme] || {}
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
            onHoverImg={linkedinColorIcon}
            defaultImg={linkedinGrayIcon}
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

Linkedin.globalStyles = {
    default: {
        root: {}
    }
};

Linkedin.globalClassNames = {
    default: {
        root: ''
    }
};

Linkedin.defaultProps = {
    height: undefined,
    width: undefined,
    href: null,
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    globalTheme: 'default'
};

export {Linkedin};
