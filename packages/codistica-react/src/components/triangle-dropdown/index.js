/** @flow */

import {getElementHeight} from '@codistica/browser';
import {default as classNames} from 'classnames';
import React, {useRef, useState} from 'react';
import {onClickOutsideHOC} from '../../hocs/on-click-outside-hoc.js';
import styles from './index.module.scss';

type Props = {
    title: string,
    items: {[string]: string},
    autoClose: boolean,
    autoSpacing: 'top' | 'bottom' | null,
    className: string,
    style: {[string]: any}
};

TriangleDropdown.defaultProps = {
    title: 'menu',
    items: {},
    autoClose: false,
    autoSpacing: null,
    className: '',
    style: {}
};

const Div = onClickOutsideHOC('div');

/**
 * @typedef triangleDropdownPropsType
 * @property {string} [title='menu'] - Menu title.
 * @property {Object<string,string>} [items={}] - Menu items.
 * @property {boolean} [autoClose=false] - Auto close menu on click outside.
 * @property {('top'|'bottom'|null)} [autoSpacing=null] - Auto reserve space for menu opening.
 * @property {string} [className=''] - React prop.
 * @property {Object<string,*>} [style={}] - React prop.
 */

/**
 * @description A modern triangle dropdown list.
 * @param {triangleDropdownPropsType} props - Props.
 * @returns {Object<string,*>} Component.
 */
function TriangleDropdown(props: Props) {
    const containerRef = useRef(null);
    const [open, setOpen] = useState(null);
    const {
        title,
        items,
        className,
        autoClose,
        autoSpacing,
        style,
        ...other
    } = props;
    const rootClassName = classNames({
        [className]: !!className,
        [styles.container]: true
    });

    const Element = autoClose ? Div : 'div';

    const names = Object.getOwnPropertyNames(items);
    const headerHeight = getHeaderHeight();
    const listHeight = getListHeight();

    return (
        <Element
            {...other}
            className={rootClassName}
            ref={setContainerRef}
            style={{
                ...style,
                justifyContent: autoSpacing
                    ? autoSpacing === 'top'
                        ? 'flex-end'
                        : 'flex-start'
                    : undefined,
                height:
                    autoSpacing && open !== null
                        ? headerHeight + listHeight
                        : undefined
            }}
            onClickOutside={autoClose ? () => open && setOpen(false) : null}>
            <div className={styles.header} onClick={() => setOpen(!open)}>
                <div
                    className={styles.triangleRight}
                    style={{
                        transform: open ? 'rotate(90deg)' : undefined
                    }}
                />
                <div className={styles.title}>{title}</div>
            </div>
            <div
                className={styles.list}
                style={{
                    height: open ? listHeight : undefined,
                    opacity: open ? 1 : undefined
                }}>
                {names.map((name, key) => (
                    <span key={key} className={styles.item}>
                        <a
                            href={items[name]}
                            target={'_blank'}
                            rel={'noopener noreferrer'}
                            onFocus={() => setOpen(true)}
                            onBlur={() => setOpen(false)}>
                            {name}
                        </a>
                    </span>
                ))}
            </div>
        </Element>
    );

    /**
     * @description Save container element reference.
     * @param {Object<string,*>} ref - Container element reference.
     * @returns {void} Void.
     */
    function setContainerRef(ref: any) {
        containerRef.current = ref;
        if (open === null) {
            setOpen(false);
        }
    }

    /**
     * @description Calculate header height.
     * @returns {number} Header height.
     */
    function getHeaderHeight() {
        if (!containerRef.current) {
            return 0;
        }
        return getElementHeight(containerRef.current.firstChild);
    }

    /**
     * @description Calculate list height based on children.
     * @returns {number} List height.
     */
    function getListHeight() {
        if (!containerRef.current) {
            return 0;
        }
        return Array.from(containerRef.current.lastChild.children).reduce(
            (acc, elem) => acc + getElementHeight(elem),
            0
        );
    }
}

export {TriangleDropdown};
