/** @module react/plugins/input-validators/async-validator */

import {Types} from '@codistica/types';
import {InputValidatorPluginUtils} from '../../../classes/input-validator-plugin-utils.js';

const asyncValidatorSchema = new Types({
    options: {
        type: 'Object',
        def: {
            asyncValidator: {type: ['Function', 'null'], def: null},
            enableDeferCache: {type: 'boolean', def: true},
            deferThrottlingDelay: {type: ['number', 'null'], def: 1000},
            errorMessages: {
                type: 'Object',
                def: {
                    generic: {
                        type: ['string', 'Function', 'Object', 'null'],
                        def: null
                    },
                    asyncValidator: {
                        type: ['string', 'Function', 'Object', 'null'],
                        def: null
                    }
                }
            },
            successMessages: {
                type: 'Object',
                def: {
                    asyncValidator: {
                        type: ['string', 'Function', 'Object', 'null'],
                        def: null
                    }
                }
            },
            standByMessages: {
                type: 'Object',
                def: {
                    asyncValidator: {
                        type: ['string', 'Function', 'Object', 'null'],
                        def: null
                    }
                }
            }
        }
    }
});

/**
 * @typedef asyncValidatorErrorMessagesType
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [generic=null] - Generic error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [asyncValidator=null] - Async validator error message.
 */

/**
 * @typedef asyncValidatorSuccessMessages
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [asyncValidator=null] - Async validator success message.
 */

/**
 * @typedef asyncValidatorStandByMessages
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [asyncValidator=null] - Async validator stand by message.
 */

/**
 * @typedef asyncValidatorOptionsType
 * @property {(Function|null)} [asyncValidator] - Async validator.
 * @property {boolean} [enableDeferCache=false] - Enable internal defer cache.
 * @property {(number|null)} [deferThrottlingDelay=null] - Internal defer throttling delay in milliseconds.
 * @property {asyncValidatorErrorMessagesType} [errorMessages] - Validation error messages.
 * @property {asyncValidatorSuccessMessages} [successMessages] - Validation success messages.
 * @property {asyncValidatorStandByMessages} [standByMessages] - Validation stand by messages.
 */

/**
 * @description Asynchronously validates input according to validation options.
 * @param {asyncValidatorOptionsType} [options] - Validation options.
 * @returns {{type: 'validator', name: string, messages: Array<string>, plugin: function(string): Object<string,*>}} Validator.
 */
function asyncValidator(options) {
    ({options} = asyncValidatorSchema.validate({options}));

    const utils = new InputValidatorPluginUtils({
        keys: ['asyncValidator'],
        enableDeferCache: options.enableDeferCache,
        deferThrottlingDelay: options.deferThrottlingDelay
    });

    return {
        type: 'validator',
        name: 'asyncValidator',
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

            if (!options.asyncValidator) {
                utils.disable('asyncValidator');
            } else {
                utils.defer(
                    'asyncValidator',
                    options.standByMessages.asyncValidator,
                    {
                        standBy: true
                    },
                    async (latestValue, context) => {
                        const result = await options.asyncValidator(
                            latestValue
                        );
                        if (result) {
                            context.validate(
                                options.successMessages.asyncValidator,
                                {
                                    standBy: false
                                }
                            );
                        } else if (result === false) {
                            context.invalidate(
                                options.errorMessages.asyncValidator,
                                {
                                    standBy: false
                                }
                            );
                        } else {
                            context.disable(null, {
                                standBy: false
                            });
                        }
                    }
                );
            }

            return utils.getValidatorOutput();
        }
    };
}

export {asyncValidator};
