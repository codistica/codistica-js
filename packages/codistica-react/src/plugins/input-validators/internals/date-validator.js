/** @module react/plugins/input-validators/date-validator */

import {dateUtils, numberUtils, regExpUtils} from '@codistica/core';
import {Types} from '@codistica/types';
import {InputValidatorPluginUtils} from '../../../classes/input-validator-plugin-utils.js';

const messageSchema = {
    type: ['string', 'Function', 'Object', 'null'],
    def: null
};

const dateValidatorSchema = new Types({
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
 * @typedef dateValidatorErrorMessagesType
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [generic=null] - Generic error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [minDate=null] - Minimum required date error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [maxDate=null] - Maximum acceptable date error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [minAge=null] - Minimum required age error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [format=null] - Enforced format error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [separator=null] - Enforced separator error message.
 */

/**
 * @typedef dateValidatorOptionsType
 * @property {(Date|null)} [minDate=null] - Minimum required date.
 * @property {(Date|null)} [maxDate=null] - Maximum acceptable date.
 * @property {(number|null)} [minAge=null] - Minimum required age.
 * @property {Array<number>} [format=[31, 12, 9999]] - Enforced format.
 * @property {string} [separator=null] - Enforced separator.
 * @property {dateValidatorErrorMessagesType} [errorMessages] - Validation error messages.
 */

/**
 * @description Validates input date according to validation options.
 * @param {dateValidatorOptionsType} [options] - Validation options.
 * @returns {{type: 'validator', name: string, messages: Array<string>, plugin: function(string): Object<string,*>}} Validator.
 */
function dateValidator(options) {
    ({options} = dateValidatorSchema.validate({options}));

    const utils = new InputValidatorPluginUtils({
        keys: ['minDate', 'maxDate', 'minAge', 'format', 'separator']
    });

    return {
        type: 'validator',
        name: 'dateValidator',
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

            const today = new Date();

            const formatOrder = options.format.map((val) => {
                // TODO: SORT INSTEAD! (USE ANOTHER SYSTEM?)
                if (val > 31) {
                    return 'year';
                } else if (val > 12) {
                    return 'date';
                } else {
                    return 'month';
                }
            });

            const dateArray = numberUtils.parseIntAll(value) || [];

            const dateElements = {
                date: null,
                month: null,
                year: null
            };

            // CHECK FORMAT
            if (dateArray.length !== options.format.length) {
                utils.invalidate('format', options.errorMessages.format);
            } else {
                formatOrder.forEach((key, index) => {
                    if (dateArray[index] > options.format[index]) {
                        utils.invalidate(
                            'format',
                            options.errorMessages.format
                        );
                    }
                    dateElements[key] = parseInt(dateArray[index]);
                });
                dateElements.year = dateUtils.getValidFullYear(
                    dateElements.year
                );
                dateElements.month--;
            }

            if (!utils.isValid('format')) {
                utils.disable('minDate');
                utils.disable('maxDate');
                utils.disable('minAge');
                utils.disable('exists');
                utils.disable('separator');
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
                        utils.invalidate(
                            'separator',
                            options.errorMessages.separator
                        );
                    }
                }

                // PARSE DATE
                const parsedDate = new Date(
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
                    utils.invalidate('exists');
                    utils.disable('minDate');
                    utils.disable('maxDate');
                    utils.disable('minAge');
                } else {
                    // SAVE INTERPRETATION
                    utils.setData('interpretation', parsedDate.toString());

                    // CHECK MIN DATE
                    if (
                        options.minDate !== null &&
                        parsedDate < options.minDate
                    ) {
                        utils.invalidate(
                            'minDate',
                            options.errorMessages.minDate
                        );
                    }

                    // CHECK MAX DATE
                    if (
                        options.maxDate !== null &&
                        parsedDate > options.maxDate
                    ) {
                        utils.invalidate(
                            'maxDate',
                            options.errorMessages.maxDate
                        );
                    }

                    // CHECK MIN AGE
                    if (
                        options.minAge !== null &&
                        new Date(parsedDate.getTime()).setFullYear(
                            parsedDate.getFullYear() + options.minAge
                        ) > today
                    ) {
                        utils.invalidate(
                            'minAge',
                            options.errorMessages.minAge
                        );
                    }
                }
            }

            return utils.getValidatorOutput();
        }
    };
}

export {dateValidator};
