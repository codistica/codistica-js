/** @module react/plugins/input-presets/email-preset */

import {Types} from '@codistica/types';
import {spaceBlocker} from '../../input-blockers/internals/space-blocker.js';
import {spaceFilter} from '../../input-filters/internals/space-filter.js';
import {uppercaseFilter} from '../../input-filters/internals/uppercase-filter.js';
import {emailValidator} from '../../input-validators/internals/email-validator.js';

const emailPresetSchema = new Types({
    options: {
        type: 'Object',
        def: {
            errorMessages: {
                type: 'Object',
                def: {
                    generic: {
                        type: ['string', 'Function', 'Object', 'null'],
                        def: null
                    }
                }
            }
        }
    }
});

/**
 * @typedef emailPresetErrorMessagesType
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [generic=null] - Generic error message.
 */

/**
 * @typedef emailPresetOptionsType
 * @property {emailPresetErrorMessagesType} [errorMessages] - Validation error messages.
 */

/**
 * @description Email preset.
 * @param {emailPresetOptionsType} [options] - Preset options.
 * @returns {{type: 'preset', name: string, groupErrorMessages: Array<string>, plugin: Array<*>}} Preset.
 */
function emailPreset(options) {
    ({options} = emailPresetSchema.validate({options}));

    return {
        type: 'preset',
        name: 'emailPreset',
        groupErrorMessages: {
            generic: options.errorMessages.generic
        },
        plugin: [spaceBlocker, spaceFilter, uppercaseFilter, emailValidator]
    };
}

export {emailPreset};
