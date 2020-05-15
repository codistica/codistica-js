/** @flow */

/** @module react/components/hover-icon */

import React from 'react';
import type {Node} from 'react';
import resetClassNames from '../../css/reset.module.scss';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import componentClassNames from './index.module.scss';

type Props = {
    defaultImg: string,
    onHoverImg: string,
    href: string,
    style: {[string]: any},
    className: string,
    customStyles: {
        root?: {[string]: any},
        img?: {[string]: any}
    },
    customClassNames: {
        root?: string,
        img?: string
    },
    globalTheme: 'default' | string | null
};

type GlobalStyles = {
    [string]: {
        root: {[string]: any},
        img: {[string]: any}
    }
};

type GlobalClassNames = {
    [string]: {
        root: string,
        img: string
    }
};

type CallableObj = {
    (props: Props): Node,
    globalStyles: GlobalStyles,
    globalClassNames: GlobalClassNames,
    defaultProps: {[string]: any}
};

/**
 * @typedef hoverIconPropsType
 * @property {string} defaultImg - Icon path for default state.
 * @property {string} onHoverImg - Icon path for hover state.
 * @property {(string|null)} [href=null] - Component href.
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {string} [className=''] - React prop.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 * @property {('default'|string|null)} [globalTheme='default'] - Global theme to be used.
 */

/**
 * @description A component for switching icons on hover.
 * @param {hoverIconPropsType} props - Props.
 * @returns {Object<string,*>} Component.
 */
const HoverIcon: CallableObj = function HoverIcon(props: Props) {
    const {
        defaultImg,
        onHoverImg,
        href,
        style,
        className,
        customStyles,
        customClassNames,
        globalTheme
    } = props;

    const globalStyles = globalTheme
        ? HoverIcon.globalStyles[globalTheme] || {}
        : {};

    const globalClassNames = globalTheme
        ? HoverIcon.globalClassNames[globalTheme] || {}
        : {};

    const mergedStyles = {
        icon: !href
            ? mergeStyles(globalStyles.root, customStyles.root, style)
            : undefined,
        img: mergeStyles(globalStyles.img, customStyles.img),
        anchor: href
            ? mergeStyles(globalStyles.root, customStyles.root, style)
            : undefined
    };

    const mergedClassNames = {
        icon: !href
            ? mergeClassNames(
                  resetClassNames.root,
                  componentClassNames.root,
                  componentClassNames.notAvailable,
                  globalClassNames.root,
                  customClassNames.root,
                  className
              )
            : undefined,
        img: mergeClassNames(globalClassNames.img, customClassNames.img),
        anchor: href
            ? mergeClassNames(
                  resetClassNames.root,
                  componentClassNames.root,
                  componentClassNames.switchChilds,
                  globalClassNames.root,
                  customClassNames.root,
                  className
              )
            : undefined
    };

    const HoverIconComponent = (
        <span
            onTouchStart={() => {}}
            tabIndex={-1}
            style={mergedStyles.icon}
            className={mergedClassNames.icon}>
            <img
                src={defaultImg}
                alt={'icon'}
                style={mergedStyles.img}
                className={mergedClassNames.img}
            />
            <img
                src={onHoverImg}
                alt={'icon'}
                style={mergedStyles.img}
                className={mergedClassNames.img}
            />
        </span>
    );

    return href ? (
        <a
            href={href}
            target={'_blank'}
            rel={'noopener noreferrer'}
            style={mergedStyles.anchor}
            className={mergedClassNames.anchor}>
            {HoverIconComponent}
        </a>
    ) : (
        HoverIconComponent
    );
};

HoverIcon.globalStyles = {
    default: {
        root: {},
        img: {}
    }
};

HoverIcon.globalClassNames = {
    default: {
        root: '',
        img: ''
    }
};

HoverIcon.defaultProps = {
    href: null,
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    globalTheme: 'default'
};

export {HoverIcon};
