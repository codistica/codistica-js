/** @module core/modules/date-utils/parse-seconds */

// TODO: RENAME TO secondsToClock.

/**
 * @typedef parseSecondsReturnType
 * @property {number} hours - Hours.
 * @property {number} minutes - Minutes.
 * @property {number} seconds - Seconds.
 */

/**
 * @description Transform seconds to an array of hours.
 * @param {number} seconds - Seconds.
 * @returns {parseSecondsReturnType} Parsed object.
 */
function parseSeconds(seconds) {
    return {
        hours: Math.floor(seconds / 3600),
        minutes: Math.floor((seconds % 3600) / 60),
        seconds: Math.floor((seconds % 3600) % 60)
    };
}

export {parseSeconds};
