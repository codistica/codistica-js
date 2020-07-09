/** @module react/plugins/input-validators/email-validator */

import {REG_EXPS} from '@codistica/core';
import {Types} from '@codistica/types';

const emailValidatorSchema = new Types({
    options: {
        type: 'Object',
        def: {
            errorMessages: {
                type: 'Object',
                def: {
                    generic: {
                        type: ['string', 'Function', 'Object', 'null'],
                        def: null
                    }
                }
            }
        }
    }
});

/**
 * @typedef emailValidatorErrorMessagesType
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [generic=null] - Generic error message.
 */

/**
 * @typedef emailValidatorOptionsType
 * @property {emailValidatorErrorMessagesType} [errorMessages] - Validation error messages.
 */

/**
 * @description Validates input email address format.
 * @param {emailValidatorOptionsType} [options] - Validation options.
 * @returns {{type: 'validator', name: string, messages: Array<string>, plugin: RegExp}} Validator.
 */
function emailValidator(options) {
    ({options} = emailValidatorSchema.validate({options}));

    return {
        type: 'validator',
        name: 'emailValidator',
        errorMessages: {
            generic: options.errorMessages.generic
        },
        plugin: REG_EXPS.IS_EMAIL
    };
}

export {emailValidator};
