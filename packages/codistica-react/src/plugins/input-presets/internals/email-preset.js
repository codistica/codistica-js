/** @module react/plugins/input-presets/email-preset */

import {Types} from '@codistica/types';
import {spaceBlocker} from '../../input-blockers/internals/space-blocker.js';
import {spaceFilter} from '../../input-filters/internals/space-filter.js';
import {uppercaseFilter} from '../../input-filters/internals/uppercase-filter.js';
import {emailValidator} from '../../input-validators/internals/email-validator.js';

const emailPresetTypes = new Types({
    options: {
        type: 'Object',
        def: {
            errorMessages: {
                type: 'Object',
                def: {}
            }
        }
    }
});

/**
 * @typedef emailPresetErrorMessagesType
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [generic=null] - Generic error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [format=null] - Format error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [username=null] - Username format error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [domains=null] - Domains error message.
 */

/**
 * @typedef emailPresetOptionsType
 * @property {(RegExp|null)} [username=null] - Required username format.
 * @property {(Array<string>|null)} [domains=null] - Allowed domains.
 * @property {emailPresetErrorMessagesType} [errorMessages] - Validation error messages.
 */

/**
 * @description Email preset.
 * @param {emailPresetOptionsType} [options] - Preset options.
 * @returns {{type: 'preset', name: string, groupErrorMessages: Array<string>, plugin: Array<*>}} Preset.
 */
function emailPreset(options) {
    ({options} = emailPresetTypes.validate({options}));

    const {generic, ...otherErrorMessages} = options.errorMessages;

    return {
        type: 'preset',
        name: 'emailPreset',
        groupErrorMessages: {
            generic: generic
        },
        plugin: [
            spaceBlocker,
            spaceFilter,
            uppercaseFilter,
            emailValidator({
                username: options.username,
                domains: options.domains,
                errorMessages: otherErrorMessages
            })
        ]
    };
}

export {emailPreset};
