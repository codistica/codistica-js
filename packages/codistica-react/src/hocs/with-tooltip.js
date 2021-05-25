/** @flow */

import {default as hoistNonReactStatics} from 'hoist-non-react-statics';
import React, {forwardRef} from 'react';
import type {ComponentType} from 'react';
import {createSophistication} from '../hooks/create-sophistication.js';
import {getDisplayName} from '../modules/get-display-name.js';
import {mergeClassNames} from '../modules/merge-class-names.js';

// TODO: TYPES (SEE HOC TYPING FROM JSS REPO AND COMPONENT THROUGH HOC TYPING).

type Props = {
    tooltipRenderFn: null | ((...args: Array<any>) => any),
    className: string,
    children: any
};

const useSophistication = createSophistication({
    root: {
        position: 'relative',
        '&:hover $tooltip, &:focus $tooltip, &:active $tooltip': {
            display: 'inline-block'
        }
    },
    tooltip: {
        display: 'none',
        margin: 15,
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(calc(-50% - 15px))',
        zIndex: 1
    }
});

function withTooltip(InnerComponent: ComponentType<any> | string) {
    const HOC = forwardRef((props: Props, ref) => {
        const {
            tooltipRenderFn = null,
            className = '',
            children = null,
            ...other
        } = props;

        const jssClassNames = useSophistication();

        return InnerComponent ? (
            <InnerComponent
                {...other}
                tabIndex={0}
                className={mergeClassNames(jssClassNames.root, className)}
                ref={ref}>
                <span className={jssClassNames.tooltip}>
                    {tooltipRenderFn ? tooltipRenderFn() : null}
                </span>
                {children}
            </InnerComponent>
        ) : (
            children || null
        );
    });

    HOC.displayName = `withTooltip(${getDisplayName(InnerComponent)})`;

    return hoistNonReactStatics(HOC, InnerComponent);
}

export {withTooltip};
