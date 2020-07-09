/** @flow */

/** @module react-icons/utils/icon */

import {
    mergeClassNames,
    mergeStyles,
    ImgHoverSwitch,
    AnchorWrapper
} from '@codistica/react';
import React from 'react';
import resetClassNames from '../css/reset.module.scss';

type ExternalProps = {
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

type InternalProps = {
    ...ExternalProps,
    defaultImg: string,
    onHoverImg: string
};

/**
 * @typedef iconPropsType
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
 * @description Icon icon component.
 * @param {iconPropsType} props - Props.
 * @returns {Object<string,*>} React component.
 */
function Icon(props: InternalProps) {
    const {
        defaultImg,
        onHoverImg,
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
        ? Icon.globalStyles[globalTheme] || {}
        : {};

    const globalClassNames = globalTheme
        ? Icon.globalClassNames[globalTheme] || {}
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
        <AnchorWrapper href={href}>
            <ImgHoverSwitch
                defaultImg={defaultImg}
                onHoverImg={onHoverImg}
                disable={!href}
                tabIndex={-1}
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
        </AnchorWrapper>
    );
}

Icon.defaultProps = {
    height: undefined,
    width: undefined,
    href: null,
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    globalTheme: 'default'
};

Icon.globalStyles = {
    default: {
        root: {}
    }
};

Icon.globalClassNames = {
    default: {
        root: ''
    }
};

export {Icon};
export type {ExternalProps};
