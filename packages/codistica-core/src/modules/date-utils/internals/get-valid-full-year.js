/** @module core/modules/date-utils/get-valid-full-year */

import {getFloorAt} from '../../number-utils/internals/get-floor-at.js';

/**
 * @description Converts a two digit short year to the most probable full year match.
 * @param {number} shortYear - Short year to be converted.
 * @returns {number} Matched full year.
 */
function getValidFullYear(shortYear) {
    const fullYear = new Date().getFullYear();
    const base = getFloorAt(fullYear, -2);
    const prevBase = getFloorAt(base - 1, -2);
    const min = fullYear - base;
    const max = 99;
    if (shortYear <= min) {
        return base + shortYear;
    } else if (shortYear <= max) {
        return prevBase + shortYear;
    } else {
        return shortYear;
    }
}

export {getValidFullYear};
