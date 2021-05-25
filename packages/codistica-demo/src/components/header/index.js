/** @flow */

import {mergeClassNames} from '@codistica/react';
import React, {useContext} from 'react';
import {HeaderContext} from '../../contexts/header-context.js';
import {MenuContext} from '../../contexts/menu-context.js';
import codisticaLogo from '../../img/codistica-logo-mini-dark.svg';
import componentClassNames from './index.module.scss';

type Props = {
    style: {[string]: any},
    className: string
};

/**
 * @typedef headerProps
 * @property {Object<string,*>} [style={}] - React prop.
 * @property {string} [className=''] - React prop.
 */

/**
 * @description Header component.
 * @param {headerProps} props - Component props.
 * @returns {Object<string,*>} React component.
 */
function Header(props: Props) {
    const {style, className} = props;
    const {title} = useContext(HeaderContext);
    const menuContext = useContext(MenuContext);

    return (
        <div
            style={style}
            className={mergeClassNames(
                [componentClassNames.rootClose, !menuContext.isOpen],
                [componentClassNames.rootOpen, menuContext.isOpen],
                className
            )}>
            <div className={componentClassNames.spacer} />
            <div className={componentClassNames.logoContainer}>
                <img
                    src={codisticaLogo}
                    alt={'codistica-logo'}
                    onClick={() => menuContext.openMenu(!menuContext.isOpen)}
                    data-logo={'true'}
                    className={componentClassNames.logo}
                />
            </div>
            <div className={componentClassNames.spacer} />
            {title ? (
                <div className={componentClassNames.titleContainer}>
                    <h1 className={componentClassNames.title}>{title}</h1>
                </div>
            ) : null}
            {title ? <div className={componentClassNames.spacer} /> : null}
        </div>
    );
}

Header.defaultProps = {
    style: {},
    className: ''
};

export {Header};
