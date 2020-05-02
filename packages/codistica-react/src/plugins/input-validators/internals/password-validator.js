/** @module react/plugins/input-validators/password-validator */

import {REG_EXPS} from '@codistica/core';
import {Types} from '@codistica/types';

const passwordValidatorSchema = new Types({
    options: {
        type: 'Object',
        def: {
            strength: {type: 'number', min: 0, max: 5, def: 5},
            minLength: {type: 'number', min: 0, max: Infinity, def: 0},
            maxLength: {type: 'number', min: 0, max: Infinity, def: Infinity},
            numbers: {type: 'number', min: 0, max: Infinity, def: 1},
            lowercases: {type: 'number', min: 0, max: Infinity, def: 1},
            uppercases: {type: 'number', min: 0, max: Infinity, def: 1},
            specials: {type: 'number', min: 0, max: Infinity, def: 1}
        }
    }
});

/**
 * @typedef passwordValidatorOptionsType
 * @property {number} [strength=5] - Minimum required password strength.
 * @property {number} [numbers=1] - Minimum required numbers.
 * @property {number} [lowercases=1] - Minimum required lowercase characters.
 * @property {number} [uppercases=1] - Minimum required uppercase characters.
 * @property {number} [specials=1] - Minimum required special characters.
 * @property {number} [minLength=0] - Minimum password length.
 * @property {number} [maxLength=Infinity] - Maximum password length.
 */

/**
 * @description Validates input password according to validation options.
 * @param {passwordValidatorOptionsType} [options] - Validation options.
 * @returns {{type: 'validator', plugin: function(string): {result: boolean, report: Object<string,*>}}} Validator.
 */
function passwordValidator(options) {
    ({options} = passwordValidatorSchema.validate({options}));

    return {
        type: 'validator',
        /**
         * @description Validator.
         * @param {string} value - Input value.
         * @returns {{result: boolean, report: Object<string,*>}} - Validation object.
         */
        plugin(value) {
            let result = true;
            let report = {
                strength: 5,
                length: true,
                numbers: true,
                lowercases: true,
                uppercases: true,
                specials: true
            };

            // CHECK LENGTH
            if (
                value.length < options.minLength ||
                value.length > options.maxLength
            ) {
                report.strength--;
                report.length = false;
            }

            // CHECK NUMBERS
            if ((value.match(/\d/g) || []).length < options.numbers) {
                report.strength--;
                report.numbers = false;
            }

            // CHECK LOWERCASES
            if ((value.match(/[a-z]/g) || []).length < options.lowercases) {
                report.strength--;
                report.lowercases = false;
            }

            // CHECK UPPERCASES
            if ((value.match(/[A-Z]/g) || []).length < options.uppercases) {
                report.strength--;
                report.uppercases = false;
            }

            // CHECK SPECIALS
            if (
                (value.match(REG_EXPS.SPECIALS) || []).length < options.specials
            ) {
                report.strength--;
                report.specials = false;
            }

            result = report.strength >= options.strength;

            return {
                result,
                report
            };
        }
    };
}

export {passwordValidator};
