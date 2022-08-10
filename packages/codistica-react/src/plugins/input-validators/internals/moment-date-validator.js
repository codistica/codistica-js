/** @module react/plugins/input-validators/moment-date-validator */

import {Types} from '@codistica/types';
import {InputValidatorPluginUtils} from '../../../classes/input-validator-plugin-utils.js';

// TODO: WORK IN PROGRESS.
// TODO: ADD stringifier AND parser AS STATIC METHODS.

const messageSchema = {
    type: ['string', 'Function', 'Object', 'null'],
    def: null
};

const momentDateValidatorTypes = new Types({
    options: {
        type: 'Object',
        def: {
            minDate: {type: 'Object', def: null},
            maxDate: {type: 'Object', def: null},
            minAge: {type: 'number', min: 0, max: Infinity, def: null},
            format: {type: 'Array<number>', def: [31, 12, 9999]},
            separator: {type: 'string', def: null},
            errorMessages: {
                type: 'Object',
                def: {
                    generic: messageSchema,
                    minDate: messageSchema,
                    maxDate: messageSchema,
                    minAge: messageSchema,
                    format: messageSchema,
                    separator: messageSchema
                }
            }
        }
    }
});

/**
 * @typedef momentDateValidatorErrorMessagesType
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [generic=null] - Generic error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [minDate=null] - Minimum required date error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [maxDate=null] - Maximum acceptable date error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [minAge=null] - Minimum required age error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [format=null] - Enforced format error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [separator=null] - Enforced separator error message.
 */

/**
 * @typedef momentDateValidatorOptionsType
 * @property {(Date|null)} [minDate=null] - Minimum required date.
 * @property {(Date|null)} [maxDate=null] - Maximum acceptable date.
 * @property {(number|null)} [minAge=null] - Minimum required age.
 * @property {Array<number>} [format=[31, 12, 9999]] - Enforced format.
 * @property {string} [separator=null] - Enforced separator.
 * @property {momentDateValidatorErrorMessagesType} [errorMessages] - Validation error messages.
 */

/**
 * @description Validates input date according to validation options.
 * @param {momentDateValidatorOptionsType} [options] - Validation options.
 * @returns {{type: 'validator', name: string, messages: Array<string>, plugin: function(string): Object<string,*>}} Validator.
 */
function momentDateValidator(options) {
    ({options} = momentDateValidatorTypes.validate({options}));

    const utils = new InputValidatorPluginUtils({
        keys: ['minDate', 'maxDate', 'minAge', 'format', 'separator']
    });

    return {
        type: 'validator',
        name: 'momentDateValidator',
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
            utils.setData('interpretation', null);

            return utils.getValidatorOutput();
        }
    };
}

export {momentDateValidator};
