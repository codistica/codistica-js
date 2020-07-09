/** @module react/plugins/input-validators/password-validator */

import {REG_EXPS} from '@codistica/core';
import {Types} from '@codistica/types';
import {InputValidatorPluginUtils} from '../../../classes/input-validator-plugin-utils.js';

const passwordValidatorSchema = new Types({
    options: {
        type: 'Object',
        def: {
            minLength: {type: 'number', min: 0, max: Infinity, def: 0},
            maxLength: {type: 'number', min: 0, max: Infinity, def: Infinity},
            numbers: {type: 'number', min: 0, max: Infinity, def: 1},
            lowercases: {type: 'number', min: 0, max: Infinity, def: 1},
            uppercases: {type: 'number', min: 0, max: Infinity, def: 1},
            specials: {type: 'number', min: 0, max: Infinity, def: 1},
            errorMessages: {
                type: 'Object',
                def: {
                    generic: {
                        type: ['string', 'Function', 'Object', 'null'],
                        def: null
                    },
                    length: {
                        type: ['string', 'Function', 'Object', 'null'],
                        def: null
                    },
                    numbers: {
                        type: ['string', 'Function', 'Object', 'null'],
                        def: null
                    },
                    lowercases: {
                        type: ['string', 'Function', 'null'],
                        def: null
                    },
                    uppercases: {
                        type: ['string', 'Function', 'null'],
                        def: null
                    },
                    specials: {
                        type: ['string', 'Function', 'Object', 'null'],
                        def: null
                    }
                }
            }
        }
    }
});

/**
 * @typedef passwordValidatorErrorMessagesType
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [generic=null] - Generic error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [length=null] - Wrong length error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [numbers=null] - Minimum required numbers error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [lowercases=null] - Minimum required lowercase characters error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [uppercases=null] - Minimum required uppercase characters error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [specials=null] - Minimum required special characters error message.
 */

/**
 * @typedef passwordValidatorOptionsType
 * @property {number} [minLength=0] - Minimum password length.
 * @property {number} [maxLength=Infinity] - Maximum password length.
 * @property {number} [numbers=1] - Minimum required numbers.
 * @property {number} [lowercases=1] - Minimum required lowercase characters.
 * @property {number} [uppercases=1] - Minimum required uppercase characters.
 * @property {number} [specials=1] - Minimum required special characters.
 * @property {passwordValidatorErrorMessagesType} [errorMessages] - Validation error messages.
 */

/**
 * @description Validates input password according to validation options.
 * @param {passwordValidatorOptionsType} [options] - Validation options.
 * @returns {{type: 'validator', name: string, messages: Array<string>, plugin: function(string): Object<string,*>}} Validator.
 */
function passwordValidator(options) {
    ({options} = passwordValidatorSchema.validate({options}));

    const utils = new InputValidatorPluginUtils({
        keys: ['length', 'numbers', 'lowercases', 'uppercases', 'specials']
    });

    return {
        type: 'validator',
        name: 'passwordValidator',
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

            let strength = 5;

            // CHECK LENGTH
            if (
                value.length < options.minLength ||
                value.length > options.maxLength
            ) {
                utils.invalidate('length', options.errorMessages.length, {
                    min: options.minLength,
                    max: options.maxLength,
                    current: value.length
                });
                strength--;
            }

            // CHECK NUMBERS
            const currentNumbers = (value.match(/\d/g) || []).length;
            if (currentNumbers < options.numbers) {
                utils.invalidate('numbers', options.errorMessages.numbers, {
                    min: options.numbers,
                    current: currentNumbers
                });
                strength--;
            }

            // CHECK LOWERCASES
            const currentLowercases = (value.match(/[a-z]/g) || []).length;
            if (currentLowercases < options.lowercases) {
                utils.invalidate(
                    'lowercases',
                    options.errorMessages.lowercases,
                    {
                        min: options.lowercases,
                        current: currentLowercases
                    }
                );
                strength--;
            }

            // CHECK UPPERCASES
            const currentUppercases = (value.match(/[A-Z]/g) || []).length;
            if (currentUppercases < options.uppercases) {
                utils.invalidate(
                    'uppercases',
                    options.errorMessages.uppercases,
                    {
                        min: options.uppercases,
                        current: currentUppercases
                    }
                );
                strength--;
            }

            // CHECK SPECIALS
            const currentSpecials = (value.match(REG_EXPS.SPECIALS) || [])
                .length;
            if (currentSpecials < options.specials) {
                utils.invalidate('specials', options.errorMessages.specials, {
                    min: options.specials,
                    current: currentSpecials
                });
                strength--;
            }

            utils.setData('strength', strength);

            return utils.getValidatorOutput();
        }
    };
}

export {passwordValidator};
