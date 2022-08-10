/** @module react/plugins/input-presets/spaces-preset */

import {Types} from '@codistica/types';
import {leadingSpaceBlocker} from '../../input-blockers/internals/leading-space-blocker.js';
import {nonSingleSpaceBlocker} from '../../input-blockers/internals/non-single-space-blocker.js';
import {leadingSpaceFilter} from '../../input-filters/internals/leading-space-filter.js';
import {nonSingleSpaceFilter} from '../../input-filters/internals/non-single-space-filter.js';
import {trailingSpaceFilter} from '../../input-filters/internals/trailing-space-filter.js';

const spacesPresetTypes = new Types({
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
 * @typedef spacesPresetErrorMessagesType
 */

/**
 * @typedef spacesPresetOptionsType
 * @property {spacesPresetErrorMessagesType} [errorMessages] - Validation error messages.
 */

/**
 * @description Spaces preset.
 * @param {spacesPresetOptionsType} [options] - Preset options.
 * @returns {{type: 'preset', name: string, groupErrorMessages: Array<string>, plugin: Array<*>}} Preset.
 */
function spacesPreset(options) {
    ({options} = spacesPresetTypes.validate({options}));

    return {
        type: 'preset',
        name: 'spacesPreset',
        groupErrorMessages: {},
        plugin: [
            leadingSpaceBlocker,
            nonSingleSpaceBlocker,
            leadingSpaceFilter,
            nonSingleSpaceFilter,
            trailingSpaceFilter
        ]
    };
}

export {spacesPreset};
