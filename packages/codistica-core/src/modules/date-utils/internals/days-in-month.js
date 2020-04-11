/** @module core/modules/date-utils/days-in-month */

/**
 * @description Returns the number of days in the specified month of the specified year.
 * @param {number} month - Month (1-based).
 * @param {number} year - Year.
 * @returns {number} Number of days.
 */
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

export {daysInMonth};
