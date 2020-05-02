/** @module react/plugins/input-blockers/non-letter-blocker */

import {REG_EXPS} from '@codistica/core';

/**
 * @description Blocks non letter keystrokes.
 * @returns {{type: 'blocker', plugin: function(Object<string,*>): boolean}} Blocker.
 */
function nonLetterBlocker() {
    return {
        type: 'blocker',
        /**
         * @description Blocker.
         * @param {Object<string,*>} e - Input event.
         * @returns {string} - Should block.
         */
        plugin(e) {
            return REG_EXPS.NON_LETTERS.test(e.key);
        }
    };
}

export {nonLetterBlocker};
