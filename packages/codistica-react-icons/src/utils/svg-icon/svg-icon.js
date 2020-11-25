/** @flow */

import {mergeClassNames, createSophistication} from '@codistica/react';
import React, {forwardRef} from 'react';
import componentClassNames from './index.module.scss';

// TODO: FIX <any, any>
// TODO: CORRECTLY TYPE ANNOTATE HOC.
// TODO: ADD defaultProps?

type Props = {
    children: any,
    className: string,
    style: {[string]: any},
    color: string,
    title: string,
    viewBox: string,
    size: string | number | null
};

const useSophistication = createSophistication({
    root: {
        '& *': {
            fill: ({color}) => (color ? 'currentColor' : null),
            color: ({color}) => color || null
        }
    }
});

const SvgIcon = forwardRef<any, any>(function SvgIcon(props: Props, ref) {
    const {children, className, color, title, viewBox, size, ...other} = props;

    const jssClassNames = useSophistication({color});

    return (
        <svg
            {...other}
            ref={ref}
            viewBox={viewBox || '0 0 512 512'}
            className={mergeClassNames(
                jssClassNames.root,
                componentClassNames.root,
                className
            )}
            focusable={'false'}
            style={{
                height: size,
                width: size
            }}>
            {title ? <title>{title}</title> : null}
            {children}
        </svg>
    );
});

export {SvgIcon};
