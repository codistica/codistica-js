/** @module react/plugins/input-presets/password-preset */

import {Types} from '@codistica/types';
import {spaceBlocker} from '../../input-blockers/internals/space-blocker.js';
import {spaceFilter} from '../../input-filters/internals/space-filter.js';
import {passwordValidator} from '../../input-validators/internals/password-validator.js';

const passwordPresetSchema = new Types({
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
 * @typedef passwordPresetErrorMessagesType
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [generic=null] - Generic error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [length=null] - Wrong length error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [numbers=null] - Minimum required numbers error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [lowercases=null] - Minimum required lowercase characters error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [uppercases=null] - Minimum required uppercase characters error message.
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [specials=null] - Minimum required special characters error message.
 */

/**
 * @typedef passwordPresetOptionsType
 * @property {passwordPresetErrorMessagesType} [errorMessages] - Validation error messages.
 */

/**
 * @description Password preset.
 * @param {passwordPresetOptionsType} [options] - Preset options.
 * @returns {{type: 'preset', name: string, groupErrorMessages: Array<string>, plugin: Array<*>}} Preset.
 */
function passwordPreset(options) {
    ({options} = passwordPresetSchema.validate({options}));

    const {generic, ...otherErrorMessages} = options.errorMessages;

    return {
        type: 'preset',
        name: 'passwordPreset',
        groupErrorMessages: {
            generic
        },
        plugin: [
            spaceBlocker,
            spaceFilter,
            passwordValidator({
                minLength: 8,
                maxLength: 30,
                errorMessages: otherErrorMessages
            })
        ]
    };
}

export {passwordPreset};
