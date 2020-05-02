/** @module react/plugins/input-presets/email-preset */

import {spaceBlocker} from '../../input-blockers/internals/space-blocker.js';
import {spaceFilter} from '../../input-filters/internals/space-filter.js';
import {uppercaseFilter} from '../../input-filters/internals/uppercase-filter.js';
import {emailValidator} from '../../input-validators/internals/email-validator.js';

const emailPreset = [
    spaceBlocker,
    spaceFilter,
    uppercaseFilter,
    emailValidator
];

export {emailPreset};
