/** @flow */

/** @module react/components/tab-boundary */

import React from 'react';

type Props = {
    children: any
};

TabBoundary.defaultProps = {
    children: null
};

/**
 * @typedef tabBoundaryPropsType
 * @property {*} [children=null] - React prop.
 */

/**
 * @description A div that acts as a container for tab navigation events.
 * @param {tabBoundaryPropsType} props - Component props.
 * @returns {Object<string,*>} React component.
 */
function TabBoundary(props: Props) {
    const {children, ...other} = props;

    return <div {...other}>{children}</div>;
}

export {TabBoundary};
