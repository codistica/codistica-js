/** @module core/modules/create-heartbeat-timeout */

/**
 * @callback createHeartbeatTimeoutFunction
 * @param {Function} callback - Trigger callback.
 * @param {number} threshold - Timer duration.
 * @param {boolean} [defuse] - Defuse trigger.
 * @returns {void} Void.
 */

/**
 * @description Creates an inverse trigger function.
 * @returns {createHeartbeatTimeoutFunction} Inverse trigger function.
 */
function createHeartbeatTimeout() {
    let timer = null;
    return (callback, threshold, defuse) => {
        // CLEAR TIMER
        clearTimeout(timer);
        if (defuse) {
            return;
        }
        // RECREATE TIMER
        timer = setTimeout(() => {
            callback();
        }, threshold);
    };
}

export {createHeartbeatTimeout};
