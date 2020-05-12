/** @flow */

/** @module react/components/hover-icon */

import React from 'react';
import resetClassName from '../../css/reset.module.scss';
import {mergeClassNames} from '../../modules/merge-class-names.js';
import classNames from './index.module.scss';

type Props = {
    defaultImg: string,
    onHoverImg: string,
    href: string,
    customStyles: {
        root?: {[string]: any},
        img?: {[string]: any}
    },
    customClassNames: {
        root?: string,
        img?: string
    }
};

HoverIcon.defaultProps = {
    href: null,
    customStyles: {},
    customClassNames: {}
};

/**
 * @typedef hoverIconPropsType
 * @property {string} defaultImg - Icon path for default state.
 * @property {string} onHoverImg - Icon path for hover state.
 * @property {(string|null)} [href=null] - Component href.
 * @property {Object<string,*>} [customStyles={}] - Custom styles prop.
 * @property {Object<string,*>} [customClassNames={}] - Custom classNames prop.
 */

/**
 * @description A component for switching icons on hover.
 * @param {hoverIconPropsType} props - Props.
 * @returns {Object<string,*>} Component.
 */
function HoverIcon(props: Props) {
    const {
        defaultImg,
        onHoverImg,
        href,
        customStyles,
        customClassNames
    } = props;

    const hoverIconClassNames = mergeClassNames(
        {
            [resetClassName.root]: !href,
            [classNames.root]: !href,
            [classNames.notAvailable]: !href
        },
        customClassNames.root
    );

    const anchorClassNames = mergeClassNames(
        {
            [resetClassName.root]: href,
            [classNames.root]: href
        },
        classNames.switchChilds
    );

    const HoverIconComponent = (
        <span
            onTouchStart={() => {}}
            tabIndex={-1}
            className={hoverIconClassNames}>
            <img
                src={defaultImg}
                alt={'icon'}
                style={customStyles.img}
                className={customClassNames.img}
            />
            <img
                src={onHoverImg}
                alt={'icon'}
                style={customStyles.img}
                className={customClassNames.img}
            />
        </span>
    );

    return href ? (
        <a
            href={href}
            target={'_blank'}
            rel={'noopener noreferrer'}
            className={anchorClassNames}>
            {HoverIconComponent}
        </a>
    ) : (
        HoverIconComponent
    );
}

export {HoverIcon};
