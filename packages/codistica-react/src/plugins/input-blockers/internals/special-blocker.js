/** @module react/plugins/input-blockers/special-blocker */

import {REG_EXPS} from '@codistica/core';

/**
 * @description Blocks specials keystrokes.
 * @returns {{type: 'blocker', name: string, plugin: function(Object<string,*>): boolean}} Blocker.
 */
function specialBlocker() {
    return {
        type: 'blocker',
        name: 'specialBlocker',
        /**
         * @description Blocker.
         * @param {Object<string,*>} e - Input event.
         * @returns {string} - Should block.
         */
        plugin(e) {
            return REG_EXPS.SPECIALS.test(e.key);
        }
    };
}

export {specialBlocker};
