/** @flow */

/** @module react/components/hover-icon */

import classnames from 'classnames/dedupe';
import React from 'react';
import {tooltipHOC} from '../../hocs/tooltip-hoc/index.js';
import styles from './index.module.scss';

type Props = {
    defaultImg: string,
    onHoverImg: string,
    className: string,
    style: {[string]: any},
    href: ?string
};

HoverIcon.defaultProps = {
    className: '',
    style: {},
    href: null
};

const WithTooltip = tooltipHOC('span');

/**
 * @typedef hoverIconPropsType
 * @property {string} defaultImg - Icon path for default state.
 * @property {string} onHoverImg - Icon path for hover state.
 * @property {(string|null)} [href=null] - Component href.
 */

/**
 * @description A component for switching icons on hover.
 * @param {hoverIconPropsType} props - Props.
 * @returns {Object<string,*>} Component.
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
    const Element = href ? 'span' : WithTooltip;
    const HoverIconComponent = (
        <Element
            {...other}
            className={elementClassName}
            onTouchStart={() => {}}
            tabIndex={-1}
            tooltipText={href ? undefined : '🚫'}>
            <img
                src={defaultImg}
                alt={'icon'}
                style={style}
                className={className ? className : undefined}
            />
            <img
                src={onHoverImg}
                alt={'icon'}
                style={style}
                className={className ? className : undefined}
            />
        </Element>
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
