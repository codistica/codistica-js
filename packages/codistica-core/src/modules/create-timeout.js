/** @module core/modules/create-timeout */

/**
 * @description Returns a setTimeout wrapper with clear and trigger capabilities.
 * @param {Function} timeoutHandler - Timeout callback.
 * @param {number} delay - Timeout duration in milliseconds.
 * @returns {({clear: Function, trigger: Function}|null)} Wrapper commands or null if no valid handler is passed.
 */
function createTimeout(timeoutHandler, delay) {
    // TODO: CREATE PROMISIFIED createTimeout() OR PROMISIFIED setTimeout(). HERE? APART?

    let timeoutId = null;

    if (typeof timeoutHandler !== 'function') {
        // IMPORTANT. SANITIZE INPUT. IMPROVES SECURITY
        return null;
    }

    timeoutId = setTimeout(timeoutHandler, delay);

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
            return timeoutHandler(true);
        }
    };
}

export {createTimeout};
