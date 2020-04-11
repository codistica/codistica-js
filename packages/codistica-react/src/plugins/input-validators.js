/** @module react/plugins/input-validators */

import {REG_EXPS, DateUtils, RegExpUtils, NumberUtils} from '@codistica/core';

/**
 * @classdesc Input validators plugin for @codistica/react Input component.
 */
class InputValidators {
    // TODO: CREATE VALIDATOR FOR FILTERS AND BLOCKERS (CAN BE COMMON)

    /**
     * @description Email address validator.
     * @returns {RegExp} RegExp.
     */
    static get email() {
        return REG_EXPS.IS_EMAIL;
    }

    static presence = /.+/;

    /**
     * @description Creates input length validator. Validates input according to validation options.
     * @param {Object<string,*>} [options] - Validation options.
     * @param {number} [options.minLength=0] - Input minimum length.
     * @param {number} [options.maxLength=Infinity] - Input maximum length.
     * @returns {function(string): {result: boolean, report: {minLength: boolean, maxLength: boolean}}} Validation function.
     */
    static length(options) {
        if (typeof options !== 'object') {
            options = {
                minLength: 0,
                maxLength: Infinity
            };
        } else {
            options.minLength =
                typeof options.minLength === 'number' ? options.minLength : 0;
            options.maxLength =
                typeof options.maxLength === 'number'
                    ? options.maxLength
                    : Infinity;
        }

        return function lengthFn(value) {
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
        };
    }

    /**
     * @description Creates password validator. Validates password according to validation options.
     * @param {Object<string,*>} [options] - Validation options.
     * @param {number} [options.strength=5] - Minimum required password strength.
     * @param {number} [options.minLength=0] - Minimum password length.
     * @param {number} [options.maxLength=Infinity] - Maximum password length.
     * @param {number} [options.numbers=1] - Minimum required numbers.
     * @param {number} [options.lowercaseChars=1] - Minimum required lowercase characters.
     * @param {number} [options.uppercaseChars=1] - Minimum required uppercase characters.
     * @param {number} [options.specials=1] - Minimum required special characters.
     * @returns {function(string): {result: boolean, report: {uppercase: boolean, special: boolean, strength: number, lowercase: boolean, length: boolean, numbers: boolean}}} Validation function.
     */
    static password(options) {
        if (typeof options !== 'object') {
            options = {
                strength: 5,
                minLength: 0,
                maxLength: Infinity,
                numbers: 1,
                lowercaseChars: 1,
                uppercaseChars: 1,
                specials: 1
            };
        } else {
            options.strength =
                typeof options.strength === 'number' ? options.strength : 5;
            options.minLength =
                typeof options.minLength === 'number' ? options.minLength : 0;
            options.maxLength =
                typeof options.maxLength === 'number'
                    ? options.maxLength
                    : Infinity;
            options.numbers =
                typeof options.numbers === 'number' ? options.numbers : 1;
            options.lowercaseChars =
                typeof options.lowercaseChars === 'number'
                    ? options.lowercaseChars
                    : 1;
            options.uppercaseChars =
                typeof options.uppercaseChars === 'number'
                    ? options.uppercaseChars
                    : 1;
            options.specials =
                typeof options.specials === 'number' ? options.specials : 1;
        }

        return function passwordFn(value) {
            // TODO: IMPROVE STRENGTH ALGORITHM

            let result = true;
            let report = {
                strength: 5,
                length: true,
                numbers: true,
                lowercaseChars: true,
                uppercaseChars: true,
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

            // CHECK LOWERCASE
            if ((value.match(/[a-z]/g) || []).length < options.lowercaseChars) {
                report.strength--;
                report.lowercaseChars = false;
            }

            // CHECK UPPERCASE
            if ((value.match(/[A-Z]/g) || []).length < options.uppercaseChars) {
                report.strength--;
                report.uppercaseChars = false;
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
        };
    }

    /**
     * @description Creates date validator. Validates date according to validation options.
     * @param {Object<string,*>} [options] - Validation options.
     * @param {Date} [options.minDate=null] - Minimum required date.
     * @param {Date} [options.maxDate=null] - Maximum required date.
     * @param {number} [options.minAge=null] - Minimum required age.
     * @param {Array<number>} [options.format=[31, 12, 9999]] - Required format.
     * @param {string} [options.separator=null] - Required separator.
     * @returns {function(string): {result: boolean, report: {minDate: (boolean|null), interpretation: (string|null), minAge: (boolean|null), format: boolean, exists: (boolean|null), maxDate: (boolean|null), separator: (boolean|null)}}} Validation function.
     */
    static date(options) {
        // TODO: SUPPORT FOR NUMBER OF YEARS BEFORE AND AFTER TODAY IN minDate AND maxDate

        if (typeof options !== 'object') {
            options = {
                minDate: null,
                maxDate: null,
                minAge: null,
                format: [31, 12, 9999], // TODO: USE OTHER SYSTEM
                separator: null
            };
        } else {
            options.minDate = DateUtils.isValidDate(options.minDate)
                ? options.minDate
                : null;
            options.maxDate = DateUtils.isValidDate(options.maxDate)
                ? options.maxDate
                : null;
            options.minAge =
                typeof options.minAge === 'number' ? options.minAge : null;
            options.format =
                typeof options.format === 'string'
                    ? options.format
                    : [31, 12, 9999];
            options.separator =
                typeof options.separator === 'string'
                    ? options.separator
                    : null;
        }

        return function dateFn(value) {
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
                // TODO: SORT INSTEAD! (USE OTHER SYSTEM?)
                if (val > 31) {
                    return 'year';
                } else if (val > 12) {
                    return 'date';
                } else {
                    return 'month';
                }
            });
            let dateArray = NumberUtils.parseIntAll(value) || [];
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
                dateElements.year = DateUtils.getValidFullYear(
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
                                    RegExpUtils.escape(options.separator),
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
        };
    }
}

export {InputValidators};
