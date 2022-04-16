/** @module browser/modules/escape-css */

import {REG_EXPS} from '@codistica/core';

/**
 * @description Escapes CSS identifiers (similar to experimental CSS.escape).
 * @param {string} str - Raw string.
 * @returns {string} - Escaped string.
 */
function escapeCSS(str) {
    return str.replace(REG_EXPS.CSS_RESERVED, '\\$1');
}

export {escapeCSS};
