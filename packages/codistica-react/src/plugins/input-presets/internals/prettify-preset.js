/** @module react/plugins/input-presets/prettify-preset */

import {Types} from '@codistica/types';
import {leadingSpaceBlocker} from '../../input-blockers/internals/leading-space-blocker.js';
import {nonLetterBlocker} from '../../input-blockers/internals/non-letter-blocker.js';
import {nonSingleSpaceBlocker} from '../../input-blockers/internals/non-single-space-blocker.js';
import {capitalizeFirstsFilter} from '../../input-filters/internals/capitalize-firsts-filter.js';
import {leadingSpaceFilter} from '../../input-filters/internals/leading-space-filter.js';
import {nonLetterFilter} from '../../input-filters/internals/non-letter-filter.js';
import {nonSingleSpaceFilter} from '../../input-filters/internals/non-single-space-filter.js';
import {trailingSpaceFilter} from '../../input-filters/internals/trailing-space-filter.js';
import {uppercaseFilter} from '../../input-filters/internals/uppercase-filter.js';

const prettifyPresetTypes = new Types({
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
 * @typedef prettifyPresetErrorMessagesType
 */

/**
 * @typedef prettifyPresetOptionsType
 * @property {prettifyPresetErrorMessagesType} [errorMessages] - Validation error messages.
 */

/**
 * @description Prettify preset.
 * @param {prettifyPresetOptionsType} [options] - Preset options.
 * @returns {{type: 'preset', name: string, groupErrorMessages: Array<string>, plugin: Array<*>}} Preset.
 */
function prettifyPreset(options) {
    ({options} = prettifyPresetTypes.validate({options}));

    return {
        type: 'preset',
        name: 'prettifyPreset',
        groupErrorMessages: {},
        plugin: [
            nonSingleSpaceBlocker,
            leadingSpaceBlocker,
            nonLetterBlocker,
            nonSingleSpaceFilter,
            trailingSpaceFilter,
            leadingSpaceFilter,
            uppercaseFilter,
            capitalizeFirstsFilter,
            nonLetterFilter
        ]
    };
}

export {prettifyPreset};
