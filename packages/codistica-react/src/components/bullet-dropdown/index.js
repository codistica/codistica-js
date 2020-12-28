/** @flow */

import {elementUtils} from '@codistica/browser';
import React, {useRef, useState} from 'react';
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
        root?: {[string]: any},
        bullet?: {[string]: any},
        title?: {[string]: any},
        item?: {[string]: any}
    }
};

type GlobalClassNames = {
    [string]: {
        root?: string,
        bullet?: string,
        title?: string,
        item?: string
    }
};

function BulletDropdown(props: Props) {
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
                : null,
            height:
                autoSpacing && open !== null ? headerHeight + listHeight : null
        }),
        bullet: mergeStyles(globalStyles.bullet, customStyles.bullet, {
            transform: open ? 'rotate(90deg)' : null
        }),
        title: mergeStyles(globalStyles.title, customStyles.title),
        item: mergeStyles(globalStyles.item, customStyles.item)
    };

    const mergedClassNames = {
        root: mergeClassNames(
            resetClassNames.greedy,
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

    const conditionalProps = {
        onClickOutside() {
            if (open) {
                setOpen(false);
            }
        }
    };

    return (
        <Element
            {...(autoClose ? conditionalProps : {})}
            ref={setRootRef}
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
                    height: open ? listHeight : null,
                    opacity: open ? 1 : null
                }}
                className={componentClassNames.list}>
                {names.map((name, index) => (
                    <a
                        key={index}
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

    function setRootRef(ref: any) {
        rootRef.current = ref;
        if (open === null) {
            setOpen(false);
        }
    }

    function getHeaderHeight() {
        if (!rootRef.current) {
            return 0;
        }
        return elementUtils.getOuterHeight(rootRef.current.firstChild);
    }

    function getListHeight() {
        if (!rootRef.current) {
            return 0;
        }
        return Array.from(rootRef.current.lastChild.children).reduce(
            (acc, elem) => acc + elementUtils.getOuterHeight(elem),
            0
        );
    }
}

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

BulletDropdown.globalStyles = ({
    default: {
        root: {},
        bullet: {},
        title: {},
        item: {}
    }
}: GlobalStyles);

BulletDropdown.globalClassNames = ({
    default: {
        root: '',
        bullet: '',
        title: '',
        item: ''
    }
}: GlobalClassNames);

export {BulletDropdown};
