/** @module react/plugins/input-validators/email-validator */

import {REG_EXPS} from '@codistica/core';
import {Types} from '@codistica/types';
import {InputValidatorPluginUtils} from '../../../classes/input-validator-plugin-utils.js';

const messageSchema = {
    type: ['string', 'Function', 'Object', 'null'],
    def: null
};

const emailValidatorSchema = new Types({
    options: {
        type: 'Object',
        def: {
            username: {type: 'RegExp', def: null},
            domains: {type: 'Array<string|RegExp>', def: null},
            errorMessages: {
                type: 'Object',
                def: {
                    generic: messageSchema,
                    format: messageSchema,
                    username: messageSchema,
                    domains: messageSchema
                }
            }
        }
    }
});

/**
 * @typedef emailValidatorErrorMessagesType
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [generic=null] - Generic error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [format=null] - Format error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [username=null] - Username format error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [domains=null] - Domains error message.
 */

/**
 * @typedef emailValidatorOptionsType
 * @property {(RegExp|null)} [username=null] - Required username format.
 * @property {(Array<string|RegExp>|null)} [domains=null] - Allowed domains.
 * @property {emailValidatorErrorMessagesType} [errorMessages] - Validation error messages.
 */

/**
 * @description Validates input email address format.
 * @param {emailValidatorOptionsType} [options] - Validation options.
 * @returns {{type: 'validator', name: string, messages: Array<string>, plugin: function(string): Object<string,*>}} Validator.
 */
function emailValidator(options) {
    ({options} = emailValidatorSchema.validate({options}));

    const utils = new InputValidatorPluginUtils({
        keys: ['format', 'username', 'domain']
    });

    return {
        type: 'validator',
        name: 'emailValidator',
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

            if (!REG_EXPS.IS_EMAIL.test(value)) {
                utils.invalidate('format', options.errorMessages.format);
                utils.disable('username');
                utils.disable('domain');
            } else {
                const username = (value.match(/.+(?=@)/) || [])[0] || null;
                const domain = (value.match(/[^@]+$/) || [])[0] || null;

                if (options.username && !options.username.test(username)) {
                    utils.invalidate(
                        'username',
                        options.errorMessages.username
                    );
                }

                if (
                    options.domains &&
                    !options.domains.some((allowedDomain) => {
                        if (typeof allowedDomain === 'string') {
                            return allowedDomain === domain;
                        } else {
                            return allowedDomain.test(domain);
                        }
                    })
                ) {
                    utils.invalidate('domains', options.errorMessages.domains);
                }
            }

            return utils.getValidatorOutput();
        }
    };
}

export {emailValidator};
