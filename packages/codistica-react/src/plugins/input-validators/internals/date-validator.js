/** @module react/plugins/input-validators/date-validator */

import {dateUtils, numberUtils, regExpUtils} from '@codistica/core';
import {Types} from '@codistica/types';

// TODO: ADD SUPPORT FOR NUMBER OF YEARS BEFORE AND AFTER TODAY IN minDate AND maxDate.

const dateValidatorSchema = new Types({
    options: {
        type: 'Object',
        def: {
            minDate: {type: 'Object', def: null},
            maxDate: {type: 'Object', def: null},
            minAge: {type: 'number', min: 0, max: Infinity, def: null},
            format: {type: 'Array<number>', def: [31, 12, 9999]}, // TODO: USE ANOTHER SYSTEM?
            separator: {type: 'string', def: null}
        }
    }
});

/**
 * @typedef dateValidatorOptionsType
 * @property {(Date|null)} [minDate=null] - Minimum required date.
 * @property {(Date|null)} [maxDate=null] - Maximum acceptable date.
 * @property {(number|null)} [minAge=null] - Minimum required age.
 * @property {Array<number>} [format=[31, 12, 9999]] - Enforced format.
 * @property {string} [separator=null] - Enforced separator.
 */

/**
 * @description Validates input date according to validation options.
 * @param {dateValidatorOptionsType} [options] - Validation options.
 * @returns {{type: 'validator', plugin: function(string): {result: boolean, report: Object<string,*>}}} Validator.
 */
function dateValidator(options) {
    ({options} = dateValidatorSchema.validate({options}));

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
                interpretation: null,
                minDate: true,
                maxDate: true,
                minAge: true,
                exists: true,
                format: true,
                separator: true
            };

            let today = new Date();

            let formatOrder = options.format.map((val) => {
                // TODO: SORT INSTEAD! (USE ANOTHER SYSTEM?)
                if (val > 31) {
                    return 'year';
                } else if (val > 12) {
                    return 'date';
                } else {
                    return 'month';
                }
            });

            let dateArray = numberUtils.parseIntAll(value) || [];

            let dateElements = {
                date: null,
                month: null,
                year: null
            };

            let parsedDate;

            // CHECK FORMAT
            if (dateArray.length !== options.format.length) {
                report.format = false;
            } else {
                formatOrder.forEach((key, index) => {
                    if (dateArray[index] > options.format[index]) {
                        report.format = false;
                    }
                    dateElements[key] = parseInt(dateArray[index]);
                });
                dateElements.year = dateUtils.getValidFullYear(
                    dateElements.year
                );
                dateElements.month--;
            }

            if (!report.format) {
                report.minDate = null;
                report.maxDate = null;
                report.minAge = null;
                report.exists = null;
                report.format = false;
                report.separator = null;
                result = false;
            } else {
                // CHECK SEPARATOR
                if (options.separator !== null) {
                    if (
                        (
                            value.match(
                                new RegExp(
                                    regExpUtils.escape(options.separator),
                                    'g'
                                )
                            ) || []
                        ).length !==
                            options.format.length - 1 ||
                        (value.match(/\D/g) || []).length !==
                            options.format.length - 1
                    ) {
                        report.separator = false;
                        result = false;
                    }
                }

                // PARSE DATE
                parsedDate = new Date(
                    dateElements.year,
                    dateElements.month,
                    dateElements.date
                );

                // CHECK EXISTENCE
                if (
                    parsedDate.getFullYear() !== dateElements.year ||
                    parsedDate.getMonth() !== dateElements.month ||
                    parsedDate.getDate() !== dateElements.date
                ) {
                    report.exists = false;
                    report.minDate = null;
                    report.maxDate = null;
                    report.minAge = null;
                    result = false;
                } else {
                    // SAVE INTERPRETATION
                    report.interpretation = parsedDate.toString();

                    // CHECK MIN DATE
                    if (
                        options.minDate !== null &&
                        parsedDate < options.minDate
                    ) {
                        report.minDate = false;
                        result = false;
                    }

                    // CHECK MAX DATE
                    if (
                        options.maxDate !== null &&
                        parsedDate > options.maxDate
                    ) {
                        report.maxDate = false;
                        result = false;
                    }

                    // CHECK MIN AGE
                    if (
                        options.minAge !== null &&
                        new Date(parsedDate.getTime()).setFullYear(
                            parsedDate.getFullYear() + options.minAge
                        ) > today
                    ) {
                        report.minAge = false;
                        result = false;
                    }
                }
            }

            return {
                result,
                report
            };
        }
    };
}

export {dateValidator};
