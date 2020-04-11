/** @module core/modules/date-utils/is-leap-year */

/**
 * @description Returns true if indicated year is a leap year and false otherwise.
 * @param {number} year - Input year.
 * @returns {boolean} Result.
 */
function isLeapYear(year) {
    return !!(!(year % 4) && year % 100) || !(year % 400);
}

export {isLeapYear};
