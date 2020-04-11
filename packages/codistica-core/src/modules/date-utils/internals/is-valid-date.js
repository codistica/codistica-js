/** @module core/modules/date-utils/is-valid-date */

/**
 * @description Returns true if the input is a valid date and false otherwise.
 * @param {*} input - Input value.
 * @returns {boolean} Result.
 */
function isValidDate(input) {
    return input instanceof Date && !Number.isNaN(input.getTime());
}

export {isValidDate};
