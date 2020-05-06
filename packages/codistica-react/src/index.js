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
export {Sophistication} from './classes/sophistication';
export {ViewportMonitor} from './classes/viewport-monitor';

// COMPONENTS
export {Button} from './components/button';
export {DotNavigation} from './components/dot-navigation';
export {Draggable} from './components/draggable';
export {Form} from './components/form';
export {HoverIcon} from './components/hover-icon';
export {InputCheckbox} from './components/input-checkbox';
export {InputRadio} from './components/input-radio';
export {InputRenderer} from './components/input-renderer';
export {InputText} from './components/input-text';
export {Slide} from './components/slide';
export {TriangleDropdown} from './components/triangle-dropdown';

// HOCs
export {onClickOutsideHOC} from './hocs/on-click-outside-hoc';
export {onDragHOC} from './hocs/on-drag-hoc';
export {tooltipHOC} from './hocs/tooltip-hoc';

// MODULES
export {overscrollMonitor} from './modules/overscroll-monitor';
export {viewportMonitor} from './modules/viewport-monitor';

// TODO: WRITE OWN classNames LIKE UTILITY FUNCTION AND REPLACE IN PROJECTS? (MAYBE NO. THIS PACKAGE SEEMS TO BE SERIOUS)

// TODO: DEFINE/USE CUSTOMIZATION SYSTEM/CONVENTION.
// TODO: USE styles AND classes PROPS. OBJECTS CONTAINING PROPERTIES FOR EACH COMPONENT CUSTOMIZABLE ELEMENT. LET THEM OVERRIDE INTERNALS.
// TODO: USE colors PROP FOR GENERAL COLORING (validColor, invalidColor, warningColor, etc...).
// TODO: USE custom PROP FOR MOST IMPORTANT STYLE VALUES AND OPTIONS (direction, lineWeight, etc...).
// TODO: CREATE NEEDED AUX MODULES.
// TODO: ADJUST/CLEAN ALL EXISTING STYLE FILES.
// TODO: APPLY CUSTOMIZATION PATTERN TO ALL COMPONENTS.
// TODO: ENFORCE NEW classNames CONVENTION IN PACKAGE.

// TODO: CORRECTLY ANNOTATE HOCs RETURNED COMPONENTS.
// TODO: CHECK :hover, :focus, :active SUPPORT AND NORMALIZATION IN ALL ELEMENTS.

// TODO: REPLACE (this: Function) WITH (this: Object)?
// TODO: REMOVE APIs FROM ALL COMPONENTS. BETTER IDEA! IMPLEMENT onMount AND onUnmount (TO FREE MEMORY) AND PASS instance!
// TODO: CHECK ALL EXPORTED/IMPORTED/USED TYPES.

// TODO: ENFORCE FULL NAMES (ALSO FOR FILES) IN ALL MONOREPO (...Validator, ...Preset, ...Icon, etc...)
// TODO: GROUP STORIES PER COMPONENT USING NAMED EXPORTS/IMPORTS. USE EXPORT DEFAULT FOR METADATA ONLY IN INDEX FILE.

// TODO: IMPROVE PATTERNS USING refs INSIDE LIFECYCLE METHODS (LIKE componentDidMount AND componentWillUnmount). Refs may not be available.
// TODO: EXECUTE CODE ON setRef METHODS WITH AN INITIALIZATION FLAG. AND CLEAN ON componentWillUnmount IF EFFECTIVELY INITIALIZED.

// TODO: CHECK IF FLOW TYPE CHECK BREAKS BECAUSE OF FULL IMPORT PATHS BEING USED IN INTERNALS. (IF SO, REMOVE ALL FILE EXTENSIONS FROM EXPORTS/IMPORTS IN REACT PACKAGE).
// TODO: TEST IN MONOREPO BY TEMPORARILY UN-EXCLUDE COMPILED CODE DIRECTORIES.

// TODO: CREATE reset.module.scss MODULE? TO BE APPLIED TO ALL COMPONENTS root ELEMENTS? AND CLEAN ALL REDUNDANT CSS.

// TODO: CHANGE NAME OF sophistication?
