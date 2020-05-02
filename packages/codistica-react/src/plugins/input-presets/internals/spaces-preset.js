/** @module react/plugins/input-presets/spaces-preset */

import {leadingSpaceBlocker} from '../../input-blockers/internals/leading-space-blocker.js';
import {nonSingleSpaceBlocker} from '../../input-blockers/internals/non-single-space-blocker.js';
import {leadingSpaceFilter} from '../../input-filters/internals/leading-space-filter.js';
import {nonSingleSpaceFilter} from '../../input-filters/internals/non-single-space-filter.js';
import {trailingSpaceFilter} from '../../input-filters/internals/trailing-space-filter.js';

const spacesPreset = [
    leadingSpaceBlocker,
    nonSingleSpaceBlocker,
    leadingSpaceFilter,
    nonSingleSpaceFilter,
    trailingSpaceFilter
];

export {spacesPreset};
