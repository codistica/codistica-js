/** @flow */

import React from 'react';
import {HoverSwitch, createSophistication} from '../../../../src/index.js';

const useSophistication = createSophistication({
    root: {
        display: 'flex',
        '& > *': {
            margin: 15
        }
    }
});

const commonStyles = {
    display: 'flex',
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
};

const defaultProps = {
    style: {
        ...commonStyles,
        backgroundColor: '#12fa41'
    }
};

const onHoverProps = {
    style: {
        ...commonStyles,
        backgroundColor: '#abfaa1'
    }
};

function Simple() {
    const jssClassNames = useSophistication();
    return (
        <div className={jssClassNames.root}>
            <HoverSwitch
                defaultRender={<span {...defaultProps}>{'DEFAULT'}</span>}
                onHoverRender={<span {...onHoverProps}>{'HOVERED'}</span>}
            />
            <HoverSwitch
                defaultRender={'span'}
                defaultProps={defaultProps}
                onHoverProps={{...onHoverProps, children: 'HOVERED'}}>
                {'DEFAULT'}
            </HoverSwitch>
        </div>
    );
}

export {Simple};
