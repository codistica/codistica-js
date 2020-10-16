/** @flow */

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

// UTILS
export {AnchorWrapper} from './utils/anchor-wrapper';
export {Draggable} from './utils/draggable';
export {Form} from './utils/form';
export {ImgHoverSwitch} from './utils/img-hover-switch';
export {InputRenderer} from './utils/input-renderer';

// TYPES
export type {FormValidationObjectType} from './utils/form';
export type {PluginType as InputPluginType} from './utils/input-renderer'; // TODO: FIX.

// TODO: IMPORTANT!!!
// TODO: SUPPORT PAYLOAD GROUPS LIKE permissions:admins, permissions:customers -> [permissions:admins, permissions:customers].
// TODO: RENAME asyncValidator TO asyncCallbackValidator AND CREATE callbackValidator.
// TODO: CREATE regExpValidator
// TODO: ADD SUPPORT FOR PASSING VALIDATION INFORMATION TO INPUT IN A PROP (TO BE MERGED AS IF THEY WERE VALIDATOR OUTPUTS) (CREATE/MODIFY/IMPROVE NEEDED UTILITIES) (STATIC VERSION OF invalidate, validate, disable AND defer? RETURNING VALIDATOR OUTPUT).
// TODO: SAME LOGIC FOR SERVER VALIDATION. RECEIVE AN OBJECT WITH OUTPUTS, WITH OPTION TO SET MESSAGES AND THEN PASS IT TO FORM AND FORM WILL USE INPUTS INSTANCES TO INJECT VALIDATION INFORMATION LIKE ABOVE (MAKE IT PERSIST UNTIL NEW SERVER SIDE OBJECT IS PASSED OR TO DISAPPEAR ON INPUT CHANGE BASED ON OPTION).
// TODO: ACCEPT CUSTOM COLORS IN MUI INPUTS?
// TODO: ADD SUPPORT FOR MULTIPLE INPUTS AND SINGLE VALIDATION? LIKE FOR CREDIT CARD EXPIRATION DATE.

// TODO: FIX (this: any)?
// TODO: FIX (...args: Array<any>) => any
// TODO: FIX REFS FORWARDING TYPES
// TODO: CORRECTLY ANNOTATE HOCs RETURNED COMPONENTS. ADD POLYMORPHIC TYPES SUPPORT.
// TODO: ADD NATIVE DOM PROPS TO COMPONENTS THAT ACCEPT THEM? EXTEND PROPS?
// TODO: CHECK ALL HOCs.
// TODO: CHECK ALL HOCs TYPE ANNOTATIONS.
// TODO: SOLVE HOCs AND FUNCTIONAL COMPONENTS COMPATIBILITY ISSUE. (USE CUSTOM REF PROP CONVENTION?, USE forwardRef REF IN EACH FUNCTIONAL COMPONENT? (MAYBE BEST CHOICE)) (SEE OTHER LIBRARIES, LIKE Material-UI

// TODO: USE REF INSTEAD OF onMount?
// TODO: componentRef PROP?
// TODO: HOWEVER CHANGE onMount NAME TO MORE SPECIFIC NAMES. ESPECIALLY FOR CALLBACKS THAT WILL BE MADE MORE TIMES, NOT ONLY ON COMPONENT MOUNT.

// TODO: CHECK refs USAGES.
// TODO: IMPROVE PATTERNS USING refs INSIDE LIFECYCLE METHODS (LIKE componentDidMount AND componentWillUnmount). Refs may not be available.
// TODO: EXECUTE CODE ON setRef METHODS WITH AN INITIALIZATION FLAG. AND CLEAN ON componentWillUnmount IF EFFECTIVELY INITIALIZED.

// TODO: CHECK IF FLOW TYPE CHECK BREAKS BECAUSE OF FULL IMPORT PATHS BEING USED IN INTERNALS. (IF SO, REMOVE ALL FILE EXTENSIONS FROM EXPORTS/IMPORTS IN REACT PACKAGE).
// TODO: TEST IN MONOREPO BY TEMPORARILY UN-EXCLUDE COMPILED CODE DIRECTORIES.

// TODO: FILTER OUT PROPERTIES THAT SHOULD NOT ARRIVE TO ELEMENTS!
// TODO: FILTER OUT UNNEEDED ATTRIBUTES.
// TODO: CHECK DOM ATTRIBUTES VALUE TYPE.

// TODO: ENFORCE HANDLERS NAMING CONVENTION (EX: onClickHandler...)
// TODO: ENFORCE FULL NAMES (ALSO FOR FILES) IN ALL MONOREPO (...Validator, ...Preset, ...Icon, etc...)

// TODO: GROUP STORIES PER COMPONENT USING NAMED EXPORTS/IMPORTS. USE DEFAULT EXPORT FOR METADATA ONLY IN INDEX FILE.

// TODO: CREATE BulletMenu COMPONENT USING BulletDropdown UNDER THE HOOD. ALLOWING MULTI-LEVEL OBJECT IN items PROP. (ADD autoSpacing TOO (MODIFY BulletDropdown ACCORDINGLY TO GET ALL NEEDED MEASURES))
// TODO: SEE REACT SPRINGS FOR A GOOD BulletMenu EXAMPLE. IMPROVE BulletDropdown ACCORDINGLY.

// TODO: IMPLEMENT REACT ESLINT RULES (SEE CODISTICA ESLINT CONFIG PACKAGE). IMPORTANT FOR CHECKS LIKE useEffect DEPENDENCIES.
// TODO: ENFORCE BRACKETS IN PROPS ASSIGNMENTS.

// TODO: CHECK THAT PROPS VALUES ARE NEVER CHANGED.

// TODO: MOVE ALL POSSIBLE STYLES TO SCSS FILES TO LOWER SPECIFICITY.
// TODO: USE DIRECT SIMPLE CLASSNAMES WHEN POSSIBLE.

// TODO: RENAME ViewportMonitor -> DynamicViewport?
// TODO: IT IS IMPORTANT TO MAKE DynamicViewport, OverscrollBlocker AND THEIR IMPLEMENTATIONS BREAK-PROOF.
// TODO: CHECK ALL VIEWPORT UNITS USAGES IN MONOREPO.

// TODO: FOR <TabBoundary>, CATCH ALL focus/blur EVENTS AND PREVENT/FORWARD AS NEEDED (A GLOBAL window LISTENER COULD BE NEEDED TO DETECT FOCUS FROM AND TO ELEMENTS OUTSIDE BOUNDARY).

// TODO: MOVE ALL CUSTOMIZATION LOGIC FOR EACH COMPONENT TO A styles.js FILE IN EACH COMPONENT DIRECTORY.
// TODO: USE COMPONENTS MEMOIZATION WHEN POSSIBLE.
// TODO: DEFINE A CONVENTION FOR LOCAL/INLINE STYLES (ANALOG TO componentClassNames).

// TODO: USE getRefHandler (ADJUST CURRENT HOCs ACCORDINGLY (USE this.componentRef.current FOR CONSISTENCY REASONS))

// TODO: MOVE mergeStyles AND mergeClassNames TO @codistica/browser.

// TODO: SIMPLIFY REF ACQUISITION IN FUNCTIONAL COMPONENTS LIKE "ref={myRef}"

// TODO: USE will-change CSS PROP WHERE NEEDED.

// TODO: MAKE SURE THAT ALL STATE CHANGES DEPENDING ON PREVIOUS STATE USE CALLBACK METHOD.
// TODO: MAKE SURE THAT ALL POSITION fixed OR absolute HAVE EXPLICITLY SET COORDINATES (left, top, etc...).

// TODO: TEST CHANGING SLIDES CHILDREN DYNAMICALLY (BY CHANGING STATE). ESPECIALLY THE CASE OF TO/FROM NO CHILDREN.
// TODO: setState LIKE FUNCTIONS ARE NOT NEEDED AS useEffect OR useCallback DEPENDENCIES.

// TODO: ADD DRAG SUPPORT FOR TrackSlide.
// TODO: ADD SUPPORT FOR KEYBOARD IN SLIDES (NAVIGATE WITH ARROWS, GOTO WITH NUMBERS, ETC)

// TODO: RENAME sophistication

// TODO: CREATE SEPARATE @codistica/react-mui PACKAGE.
// TODO: CREATE @codistica/srp PACKAGE?
// TODO: CREATE @codistica/aws-client AND @codistica/aws-server PACKAGES?

// TODO: CLEANLY EXPOSE USEFUL TYPES (LIKE INPUT PLUGINS AND PRESETS TYPES). USE MUI CONVENTION CheckboxProps, TracklessSlideProps, ETC... APPEND Type AT THE END.

// TODO: REMOVE GLOBAL CUSTOMIZATION FROM WHERE UNNECESSARY (LIKE UTILS).
// TODO: REMOVE UNNECESSARY ROOT CSS.
