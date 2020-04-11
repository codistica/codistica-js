/** @module core/modules/string-utils/inject-before */

/**
 * @description Adds zeros to the beginning of the string until specified length is reached.
 * @param {(string|number)} str - Input string.
 * @param {number} length - Desired length.
 * @param {string} [char=' '] - Character to be injected.
 * @returns {string} Resulting string.
 */
function injectBefore(str, length, char) {
    let count = length - (str = str.toString()).length;
    if (count <= 0) {
        return str;
    } else {
        while (count > 0) {
            str = (char || ' ') + str;
            count--;
        }
    }
    return str;
}

export {injectBefore};
