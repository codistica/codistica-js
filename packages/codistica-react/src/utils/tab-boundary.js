/** @flow */

import React from 'react';

// TODO: WORK IN PROGRESS.

type Props = {
    children: any
};

function TabBoundary(props: Props) {
    const {children, ...other} = props;

    return <div {...other}>{children}</div>;
}

TabBoundary.defaultProps = {
    children: null
};

export {TabBoundary};
