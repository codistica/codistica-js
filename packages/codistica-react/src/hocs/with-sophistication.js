/** @flow */

/** @module react/hocs/with-sophistication */

import {default as hoistNonReactStatics} from 'hoist-non-react-statics';
import React, {forwardRef} from 'react';
import type {ComponentType} from 'react';
import type {StylesType} from '../classes/sophistication.js';
import {createGetSophistication} from '../hooks/create-get-sophistication.js';
import {createSophistication} from '../hooks/create-sophistication.js';
import {getDisplayName} from '../modules/get-display-name.js';

// TODO: TYPES (SEE HOC TYPING FROM JSS REPO AND COMPONENT THROUGH HOC TYPING).

function withSophistication(
    styles: StylesType,
    useGetSophistication?: boolean
) {
    const useHook = useGetSophistication
        ? createGetSophistication(styles)
        : createSophistication(styles);

    return function withSophisticationHOC(InnerComponent: ComponentType<any>) {
        const HOC = forwardRef((props, ref) => {
            const {children, ...other} = props;

            const hookResult = useHook(other);

            return InnerComponent ? (
                <InnerComponent
                    ref={ref}
                    {...other}
                    {...(useGetSophistication
                        ? {getSophistication: hookResult}
                        : {jssClassNames: hookResult})}>
                    {children}
                </InnerComponent>
            ) : (
                children || null
            );
        });

        HOC.displayName = `withSophistication(${getDisplayName(
            InnerComponent
        )})`;

        return hoistNonReactStatics(HOC, InnerComponent);
    };
}

export {withSophistication};
