/** @todo FOLLOW https://github.com/facebook/flow/issues/8354 and https://youtrack.jetbrains.com/issue/WEB-45239 issues. */

// *** MODULE GROUPS EXPORT ***

/** @todo FOLLOW https://youtrack.jetbrains.com/issue/WEB-45223 issue. */

import * as icons from './components/icons';
import * as inputBlockers from './plugins/input-blockers';
import * as inputFilters from './plugins/input-filters';
import * as inputPresets from './plugins/input-presets';
import * as inputValidators from './plugins/input-validators';

export {icons, inputBlockers, inputFilters, inputPresets, inputValidators};

// *** NORMAL EXPORT ***

// CLASSES
export {OverscrollMonitor} from './classes/overscroll-monitor';
export {Sophistication} from './classes/sophistication';
export {ViewportMonitor} from './classes/viewport-monitor';

// COMPONENTS
export {BulletDropdown} from './components/bullet-dropdown';
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

// HOCs
export {withOnClickOutside} from './hocs/with-on-click-outside';
export {withOnDrag} from './hocs/with-on-drag';
export {withTooltip} from './hocs/with-tooltip';
export {withOverscrollMonitor} from './hocs/with-overscroll-monitor';
export {withViewportMonitor} from './hocs/with-viewport-monitor';

// MODULES
export {mergeClassNames} from './modules/merge-class-names';
export {mergeStyles} from './modules/merge-styles';
export {overscrollMonitor} from './modules/overscroll-monitor';
export {viewportMonitor} from './modules/viewport-monitor';

// TODO: CORRECTLY ANNOTATE HOCs RETURNED COMPONENTS. ADD POLYMORPHIC TYPES SUPPORT.
// TODO: ADD NATIVE DOM PROPS TO COMPONENTS THAT ACCEPT THEM? EXTEND PROPS?

// TODO: ENFORCE FULL NAMES (ALSO FOR FILES) IN ALL MONOREPO (...Validator, ...Preset, ...Icon, etc...)
// TODO: GROUP STORIES PER COMPONENT USING NAMED EXPORTS/IMPORTS. USE EXPORT DEFAULT FOR METADATA ONLY IN INDEX FILE.

// TODO: CHECK refs USAGES.
// TODO: IMPROVE PATTERNS USING refs INSIDE LIFECYCLE METHODS (LIKE componentDidMount AND componentWillUnmount). Refs may not be available.
// TODO: EXECUTE CODE ON setRef METHODS WITH AN INITIALIZATION FLAG. AND CLEAN ON componentWillUnmount IF EFFECTIVELY INITIALIZED.

// TODO: CHECK IF FLOW TYPE CHECK BREAKS BECAUSE OF FULL IMPORT PATHS BEING USED IN INTERNALS. (IF SO, REMOVE ALL FILE EXTENSIONS FROM EXPORTS/IMPORTS IN REACT PACKAGE).
// TODO: TEST IN MONOREPO BY TEMPORARILY UN-EXCLUDE COMPILED CODE DIRECTORIES.

// TODO: ADD GitHub, NPM, BitBucket, etc... TO icons
// TODO: FIX INSTAGRAM ICON IN ILLUSTRATOR! (CHECK ALL)

// TODO: ENFORCE HANDLERS NAMING CONVENTION (EX: onClickHandler, onNewValueHandler...)

// TODO: CREATE BulletMenu COMPONENT USING BulletDropdown UNDER THE HOOD. ALLOWING MULTI-LEVEL OBJECT IN items PROP. (ADD autoSpacing TOO (MODIFY BulletDropdown ACCORDINGLY TO HAVE ALL MEASURES))

// TODO: FILTER OUT PROPERTIES THAT SHOULD NOT ARRIVE TO ELEMENTS!
// TODO: FILTER OUT UNNEEDED ATTRIBUTES.
