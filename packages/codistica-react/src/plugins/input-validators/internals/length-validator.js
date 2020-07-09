/** @module react/plugins/input-validators/length-validator */

import {Types} from '@codistica/types';
import {InputValidatorPluginUtils} from '../../../classes/input-validator-plugin-utils.js';

const lengthValidatorSchema = new Types({
    options: {
        type: 'Object',
        def: {
            minLength: {type: 'number', min: 0, max: Infinity, def: 0},
            maxLength: {type: 'number', min: 0, max: Infinity, def: Infinity},
            errorMessages: {
                type: 'Object',
                def: {
                    generic: {
                        type: ['string', 'Function', 'Object', 'null'],
                        def: null
                    },
                    minLength: {
                        type: ['string', 'Function', 'null'],
                        def: null
                    },
                    maxLength: {
                        type: ['string', 'Function', 'Object', 'null'],
                        def: null
                    }
                }
            }
        }
    }
});

/**
 * @typedef lengthValidatorErrorMessagesType
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [generic=null] - Generic error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [minLength=null] - Minimum required length error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [maxLength=null] - Maximum acceptable length error message.
 */

/**
 * @typedef lengthValidatorOptionsType
 * @property {number} [minLength=0] - Input minimum length.
 * @property {number} [maxLength=Infinity] - Input maximum length.
 * @property {lengthValidatorErrorMessagesType} [errorMessages] - Validation error messages.
 */

/**
 * @description Validates input length according to validation options.
 * @param {lengthValidatorOptionsType} [options] - Validation options.
 * @returns {{type: 'validator', name: string, messages: Array<string>, plugin: function(string): Object<string,*>}} Validator.
 */
function lengthValidator(options) {
    ({options} = lengthValidatorSchema.validate({options}));

    const utils = new InputValidatorPluginUtils({
        keys: ['minLength', 'maxLength']
    });

    return {
        type: 'validator',
        name: 'lengthValidator',
        errorMessages: {
            generic: options.errorMessages.generic
        },
        /**
         * @description Validator.
         * @param {string} value - Input value.
         * @returns {Object<string,*>} - Validation object.
         */
        plugin(value) {
            utils.init(value, true);

            // CHECK MIN LENGTH
            if (value.length < options.minLength) {
                utils.invalidate('minLength', options.errorMessages.minLength);
            }

            // CHECK MAX LENGTH
            if (value.length > options.maxLength) {
                utils.invalidate('maxLength', options.errorMessages.maxLength);
            }

            return utils.getValidatorOutput();
        }
    };
}

export {lengthValidator};
