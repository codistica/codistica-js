/** @flow */

import {mergeClassNames, withOnClickOutside} from '@codistica/react';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {MenuContext} from '../../contexts/menu-context.js';
import componentClassNames from './index.module.scss';

const OnClickOutsideDiv = withOnClickOutside<{}>('div');

/**
 * @description Menu component.
 * @returns {Object<string,*>} React component.
 */
function Menu() {
    const menuContext = useContext(MenuContext);
    return (
        <OnClickOutsideDiv
            onClickOutside={(e) => {
                if (menuContext.isOpen && !e.target.getAttribute('data-logo')) {
                    menuContext.openMenu(false);
                }
            }}
            className={mergeClassNames(
                [componentClassNames.rootClose, !menuContext.isOpen],
                [componentClassNames.rootOpen, menuContext.isOpen]
            )}>
            <div className={componentClassNames.menuHeader}>
                <span
                    onClick={() => {
                        menuContext.openMenu(false);
                    }}
                    style={{cursor: 'pointer'}}>
                    CLOSE
                </span>
            </div>
            <div
                onClick={(e) => {
                    if (
                        e.target.getAttribute('data-link') &&
                        window.innerWidth < 650
                    ) {
                        menuContext.openMenu(false);
                    }
                }}
                className={componentClassNames.linksContainer}>
                <span>
                    <Link to={'/'} data-link={'true'}>
                        HOME
                    </Link>
                </span>
                <span>
                    <Link to={'/slides'} data-link={'true'}>
                        SLIDES
                    </Link>
                </span>
                <span>
                    <Link to={'/viewport'} data-link={'true'}>
                        VIEWPORT
                    </Link>
                </span>
                <span>
                    <Link to={'/scrolling'} data-link={'true'}>
                        SCROLLING
                    </Link>
                </span>
                <span>
                    <Link to={'/forms'} data-link={'true'}>
                        FORMS
                    </Link>
                </span>
                <span>
                    <Link to={'/ajax'} data-link={'true'}>
                        AJAX
                    </Link>
                </span>
            </div>
        </OnClickOutsideDiv>
    );
}

export {Menu};
