/** @flow */

import {elementUtils, getScrollingElement} from '@codistica/browser';
import {mergeClassNames, withViewportMonitor} from '@codistica/react';
import React, {useContext, useEffect} from 'react';
import {MenuContext} from '../../contexts/menu-context.js';
import {Header} from '../header/index.js';
import componentClassNames from './index.module.scss';

const ViewportMonitorDiv = withViewportMonitor<{}>('div');

const scrollingElement = getScrollingElement();

type Props = {
    noOverscroll: boolean,
    headerSpacer: null | boolean,
    appLayout: boolean,
    children: any
};

/**
 * @typedef bodyPropsType
 * @property {boolean} [noOverscroll=false] - Should overscroll effect be blocked.
 * @property {boolean} [headerSpacer=null] - Should space be reserved at top for header.
 * @property {boolean} [appLayout=false] - Should app style layout be used.
 * @property {*} [children=null] - React prop.
 */

/**
 * @description Body component.
 * @param {bodyPropsType} props - Component props.
 * @returns {Object<string,*>} React component.
 */
function Body(props: Props) {
    const {noOverscroll, headerSpacer, appLayout, children} = props;

    const menuContext = useContext(MenuContext);

    const useHeaderSpacer = headerSpacer !== null ? headerSpacer : !appLayout;

    const Element = appLayout ? ViewportMonitorDiv : 'div';

    useEffect(() => {
        if (noOverscroll || menuContext.isOpen) {
            return elementUtils.addOverscrollBlocker(scrollingElement, {
                contentAware: true
            }).detach;
        }
        return undefined;
    }, [noOverscroll, menuContext.isOpen]);

    return (
        <Element
            style={{
                minHeight: appLayout ? '100vh' : null,
                width: '100vw'
            }}
            className={mergeClassNames(componentClassNames.root, [
                componentClassNames.appLayout,
                appLayout
            ])}>
            {useHeaderSpacer ? (
                <Header style={{position: 'static', visibility: 'hidden'}} />
            ) : null}
            {children}
        </Element>
    );
}

Body.defaultProps = {
    noOverscroll: false,
    headerSpacer: null,
    appLayout: false,
    children: null
};

export {Body};
