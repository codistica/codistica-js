/** @flow */

import {default as hoistNonReactStatics} from 'hoist-non-react-statics';
import React, {forwardRef} from 'react';
import type {ComponentType} from 'react';
import {useGetUniqueID} from '../hooks/use-get-unique-id.js';
import {getDisplayName} from '../modules/get-display-name.js';

// TODO: TYPES (SEE HOC TYPING FROM JSS REPO AND COMPONENT THROUGH HOC TYPING).

function withGetUniqueID(InnerComponent: ComponentType<any>) {
    const HOC = forwardRef((props, ref) => {
        const {children, ...other} = props;

        const getUniqueID = useGetUniqueID();

        return InnerComponent ? (
            <InnerComponent ref={ref} {...other} getUniqueID={getUniqueID}>
                {children}
            </InnerComponent>
        ) : (
            children || null
        );
    });

    HOC.displayName = `withGetUniqueID(${getDisplayName(InnerComponent)})`;

    return hoistNonReactStatics(HOC, InnerComponent);
}

export {withGetUniqueID};
