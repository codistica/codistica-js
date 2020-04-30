/** @flow */

/** @module react/components/hover-icon */

import classnames from 'classnames/dedupe';
import React from 'react';
import styles from './index.module.scss';

type Props = {
    defaultImg: string,
    onHoverImg: string,
    className: string,
    style: Object,
    href: ?string
};

HoverIcon.defaultProps = {
    className: '',
    style: {},
    href: null
};

/**
 * @typedef hoverIconPropsType
 * @property {string} defaultImg - Icon path for default state.
 * @property {string} onHoverImg - Icon path for hover state.
 * @property {(string|null)} [href=null] - Component href.
 */

/**
 * @description A component for switching icons on hover.
 * @param {hoverIconPropsType} props - Props.
 * @returns {React.Component} Component.
 */
function HoverIcon(props: Props) {
    const {defaultImg, onHoverImg, className, style, href, ...other} = props;
    const elementClassName = classnames(
        {[styles.container]: !href},
        {[styles.element]: true},
        {[styles.notAvailable]: !href}
    );
    const anchorClassName = classnames(
        {[styles.container]: href},
        {[styles.anchor]: true},
        {[styles.switchChilds]: true}
    );
    const HoverIconComponent = (
        <span
            {...other}
            className={elementClassName}
            onTouchStart={() => {}}
            tabIndex={-1}>
            <img
                src={defaultImg}
                alt={'icon'}
                style={style}
                className={className}
            />
            <img
                src={onHoverImg}
                alt={'icon'}
                style={style}
                className={className}
            />
        </span>
    );
    return href ? (
        <a
            href={href}
            target={'_blank'}
            rel={'noopener noreferrer'}
            className={anchorClassName}>
            {HoverIconComponent}
        </a>
    ) : (
        HoverIconComponent
    );
}

export {HoverIcon};
