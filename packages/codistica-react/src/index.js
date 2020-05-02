/** @todo FOLLOW https://github.com/facebook/flow/issues/8354 and https://youtrack.jetbrains.com/issue/WEB-45239 issues. */

// *** MODULE GROUPS EXPORT ***

import * as socialIcons from './components/social-icons';
import * as inputBlockers from './plugins/input-blockers';
import * as inputFilters from './plugins/input-filters';
import * as inputPresets from './plugins/input-presets';
import * as inputValidators from './plugins/input-validators';

export {
    inputBlockers,
    inputFilters,
    inputPresets,
    inputValidators,
    socialIcons
};

// *** NORMAL EXPORT ***

// CLASSES
export {OverscrollMonitor} from './classes/overscroll-monitor';
export {ViewportMonitor} from './classes/viewport-monitor';

// COMPONENTS
export {Button} from './components/button';
export {DotNavigation} from './components/dot-navigation';
export {Draggable} from './components/draggable';
export {Form} from './components/form';
export {HoverIcon} from './components/hover-icon';
export {Input} from './components/input';
export {Slide} from './components/slide';
export {TriangleDropdown} from './components/triangle-dropdown';

// HOCs
export {onClickOutsideHOC} from './hocs/on-click-outside-hoc';
export {onDragHOC} from './hocs/on-drag-hoc';
export {tooltipHOC} from './hocs/tooltip-hoc';

// MODULES
export {overscrollMonitor} from './modules/overscroll-monitor';
export {viewportMonitor} from './modules/viewport-monitor';

// TODO: WRITE OWN classnames/dedupe LIKE UTILITY FUNCTION AND REPLACE IN PROJECTS.

// TODO: DEFINE/USE CUSTOMIZATION SYSTEM/CONVENTION.
// TODO: USE colors PROP AND style AND className FOR EACH COMPONENT CUSTOMIZABLE PIECE. LET THEM OVERRIDE INTERNALS.

// TODO: CORRECTLY ANNOTATE HOCs RETURNED COMPONENTS.
// TODO: CHECK :hover, :focus, :active SUPPORT AND NORMALIZATION IN ALL ELEMENTS.

// TODO: REPLACE (this: Function) WITH (this: Object)?
// TODO: REMOVE APIs FROM ALL COMPONENTS. BETTER IDEA! IMPLEMENT onMount AND PASS instance!
// TODO: CHECK ALL EXPORTED/IMPORTED/USED TYPES.

// TODO: ENFORCE FULL NAMES (ALSO FOR FILES) IN ALL MONOREPO (...Validator, ...Preset, ...Icon, etc...)
// TODO: GROUP STORIES PER COMPONENT USING NAMED EXPORTS/IMPORTS. USE EXPORT DEFAULT FOR METADATA ONLY IN INDEX FILE.
