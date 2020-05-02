/** @module react/plugins/input-presets/password-preset */

import {spaceBlocker} from '../../input-blockers/internals/space-blocker.js';
import {spaceFilter} from '../../input-filters/internals/space-filter.js';
import {passwordValidator} from '../../input-validators/internals/password-validator.js';

const passwordPreset = [
    spaceBlocker,
    spaceFilter,
    passwordValidator({minLength: 8, maxLength: 30})
];

export {passwordPreset};
