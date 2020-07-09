/** @flow */

/** @module react/utils/scroll-boundary */

import React, {useRef, useEffect} from 'react';

// TODO: WORK IN PROGRESS.

type Props = {
    children: any
};

// TODO: CAN SCROLLING ISOLATION BE ACHIEVED BY USING REACT PORTALS? TRY CLASSIC SOLUTION FIRST. INVESTIGATE.
// TODO: REMOVE IF WORKS EXACTLY AS OverscrollBlocker? OR LEAVE AS A "WRAPPER"?

ScrollBoundary.defaultProps = {
    children: null
};

/**
 * @typedef scrollBoundaryPropsType
 * @property {*} [children=null] - React prop.
 */

/**
 * @description A div that acts as a trap for scroll related events propagation.
 * @param {scrollBoundaryPropsType} props - Component props.
 * @returns {Object<string,*>} React component.
 */
function ScrollBoundary(props: Props) {
    const elementRef = useRef(null);
    const {children, ...other} = props;

    useEffect(() => {
        const elem = elementRef.current;
        if (elem) {
            elem.addEventListener('touchstart', handler);
            elem.addEventListener('touchmove', handler);
            elem.addEventListener('touchend', handler);
            elem.addEventListener('wheel', handler);
        }
        return () => {
            if (elem) {
                elem.removeEventListener('touchstart', handler);
                elem.removeEventListener('touchmove', handler);
                elem.removeEventListener('touchend', handler);
                elem.removeEventListener('wheel', handler);
            }
        };
    }, []);

    return (
        <div {...other} ref={(ref) => (elementRef.current = ref)}>
            {children}
        </div>
    );

    /**
     * @description Handler.
     * @param {Object<string,*>} e - Event object.
     * @returns {void} Void.
     */
    function handler(e: {[string]: any}) {
        console.log(e);
    }
}

export {ScrollBoundary};
