/** @module core/modules/conditional-timeout */

import {controlledTimeout} from './controlled-timeout.js';

/**
 * @typedef conditionalTimeoutReturnType
 * @property {Function} clear - Clear timeout method.
 * @property {Function} trigger - Trigger timeout method.
 * @property {function(Function): void} changeCallback - Change timeout callback method.
 */

/**
 * @description Uses timeout conditionally to run callback.
 * @param {boolean} condition - Timeout condition.
 * @param {Function} callback - Timeout callback.
 * @param {number} delay - Timeout duration in milliseconds.
 * @returns {(conditionalTimeoutReturnType|null)} Wrapper commands or null if no timeout was created.
 */
function conditionalTimeout(condition, callback, delay) {
    if (condition) {
        return controlledTimeout(callback, delay);
    } else {
        callback();
        return null;
    }
}

export {conditionalTimeout};
