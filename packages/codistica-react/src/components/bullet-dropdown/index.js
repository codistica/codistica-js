/** @flow */

/** @module react/components/bullet-dropdown */

import {getElementHeight} from '@codistica/browser';
import React, {useRef, useState} from 'react';
import type {Node} from 'react';
import resetClassNames from '../../css/reset.module.scss';
import {withOnClickOutside} from '../../hocs/with-on-click-outside.js';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import componentClassNames from './index.module.scss';

const Div = withOnClickOutside<{}>('div');

type Props = {
    title: string,
    items: {[string]: string},
    autoClose: boolean,
    autoSpacing: 'top' | 'bottom' | null,
    style: {[string]: any},
    className: string,
    customStyles: {
        root?: {[string]: any},
        bullet?: {[string]: any},
        title?: {[string]: any},
        item?: {[string]: any}
    },
    customClassNames: {
        root?: string,
        bullet?: string,
        title?: string,
        item?: string
    },
    globalTheme: 'default' | string | null
};

type GlobalStyles = {
    [string]: {
        root: {[string]: any},
        bullet: {[string]: any},
        title: {[string]: any},
        item: {[string]: any}
    }
};

type GlobalClassNames = {
    [string]: {
        root: string,
        bullet: string,
        title: string,
        item: string
    }
};

type CallableObj = {
    (props: Props): Node,
    globalStyles: GlobalStyles,
    globalClassNames: GlobalClassNames,
    defaultProps: {[string]: any}
};

/**
 * @typedef bulletDropdownPropsType
 * @property {string} [title='menu'] - Menu title.
 * @property {Object<string,string>} [items={}] - Menu items.
 * @property {boolean} [autoClose=false] - Auto close menu on click outside.
 * @property {('top'|'bottom'|null)} [autoSpacing=null] - Auto reserve space for menu opening.
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {string} [className=''] - React prop.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 * @property {('default'|string|null)} [globalTheme='default'] - Global theme to be used.
 */

/**
 * @description A modern bullet dropdown list.
 * @param {bulletDropdownPropsType} props - Props.
 * @returns {Object<string,*>} Component.
 */
const BulletDropdown: CallableObj = function BulletDropdown(props: Props) {
    const {
        title,
        items,
        autoClose,
        autoSpacing,
        style,
        className,
        customStyles,
        customClassNames,
        globalTheme
    } = props;

    const rootRef = useRef(null);
    const [open, setOpen] = useState(null);

    const Element = autoClose ? Div : 'div';

    const names = Object.getOwnPropertyNames(items);
    const headerHeight = getHeaderHeight();
    const listHeight = getListHeight();

    const globalStyles = globalTheme
        ? BulletDropdown.globalStyles[globalTheme] || {}
        : {};

    const globalClassNames = globalTheme
        ? BulletDropdown.globalClassNames[globalTheme] || {}
        : {};

    const mergedStyles = {
        root: mergeStyles(globalStyles.root, customStyles.root, style, {
            justifyContent: autoSpacing
                ? autoSpacing === 'top'
                    ? 'flex-end'
                    : 'flex-start'
                : undefined,
            height:
                autoSpacing && open !== null
                    ? headerHeight + listHeight
                    : undefined
        }),
        bullet: mergeStyles(globalStyles.bullet, customStyles.bullet, {
            transform: open ? 'rotate(90deg)' : undefined
        }),
        title: mergeStyles(globalStyles.title, customStyles.title),
        item: mergeStyles(globalStyles.item, customStyles.item)
    };

    const mergedClassNames = {
        root: mergeClassNames(
            resetClassNames.root,
            componentClassNames.root,
            globalClassNames.root,
            customClassNames.root,
            className
        ),
        bullet: mergeClassNames(
            componentClassNames.triangleRight,
            globalClassNames.bullet,
            customClassNames.bullet
        ),
        title: mergeClassNames(
            componentClassNames.title,
            globalClassNames.title,
            customClassNames.title
        ),
        item: mergeClassNames(
            componentClassNames.item,
            globalClassNames.item,
            customClassNames.item
        )
    };

    return (
        <Element
            ref={setRootRef}
            onClickOutside={
                autoClose ? () => open && setOpen(false) : undefined
            }
            style={mergedStyles.root}
            className={mergedClassNames.root}>
            <div
                onClick={() => setOpen(!open)}
                className={componentClassNames.header}>
                <span
                    style={mergedStyles.bullet}
                    className={mergedClassNames.bullet}
                />
                <span
                    style={mergedStyles.title}
                    className={mergedClassNames.title}>
                    {title}
                </span>
            </div>

            <div
                style={{
                    height: open ? listHeight : undefined,
                    opacity: open ? 1 : undefined
                }}
                className={componentClassNames.list}>
                {names.map((name, key) => (
                    <a
                        key={key}
                        href={items[name]}
                        target={'_blank'}
                        rel={'noopener noreferrer'}
                        onFocus={() => setOpen(true)}
                        onBlur={() => setOpen(false)}
                        style={mergedStyles.item}
                        className={mergedClassNames.item}>
                        <span>{name}</span>
                    </a>
                ))}
            </div>
        </Element>
    );

    /**
     * @description Save root element reference.
     * @param {Object<string,*>} ref - Root element reference.
     * @returns {void} Void.
     */
    function setRootRef(ref: any) {
        rootRef.current = ref;
        if (open === null) {
            setOpen(false);
        }
    }

    /**
     * @description Calculate header height.
     * @returns {number} Header height.
     */
    function getHeaderHeight() {
        if (!rootRef.current) {
            return 0;
        }
        return getElementHeight(rootRef.current.firstChild);
    }

    /**
     * @description Calculate list height based on children.
     * @returns {number} List height.
     */
    function getListHeight() {
        if (!rootRef.current) {
            return 0;
        }
        return Array.from(rootRef.current.lastChild.children).reduce(
            (acc, elem) => acc + getElementHeight(elem),
            0
        );
    }
};

BulletDropdown.globalStyles = {
    default: {
        root: {},
        bullet: {},
        title: {},
        item: {}
    }
};

BulletDropdown.globalClassNames = {
    default: {
        root: '',
        bullet: '',
        title: '',
        item: ''
    }
};

BulletDropdown.defaultProps = {
    title: 'menu',
    items: {},
    autoClose: false,
    autoSpacing: null,
    style: {},
    className: '',
    customStyles: {},
    customClassNames: {},
    globalTheme: 'default'
};

export {BulletDropdown};
