/** @flow */

import {useRef} from 'react';

function useSingleton(cb: (...args: Array<any>) => any) {
    const calledRef = useRef(false);
    if (calledRef.current) {
        return;
    }
    if (cb) {
        cb();
    }
    calledRef.current = true;
}

export {useSingleton};
