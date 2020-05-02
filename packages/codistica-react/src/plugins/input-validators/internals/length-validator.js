/** @module react/plugins/input-validators/length-validator */

import {Types} from '@codistica/types';

const lengthValidatorSchema = new Types({
    options: {
        type: 'Object',
        def: {
            minLength: {type: 'number', min: 0, max: Infinity, def: 0},
            maxLength: {type: 'number', min: 0, max: Infinity, def: Infinity}
        }
    }
});

/**
 * @typedef lengthValidatorOptionsType
 * @property {number} [minLength=0] - Input minimum length.
 * @property {number} [maxLength=Infinity] - Input maximum length.
 */

/**
 * @description Validates input length according to validation options.
 * @param {lengthValidatorOptionsType} [options] - Validation options.
 * @returns {{type: 'validator', plugin: function(string): {result: boolean, report: Object<string,*>}}} Validator.
 */
function lengthValidator(options) {
    ({options} = lengthValidatorSchema.validate({options}));

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
                minLength: true,
                maxLength: true
            };

            // CHECK MIN LENGTH
            if (value.length < options.minLength) {
                report.minLength = false;
            }

            // CHECK MAX LENGTH
            if (value.length > options.maxLength) {
                report.maxLength = false;
            }

            result = report.minLength && report.maxLength;

            return {
                result,
                report
            };
        }
    };
}

export {lengthValidator};
