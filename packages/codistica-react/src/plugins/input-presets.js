/** @module react/plugins/input-presets */

import {InputBlockers} from './input-blockers.js';
import {InputFilters} from './input-filters.js';
import {InputValidators} from './input-validators.js';

/**
 * @classdesc Input presets plugin for @codistica/react Input component.
 */
class InputPresets {
    // TODO: CREATE DATE PRESET

    static email = {
        validators: InputValidators.email,
        filters: [InputFilters.noSpaces, InputFilters.noUppercase],
        blockers: [InputBlockers.noSpaces, InputBlockers.noUppercase]
    };

    static password = {
        validators: InputValidators.password({minLength: 8, maxLength: 30}),
        filters: InputFilters.noSpaces,
        blockers: InputBlockers.noSpaces
    };

    static spaces = {
        filters: [
            InputFilters.onlySingleSpaces,
            InputFilters.noTrailingSpaces,
            InputFilters.noLeadingSpaces
        ],
        blockers: [
            InputBlockers.onlySingleSpaces,
            InputBlockers.noLeadingSpaces
        ]
    };

    static prettify = {
        filters: [
            InputFilters.onlySingleSpaces,
            InputFilters.noTrailingSpaces,
            InputFilters.noLeadingSpaces,
            InputFilters.noUppercase,
            InputFilters.capitalizeFirts,
            InputFilters.onlyLetters
        ],
        blockers: [
            InputBlockers.onlySingleSpaces,
            InputBlockers.noLeadingSpaces,
            InputBlockers.onlyLetters
        ]
    };

    static autoCapitalize = {
        filters: [InputFilters.noUppercase, InputFilters.capitalizeFirts]
    };
}

export {InputPresets};
