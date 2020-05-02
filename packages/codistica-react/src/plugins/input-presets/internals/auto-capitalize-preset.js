/** @module react/plugins/input-presets/auto-capitalize-preset */

import {capitalizeFirstsFilter} from '../../input-filters/internals/capitalize-firsts-filter.js';
import {uppercaseFilter} from '../../input-filters/internals/uppercase-filter.js';

const autoCapitalizePreset = [uppercaseFilter, capitalizeFirstsFilter];

export {autoCapitalizePreset};
