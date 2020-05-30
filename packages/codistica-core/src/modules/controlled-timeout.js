/** @module core/modules/controlled-timeout */

/**
 * @typedef controlledTimeoutReturnType
 * @property {Function} clear - Clear timeout method.
 * @property {Function} trigger - Trigger timeout method.
 * @property {function(Function): void} changeCallback - Change timeout callback method.
 */

/**
 * @description Returns a setTimeout wrapper with clear and trigger capabilities.
 * @param {Function} callback - Timeout callback.
 * @param {number} delay - Timeout duration in milliseconds.
 * @returns {(controlledTimeoutReturnType|null)} Wrapper commands or null if no valid handler is passed.
 */
function controlledTimeout(callback, delay) {
    // TODO: CREATE PROMISIFIED controlledTimeout() OR PROMISIFIED setTimeout(). HERE? APART?

    let timeoutId = null;

    if (typeof callback !== 'function') {
        // IMPORTANT. SANITIZE INPUT. IMPROVES SECURITY
        return null;
    }

    timeoutId = setTimeout(() => {
        callback();
    }, delay);

    return {
        /**
         * @description Clears created timout preventing handler execution.
         * @returns {void} Void.
         */
        clear() {
            clearTimeout(timeoutId);
        },
        /**
         * @description Immediately triggers created timout executing handler.
         * @returns {*} Handler's return value.
         */
        trigger() {
            clearTimeout(timeoutId);
            // PASSED ARGUMENT INDICATES TRIGGER
            return callback(true);
        },
        /**
         * @description Changes current callback function with the passed one.
         * @param {Function} newCallback - New timeout callback.
         * @returns {void} Void.
         */
        changeCallback(newCallback) {
            callback = newCallback;
        }
    };
}

export {controlledTimeout};
