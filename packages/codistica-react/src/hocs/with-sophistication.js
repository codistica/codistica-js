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

type Props = {
    children: any
};

function withSophistication(
    styles: StylesType,
    useGetSophistication?: boolean
) {
    const useHook = useGetSophistication
        ? createGetSophistication(styles)
        : createSophistication(styles);

    return function withSophisticationHOC(
        InnerComponent: ComponentType<any> | string
    ) {
        const HOC = forwardRef((props: Props, ref) => {
            const {children, ...other} = props;

            const hookResult = useHook(other);

            return InnerComponent ? (
                <InnerComponent
                    {...other}
                    {...(useGetSophistication
                        ? {getSophistication: hookResult}
                        : {jssClassNames: hookResult})}
                    ref={ref}>
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
