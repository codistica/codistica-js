/** @flow */

/** @module react/components/bullet-dropdown */

import {getElementHeight} from '@codistica/browser';
import React, {useRef, useState} from 'react';
import resetClassName from '../../css/reset.module.scss';
import {withOnClickOutside} from '../../hocs/with-on-click-outside.js';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import {mergeStyles} from '../../modules/merge-styles.js';
import classNames from './index.module.scss';

const Div = withOnClickOutside('div');

type Props = {
    title: string,
    items: {[string]: string},
    autoClose: boolean,
    autoSpacing: 'top' | 'bottom' | null,
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
    }
};

BulletDropdown.defaultProps = {
    title: 'menu',
    items: {},
    autoClose: false,
    autoSpacing: null,
    customStyles: {},
    customClassNames: {}
};

/**
 * @typedef bulletDropdownPropsType
 * @property {string} [title='menu'] - Menu title.
 * @property {Object<string,string>} [items={}] - Menu items.
 * @property {boolean} [autoClose=false] - Auto close menu on click outside.
 * @property {('top'|'bottom'|null)} [autoSpacing=null] - Auto reserve space for menu opening.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 */

/**
 * @description A modern bullet dropdown list.
 * @param {bulletDropdownPropsType} props - Props.
 * @returns {Object<string,*>} Component.
 */
function BulletDropdown(props: Props) {
    const {
        title,
        items,
        autoClose,
        autoSpacing,
        customStyles,
        customClassNames
    } = props;

    const rootRef = useRef(null);
    const [open, setOpen] = useState(null);

    const Element = autoClose ? Div : 'div';

    const names = Object.getOwnPropertyNames(items);
    const headerHeight = getHeaderHeight();
    const listHeight = getListHeight();

    const rootStyles = mergeStyles(customStyles.root, {
        justifyContent: autoSpacing
            ? autoSpacing === 'top'
                ? 'flex-end'
                : 'flex-start'
            : undefined,
        height:
            autoSpacing && open !== null ? headerHeight + listHeight : undefined
    });

    const bulletStyles = mergeStyles(customStyles.bullet, {
        transform: open ? 'rotate(90deg)' : undefined
    });

    const rootClassNames = mergeClassNames(
        resetClassName.root,
        classNames.root,
        customClassNames.root
    );

    const bulletClassNames = mergeClassNames(
        classNames.triangleRight,
        customClassNames.bullet
    );

    const titleClassNames = mergeClassNames(
        classNames.title,
        customClassNames.title
    );

    const itemClassNames = mergeClassNames(
        classNames.item,
        customClassNames.item
    );

    return (
        <Element
            ref={setRootRef}
            onClickOutside={autoClose ? () => open && setOpen(false) : null}
            style={rootStyles}
            className={rootClassNames}>
            <div onClick={() => setOpen(!open)} className={classNames.header}>
                <span style={bulletStyles} className={bulletClassNames} />
                <span style={customStyles.title} className={titleClassNames}>
                    {title}
                </span>
            </div>

            <div
                style={{
                    height: open ? listHeight : undefined,
                    opacity: open ? 1 : undefined
                }}
                className={classNames.list}>
                {names.map((name, key) => (
                    <a
                        key={key}
                        href={items[name]}
                        target={'_blank'}
                        rel={'noopener noreferrer'}
                        onFocus={() => setOpen(true)}
                        onBlur={() => setOpen(false)}
                        style={customStyles.item}
                        className={itemClassNames}>
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
}

export {BulletDropdown};
