/** @module core/modules/memoize-hof */

import {FunctionCache} from '../classes/function-cache.js';

/**
 * @description Creates a higher-order-function with fully integrated cache capabilities.
 * @param {Function} fn - Input function.
 * @returns {Function} Created higher-order-function.
 */
function memoizeHOF(fn) {
    const cache = new FunctionCache();
    return function (...args) {
        let val = null;
        if (!cache.has(...args)) {
            val = fn(...args);
            cache.set(...args, val);
        } else {
            val = cache.get(...args);
        }
        return val;
    };
}

export {memoizeHOF};
