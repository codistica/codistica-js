/** @module react/plugins/input-validators/word-validator */

import {Types} from '@codistica/types';
import {InputValidatorPluginUtils} from '../../../classes/input-validator-plugin-utils.js';

const wordValidatorSchema = new Types({
    options: {
        type: 'Object',
        def: {
            valid: {type: 'Array<string>', def: []},
            invalid: {type: 'Array<string>', def: []},
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
 * @typedef wordValidatorErrorMessagesType
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [generic=null] - Generic error message.
 */

/**
 * @typedef wordValidatorOptionsType
 * @property {Array<string>} [valid=[]] - Valid words array.
 * @property {Array<string>} [invalid=[]] - Invalid words array.
 * @property {wordValidatorErrorMessagesType} [errorMessages] - Validation error messages.
 */

/**
 * @description Validates input according to validation options.
 * @param {wordValidatorOptionsType} [options] - Validation options.
 * @returns {{type: 'validator', name: string, messages: Array<string>, plugin: function(string): Object<string,*>}} Validator.
 */
function wordValidator(options) {
    ({options} = wordValidatorSchema.validate({options}));

    const utils = new InputValidatorPluginUtils();

    return {
        type: 'validator',
        name: 'wordValidator',
        errorMessages: {
            generic: options.errorMessages.generic
        },
        /**
         * @description Validator.
         * @param {string} value - Input value.
         * @returns {Object<string,*>} - Validation object.
         */
        plugin(value) {
            utils.init(value, null);

            if (options.valid.some((word) => value === word)) {
                utils.validate();
            } else if (options.invalid.some((word) => value === word)) {
                utils.invalidate();
            }

            return utils.getValidatorOutput();
        }
    };
}

export {wordValidator};
