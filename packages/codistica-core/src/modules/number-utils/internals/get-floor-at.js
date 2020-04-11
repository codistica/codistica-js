/** @module core/modules/number-utils/get-floor-at */

import {isPositiveZero} from './is-positive-zero.js';

/**
 * @description Returns the base of the number at the selected level.
 * @param {number} num - Input number.
 * @param {number} lvl - Base level.
 * @returns {(number|null)} Base.
 */
function getFloorAt(num, lvl) {
    let x = null;
    let length = num.toString().length;
    if (Math.abs(lvl) >= length) {
        return null;
    } else if (lvl > 0 || isPositiveZero(lvl)) {
        x = 10 ** (length - lvl - 1);
        return Math.floor(num / x) * x;
    } else {
        x = 10 ** (lvl * -1);
        return Math.floor(num / x) * x;
    }
}

export {getFloorAt};
