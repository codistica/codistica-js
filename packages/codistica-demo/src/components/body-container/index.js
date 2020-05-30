/** @flow */

import {mergeClassNames} from '@codistica/react';
import React, {useContext} from 'react';
import {MenuContext} from '../../contexts/menu-context.js';
import componentClassNames from './index.module.scss';

type Props = {
    children: any
};

BodyContainer.defaultProps = {
    children: null
};

/**
 * @typedef bodyContainerPropsType
 * @property {*} [children=null] - React prop.
 */

/**
 * @description Body container component.
 * @param {bodyContainerPropsType} props - Component props.
 * @returns {Object<string,*>} React component.
 */
function BodyContainer(props: Props) {
    const {children} = props;

    const menuContext = useContext(MenuContext);

    return (
        <div
            className={mergeClassNames(
                [componentClassNames.rootClose, !menuContext.isOpen],
                [componentClassNames.rootOpen, menuContext.isOpen]
            )}>
            {children}
        </div>
    );
}

export {BodyContainer};
