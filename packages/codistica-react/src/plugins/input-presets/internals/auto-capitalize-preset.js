/** @module react/plugins/input-presets/auto-capitalize-preset */

import {Types} from '@codistica/types';
import {capitalizeFirstsFilter} from '../../input-filters/internals/capitalize-firsts-filter.js';
import {uppercaseFilter} from '../../input-filters/internals/uppercase-filter.js';

const autoCapitalizePresetSchema = new Types({
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
 * @typedef autoCapitalizePresetErrorMessagesType
 * @property {(string|(function(*): string|null)|Object<string,*>|null)} [generic=null] - Generic error message.
 */

/**
 * @typedef autoCapitalizePresetOptionsType
 */

/**
 * @description Auto capitalize preset.
 * @param {autoCapitalizePresetOptionsType} [options] - Preset options.
 * @returns {{type: 'preset', name: string, groupErrorMessages: Array<string>, plugin: Array<*>}} Preset.
 */
function autoCapitalizePreset(options) {
    ({options} = autoCapitalizePresetSchema.validate({options}));

    return {
        type: 'preset',
        name: 'autoCapitalizePreset',
        groupErrorMessages: {},
        plugin: [uppercaseFilter, capitalizeFirstsFilter]
    };
}

export {autoCapitalizePreset};
