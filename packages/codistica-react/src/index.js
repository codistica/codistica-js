/** @todo FOLLOW https://github.com/facebook/flow/issues/8354 and https://youtrack.jetbrains.com/issue/WEB-45239 issues. */

// *** MODULE GROUPS EXPORT ***

/** @todo FOLLOW https://youtrack.jetbrains.com/issue/WEB-45223 issue. */

import * as inputBlockers from './plugins/input-blockers';
import * as inputFilters from './plugins/input-filters';
import * as inputPresets from './plugins/input-presets';
import * as inputValidators from './plugins/input-validators';

export {inputBlockers, inputFilters, inputPresets, inputValidators};

// *** NORMAL EXPORT ***

// CLASSES
export {InputPluginManager} from './classes/input-plugin-manager';
export {InputValidatorPluginUtils} from './classes/input-validator-plugin-utils';
export {Sophistication} from './classes/sophistication';

// COMPONENTS
export {BulletDropdown} from './components/bullet-dropdown';
export {Button} from './components/button';
export {CarouselSlide} from './components/carousel-slide';
export {DotNavigation} from './components/dot-navigation';
export {FullScreenSlide} from './components/full-screen-slide';
export {InputCheckbox} from './components/input-checkbox';
export {InputRadioGroup} from './components/input-radio-group';
export {InputText} from './components/input-text';
export {TrackSlide} from './components/track-slide';
export {TracklessSlide} from './components/trackless-slide';

// HOCs
export {withOnClickOutside} from './hocs/with-on-click-outside';
export {withOnDrag} from './hocs/with-on-drag';
export {withTooltip} from './hocs/with-tooltip';
export {withOnScrollAction} from './hocs/with-on-scroll-action';
export {withOverscrollBlocker} from './hocs/with-overscroll-blocker';
export {withViewportMonitor} from './hocs/with-viewport-monitor';

// MODULES
export {getRefHandler} from './modules/get-ref-handler';
export {mergeClassNames} from './modules/merge-class-names';
export {mergeStyles} from './modules/merge-styles';

// MUI COMPONENTS
export {MUICheckbox} from './mui-components/mui-checkbox';
export {MUIDatePicker} from './mui-components/mui-date-picker';
export {MUIRadioGroup} from './mui-components/mui-radio-group';
export {MUISwitch} from './mui-components/mui-switch';
export {MUITextField} from './mui-components/mui-text-field';
export {MUITextFieldPassword} from './mui-components/mui-text-field-password';
export {MUITextFieldSelect} from './mui-components/mui-text-field-select';

// UTILS
export {AnchorWrapper} from './utils/anchor-wrapper';
export {Draggable} from './utils/draggable';
export {Form} from './utils/form';
export type {FormValidationObjectType} from './utils/form';
export {ImgHoverSwitch} from './utils/img-hover-switch';
export {InputRenderer} from './utils/input-renderer';

// TODO: APPLY MARGINS TO ROOTS ONLY (SEE INPUTS).

// TODO: FIX CallableObj PATTERN! NO HINTS FOR PROPS WHEN CONSUMING LIBRARY. HOW TO INDICATE THAT THEY ARE COMPONENTS? (FUNCTIONAL COMPONENTS).

// TODO: FIX (this: any)?
// TODO: FIX (...args: Array<any>) => any
// TODO: FIX REFS FORWARDING TYPES
// TODO: CORRECTLY ANNOTATE HOCs RETURNED COMPONENTS. ADD POLYMORPHIC TYPES SUPPORT.
// TODO: ADD NATIVE DOM PROPS TO COMPONENTS THAT ACCEPT THEM? EXTEND PROPS?
// TODO: CHECK ALL HOCs.
// TODO: CHECK ALL HOCs TYPE ANNOTATIONS.
// TODO: SOLVE HOCs AND FUNCTIONAL COMPONENTS COMPATIBILITY ISSUE. (USE CUSTOM REF PROP CONVENTION?, USE forwardRef REF IN EACH FUNCTIONAL COMPONENT? (MAYBE BEST CHOICE))

// TODO: USE REF INSTEAD OF onMount? HOW TO DO IT WITH FUNCTIONAL COMPONENTS? MAYBE NOT POSSIBLE.

// TODO: CHECK refs USAGES.
// TODO: IMPROVE PATTERNS USING refs INSIDE LIFECYCLE METHODS (LIKE componentDidMount AND componentWillUnmount). Refs may not be available.
// TODO: EXECUTE CODE ON setRef METHODS WITH AN INITIALIZATION FLAG. AND CLEAN ON componentWillUnmount IF EFFECTIVELY INITIALIZED.

// TODO: CHECK IF FLOW TYPE CHECK BREAKS BECAUSE OF FULL IMPORT PATHS BEING USED IN INTERNALS. (IF SO, REMOVE ALL FILE EXTENSIONS FROM EXPORTS/IMPORTS IN REACT PACKAGE).
// TODO: TEST IN MONOREPO BY TEMPORARILY UN-EXCLUDE COMPILED CODE DIRECTORIES.

// TODO: FILTER OUT PROPERTIES THAT SHOULD NOT ARRIVE TO ELEMENTS!
// TODO: FILTER OUT UNNEEDED ATTRIBUTES.

// TODO: ENFORCE HANDLERS NAMING CONVENTION (EX: onClickHandler, onNewValueHandler...)
// TODO: ENFORCE FULL NAMES (ALSO FOR FILES) IN ALL MONOREPO (...Validator, ...Preset, ...Icon, etc...)

// TODO: GROUP STORIES PER COMPONENT USING NAMED EXPORTS/IMPORTS. USE EXPORT DEFAULT FOR METADATA ONLY IN INDEX FILE.

// TODO: ADD GitHub, NPM, BitBucket, etc... TO icons
// TODO: FIX INSTAGRAM ICON IN ILLUSTRATOR! (CHECK ALL)

// TODO: CREATE BulletMenu COMPONENT USING BulletDropdown UNDER THE HOOD. ALLOWING MULTI-LEVEL OBJECT IN items PROP. (ADD autoSpacing TOO (MODIFY BulletDropdown ACCORDINGLY TO HAVE ALL MEASURES))
// TODO: SEE REACT SPRINGS FOR A GOOD BulletMenu EXAMPLE. IMPROVE BulletDropdown ACCORDINGLY.

// TODO: IMPLEMENT REACT ESLINT RULES (SEE CODISTICA ESLINT CONFIG PACKAGE). IMPORTANT FOR CHECKS LIKE useEffect DEPENDENCIES.

// TODO: CHECK THAT PROPS ARE NEVER CHANGED.

// TODO: MOVE ALL POSSIBLE STYLES TO SCSS FILES TO LOWER SPECIFICITY.
// TODO: USE DIRECT SIMPLE CLASSNAMES WHEN POSSIBLE.

// TODO: RENAME ViewportMonitor -> DynamicViewport?
// TODO: IT IS IMPORTANT TO MAKE DynamicViewport, OverscrollBlocker AND THEIR IMPLEMENTATIONS BREAK-PROOF.
// TODO: CHECK ALL VIEWPORT UNITS USAGES IN MONOREPO.

// TODO: FOR <TabBoundary>, CATCH ALL focus/blur EVENTS AND PREVENT/FORWARD AS NEEDED (A GLOBAL window LISTENER COULD BE NEEDED TO DETECT FOCUS FROM AND TO ELEMENTS OUTSIDE BOUNDARY).

// TODO: <TracklessSlide>
// TODO: <TrackSlide>
// TODO: <FullScreenSlide> (USE <TrackSlide> UNDER THE HOOD) (FULL CSS, POSITION fixed, z-index AND PERCENT UNITS (NO VIEWPORT UNITS))
// TODO: <CarouselSlide>
// TODO: IMPLEMENT react-use-gesture.
// TODO: ADD onStart AND onEnd CALLBACKS.
// TODO: SUPPORT FOR KEYBOARD (NAVIGATE WITH ARROWS, GOTO WITH NUMBERS, ETC)

// TODO: GROUP ALL ICONS INTO ONE Icon COMPONENT WITH name PROP. LAZY LOAD BY DEFAULT?
// TODO: SEPARATE BY CATEGORIES IF NO LAZY LOADING? SocialIcons, ETC...?

// TODO: MOVE ALL CUSTOMIZATION LOGIC FOR EACH COMPONENT TO A style.js FILE IN EACH COMPONENT DIRECTORY.
// TODO: USE MEMOIZATION WHEN POSSIBLE.
// TODO: DEFINE A CONVENTION FOR LOCAL STYLES (ANALOG TO componentClassNames).

// TODO: USE getRefHandler (ADJUST CURRENT HOCs ACCORDINGLY (USE this.componentRef.current FOR CONSISTENCY REASONS))

// TODO: MOVE mergeStyles AND mergeClassNames TO @codistica/browser.

// TODO: SIMPLIFY REF ACQUISITION IN FUNCTIONAL COMPONENTS LIKE "ref={myRef}"

// TODO: USE will-change PROP WHERE NEEDED.

// TODO: MAKE SURE THAT ALL STATES CHANGES DEPENDING ON PREVIOUS STATE USE CALLBACK METHOD.
// TODO: MAKE SURE THAT ALL POSITION fixed OR absolute HAVE EXPLICITLY SET COORDINATES (left, top, etc...).
