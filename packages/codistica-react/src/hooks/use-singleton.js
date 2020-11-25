/** @flow */

import {useRef} from 'react';

function useSingleton(cb: (...args: Array<any>) => any) {
    const called = useRef(false);
    if (called.current) {
        return;
    }
    if (cb) {
        cb();
    }
    called.current = true;
}

export {useSingleton};
