/** @flow */

import {
    mergeClassNames,
    mergeStyles,
    createSophistication
} from '@codistica/react';
import React, {forwardRef} from 'react';
import componentClassNames from './index.module.scss';

// TODO: FIX <any, any>
// TODO: CORRECTLY TYPE ANNOTATE HOC.
// TODO: ADD defaultProps?
// TODO: ADD SUPPORT FOR SVG EFFECTS/FILTERS. (IS elements PROP SUFFICIENT?)

type Props = {
    children: any,
    elements: any,
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
    const {
        children,
        elements,
        className,
        style,
        color,
        title,
        viewBox,
        size,
        ...other
    } = props;

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
            style={mergeStyles(
                {
                    height: size,
                    width: size
                },
                style
            )}>
            {title ? <title>{title}</title> : null}
            {elements}
            {children}
        </svg>
    );
});

export {SvgIcon};
