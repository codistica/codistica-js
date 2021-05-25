/** @flow */

import React, {useRef, useEffect} from 'react';

// TODO: WORK IN PROGRESS.
// TODO: CAN SCROLLING ISOLATION BE ACHIEVED BY USING REACT PORTALS? TRY CLASSIC SOLUTION FIRST. INVESTIGATE.
// TODO: REMOVE IF WORKS EXACTLY AS OverscrollBlocker? OR LEAVE AS A "WRAPPER"?

type Props = {
    children: any
};

function ScrollBoundary(props: Props) {
    const elementRef = useRef(null);
    const {children, ...other} = props;

    useEffect(() => {
        const handler = function handler(e: {[string]: any}) {
            console.log(e);
        };
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
        <div {...other} ref={elementRef}>
            {children}
        </div>
    );
}

ScrollBoundary.defaultProps = {
    children: null
};

export {ScrollBoundary};
