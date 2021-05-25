/** @flow */

import {elementUtils} from '@codistica/browser';
import React, {useRef, useState, useLayoutEffect} from 'react';
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

    // TODO: REMOVE <any> AFTER UPDATING FLOW.
    const rootRef = useRef<any>(null);

    const [open, setOpen] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [listHeight, setListHeight] = useState(0);

    const Element = autoClose ? Div : 'div';

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
            height: autoSpacing ? headerHeight + listHeight : null
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

    useLayoutEffect(() => {
        if (rootRef.current) {
            const elem = rootRef.current;
            setHeaderHeight(elementUtils.getOuterHeight(elem.firstChild));
            setListHeight(
                Array.from(elem.lastChild.children).reduce(
                    (acc, elem) => acc + elementUtils.getOuterHeight(elem),
                    0
                )
            );
        }
    }, []);

    return (
        <Element
            {...(autoClose
                ? {
                      onClickOutside() {
                          setOpen(false);
                      }
                  }
                : {})}
            ref={rootRef}
            style={mergedStyles.root}
            className={mergedClassNames.root}>
            <div
                onClick={() => setOpen((prevOpen) => !prevOpen)}
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
                {Object.keys(items).map((name, index) => (
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
