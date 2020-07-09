/** @flow */

/** @module react/utils/img-hover-switch */

import React from 'react';
import resetClassNames from '../../css/reset.module.scss';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import componentClassNames from './index.module.scss';

type Props = {
    defaultImg: string,
    onHoverImg: string,
    alt: string,
    disable: boolean,
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

/**
 * @typedef imgHoverSwitchPropsType
 * @property {string} defaultImg - Image path for default state.
 * @property {string} onHoverImg - Image path for hover state.
 * @property {string} alt - Image alt text.
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {string} [className=''] - React prop.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 * @property {('default'|string|null)} [globalTheme='default'] - Global theme to be used.
 */

/**
 * @description A component for switching images on hover.
 * @param {imgHoverSwitchPropsType} props - Props.
 * @returns {Object<string,*>} React component.
 */
function ImgHoverSwitch(props: Props) {
    const {
        defaultImg,
        onHoverImg,
        alt,
        disable,
        style,
        className,
        customStyles,
        customClassNames,
        globalTheme,
        ...other
    } = props;

    const globalStyles = globalTheme
        ? ImgHoverSwitch.globalStyles[globalTheme] || {}
        : {};

    const globalClassNames = globalTheme
        ? ImgHoverSwitch.globalClassNames[globalTheme] || {}
        : {};

    const mergedStyles = {
        root: mergeStyles(globalStyles.root, customStyles.root, style),
        img: mergeStyles(globalStyles.img, customStyles.img)
    };

    const mergedClassNames = {
        root: mergeClassNames(
            resetClassNames.root,
            componentClassNames.root,
            disable ? undefined : componentClassNames.switchChilds,
            globalClassNames.root,
            customClassNames.root,
            className
        ),
        img: mergeClassNames(globalClassNames.img, customClassNames.img)
    };

    return (
        <span
            {...other}
            onTouchStart={() => {}}
            style={mergedStyles.root}
            className={mergedClassNames.root}>
            <img
                src={defaultImg}
                alt={alt}
                style={mergedStyles.img}
                className={mergedClassNames.img}
            />
            {disable ? null : (
                <img
                    src={onHoverImg}
                    alt={alt}
                    style={mergedStyles.img}
                    className={mergedClassNames.img}
                />
            )}
        </span>
    );
}

ImgHoverSwitch.defaultProps = {
    disable: false,
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    globalTheme: 'default'
};

ImgHoverSwitch.globalStyles = {
    default: {
        root: {},
        img: {}
    }
};

ImgHoverSwitch.globalClassNames = {
    default: {
        root: '',
        img: ''
    }
};

export {ImgHoverSwitch};
