/** @module react/plugins/input-validators/email-validator */

import {REG_EXPS} from '@codistica/core';

/**
 * @description Validates input email address format.
 * @returns {{type: 'validator', plugin: RegExp}} Validator.
 */
function emailValidator() {
    return {
        type: 'validator',
        plugin: REG_EXPS.IS_EMAIL
    };
}

export {emailValidator};
