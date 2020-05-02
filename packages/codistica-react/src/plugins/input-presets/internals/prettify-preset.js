/** @module react/plugins/input-presets/prettify-preset */

import {leadingSpaceBlocker} from '../../input-blockers/internals/leading-space-blocker.js';
import {nonLetterBlocker} from '../../input-blockers/internals/non-letter-blocker.js';
import {nonSingleSpaceBlocker} from '../../input-blockers/internals/non-single-space-blocker.js';
import {capitalizeFirstsFilter} from '../../input-filters/internals/capitalize-firsts-filter.js';
import {leadingSpaceFilter} from '../../input-filters/internals/leading-space-filter.js';
import {nonLetterFilter} from '../../input-filters/internals/non-letter-filter.js';
import {nonSingleSpaceFilter} from '../../input-filters/internals/non-single-space-filter.js';
import {trailingSpaceFilter} from '../../input-filters/internals/trailing-space-filter.js';
import {uppercaseFilter} from '../../input-filters/internals/uppercase-filter.js';

const prettifyPreset = [
    nonSingleSpaceBlocker,
    leadingSpaceBlocker,
    nonLetterBlocker,
    nonSingleSpaceFilter,
    trailingSpaceFilter,
    leadingSpaceFilter,
    uppercaseFilter,
    capitalizeFirstsFilter,
    nonLetterFilter
];

export {prettifyPreset};
