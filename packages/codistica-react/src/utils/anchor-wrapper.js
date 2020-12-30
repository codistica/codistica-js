/** @flow */

/** @module react/utils/anchor-wrapper */

import React from 'react';
import resetClassNames from '../css/reset.module.scss';
import {mergeClassNames} from '../modules/merge-class-names.js';
import {mergeStyles} from '../modules/merge-styles.js';

type Props = {
    children: any,
    href: string | null,
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
        root?: {[string]: any}
    }
};

type GlobalClassNames = {
    [string]: {
        root?: string
    }
};

/**
 * @typedef anchorWrapperPropsType
 * @property {*} [children=null] - React prop.
 * @property {(string|null)} [href=null] - Component href.
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {string} [className=''] - React prop.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 * @property {('default'|string|null)} [globalTheme='default'] - Global theme to be used.
 */

/**
 * @description A component for wrapping elements with an anchor element.
 * @param {anchorWrapperPropsType} props - Props.
 * @returns {Object<string,*>} React component.
 */
function AnchorWrapper(props: Props) {
    const {
        children,
        href,
        style,
        className,
        customStyles,
        customClassNames,
        globalTheme,
        ...other
    } = props;

    const globalStyles = globalTheme
        ? AnchorWrapper.globalStyles[globalTheme] || {}
        : {};

    const globalClassNames = globalTheme
        ? AnchorWrapper.globalClassNames[globalTheme] || {}
        : {};

    const mergedStyles = {
        root: mergeStyles(
            {
                cursor: 'pointer'
            },
            globalStyles.root,
            customStyles.root,
            style
        )
    };

    const mergedClassNames = {
        root: mergeClassNames(
            resetClassNames.greedy,
            globalClassNames.root,
            customClassNames.root,
            className
        )
    };

    return href ? (
        <a
            {...other}
            href={href}
            target={'_blank'}
            rel={'noopener noreferrer'}
            style={mergedStyles.root}
            className={mergedClassNames.root}>
            {children}
        </a>
    ) : (
        children
    );
}

AnchorWrapper.defaultProps = {
    children: null,
    href: null,
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    globalTheme: 'default'
};

AnchorWrapper.globalStyles = ({
    default: {
        root: {}
    }
}: GlobalStyles);

AnchorWrapper.globalClassNames = ({
    default: {
        root: ''
    }
}: GlobalClassNames);

export {AnchorWrapper};
