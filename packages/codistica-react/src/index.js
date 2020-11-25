/** @flow */

/** @todo FOLLOW https://github.com/facebook/flow/issues/8354. */
/** @todo FOLLOW https://youtrack.jetbrains.com/issue/WEB-45239. */
/** @todo FOLLOW https://youtrack.jetbrains.com/issue/WEB-45223. */

// *** IMPORTS ***

import * as inputBlockers from './plugins/input-blockers';
import * as inputFilters from './plugins/input-filters';
import * as inputPresets from './plugins/input-presets';
import * as inputValidators from './plugins/input-validators';

import type {FormValidationObjectType} from './utils/form';
import type {PluginType as InputPluginType} from './utils/input-renderer';

// *** EXPORTS ***

// GROUPS
export {inputBlockers, inputFilters, inputPresets, inputValidators};

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

// CONTEXTS
export {JssOptionsProvider} from './contexts/jss-options-context';
export {ThemeProvider} from './contexts/theme-context';

// HOCs
export {withGetUniqueID} from './hocs/with-get-unique-id';
export {withOnClickOutside} from './hocs/with-on-click-outside';
export {withOnDrag} from './hocs/with-on-drag';
export {withOnScrollAction} from './hocs/with-on-scroll-action';
export {withOverscrollBlocker} from './hocs/with-overscroll-blocker';
export {withSophistication} from './hocs/with-sophistication';
export {withTooltip} from './hocs/with-tooltip';
export {withViewportMonitor} from './hocs/with-viewport-monitor';

// HOOKS
export {useSingleton} from './hooks/use-singleton';
export {useJssOptions} from './hooks/use-jss-options';
export {useTheme} from './hooks/use-theme';
export {useGetUniqueID} from './hooks/use-get-unique-id';

// MODULES
export {createGetSophistication} from './modules/create-get-sophistication';
export {createSophistication} from './modules/create-sophistication';
export {getDisplayName} from './modules/get-display-name';
export {getRefHandler} from './modules/get-ref-handler';
export {defaultJss} from './modules/jss';
export {mergeClassNames} from './modules/merge-class-names';
export {mergeStyles} from './modules/merge-styles';
export {uniqueID} from './modules/unique-id';

// UTILS
export {AnchorWrapper} from './utils/anchor-wrapper';
export {Draggable} from './utils/draggable';
export {Form} from './utils/form';
export {HoverSwitch} from './utils/hover-switch';
export {InputRenderer} from './utils/input-renderer';

// TYPES
export type {InputPluginType, FormValidationObjectType};

// TODO: FIX (this: any)?
// TODO: FIX (...args: Array<any>) => any
// TODO: FIX REFS FORWARDING TYPES
// TODO: CORRECTLY ANNOTATE HOCs RETURNED COMPONENTS.
// TODO: ADD NATIVE DOM PROPS TO COMPONENTS THAT ACCEPT THEM? EXTEND PROPS?
// TODO: SOLVE HOCs AND FUNCTIONAL COMPONENTS COMPATIBILITY ISSUE. (USE CUSTOM REF PROP CONVENTION?, USE forwardRef REF IN EACH FUNCTIONAL COMPONENT? (MAYBE BEST CHOICE)) (SEE OTHER LIBRARIES, LIKE Material-UI
// TODO: REPLACE React.forwardRef WITH forwardRef
// TODO: REPLACE React.Component WITH Component.
// TODO: ADD CORRECT DISPLAY NAMES.

// TODO: USE REF INSTEAD OF onMount?
// TODO: componentRef PROP?
// TODO: HOWEVER CHANGE onMount NAME TO MORE SPECIFIC NAMES. ESPECIALLY FOR CALLBACKS THAT WILL BE MADE MORE TIMES, NOT ONLY ON COMPONENT MOUNT.

// TODO: CHECK refs USAGES.
// TODO: IMPROVE PATTERNS USING refs INSIDE LIFECYCLE METHODS (LIKE componentDidMount AND componentWillUnmount). Refs may not be available.
// TODO: EXECUTE CODE ON setRef METHODS WITH AN INITIALIZATION FLAG. AND CLEAN ON componentWillUnmount IF EFFECTIVELY INITIALIZED.

// TODO: FILTER OUT PROPERTIES THAT SHOULD NOT ARRIVE TO OTHER ELEMENTS.
// TODO: FILTER OUT UNNEEDED ATTRIBUTES.
// TODO: CHECK DOM ATTRIBUTES VALUE TYPE.

// TODO: ENFORCE HANDLERS NAMING CONVENTION (EX: onClickHandler...).
// TODO: ENFORCE FULL NAMES (ALSO FOR FILES) IN ALL MONOREPO (...Validator, ...Preset, ...Icon, etc...).

// TODO: CREATE BulletMenu COMPONENT USING BulletDropdown UNDER THE HOOD. ALLOWING MULTI-LEVEL OBJECT IN items PROP. (ADD autoSpacing TOO (MODIFY BulletDropdown ACCORDINGLY TO GET ALL NEEDED MEASURES))
// TODO: SEE REACT SPRINGS FOR A GOOD BulletMenu EXAMPLE. IMPROVE BulletDropdown ACCORDINGLY.

// TODO: CHECK THAT PROPS VALUES ARE NEVER CHANGED.

// TODO: MOVE ALL POSSIBLE STYLES TO SCSS FILES TO LOWER SPECIFICITY.
// TODO: USE DIRECT SIMPLE CLASSNAMES WHEN POSSIBLE.

// TODO: RENAME ViewportMonitor -> DynamicViewport?
// TODO: IT IS IMPORTANT TO MAKE DynamicViewport, OverscrollBlocker AND THEIR IMPLEMENTATIONS BREAK-PROOF.
// TODO: CHECK ALL VIEWPORT UNITS USAGES IN MONOREPO.

// TODO: FOR <TabBoundary>, CATCH ALL focus/blur EVENTS AND PREVENT/FORWARD AS NEEDED (A GLOBAL window LISTENER COULD BE NEEDED TO DETECT FOCUS FROM AND TO ELEMENTS OUTSIDE BOUNDARY).

// TODO: USE getRefHandler (ADJUST CURRENT HOCs ACCORDINGLY (USE this.componentRef.current FOR CONSISTENCY REASONS))

// TODO: MOVE mergeStyles AND mergeClassNames TO @codistica/browser.

// TODO: SIMPLIFY REF ACQUISITION IN FUNCTIONAL COMPONENTS LIKE "ref={myRef}"

// TODO: MAKE SURE THAT ALL STATE CHANGES DEPENDING ON PREVIOUS STATE USE CALLBACK METHOD.
// TODO: MAKE SURE THAT ALL POSITION fixed OR absolute HAVE EXPLICITLY SET COORDINATES (left, top, etc...).

// TODO: TEST CHANGING SLIDES CHILDREN DYNAMICALLY (BY CHANGING STATE). ESPECIALLY THE CASE OF TO/FROM NO CHILDREN.

// TODO: ADD DRAG SUPPORT FOR OTHER SLIDES.
// TODO: ADD SUPPORT FOR KEYBOARD IN SLIDES (NAVIGATE WITH ARROWS, GOTO WITH NUMBERS, ETC)

// TODO: CREATE @codistica/srp PACKAGE?
// TODO: CREATE @codistica/aws-client AND @codistica/aws-server PACKAGES?
// TODO: CREATE @codistica/react-aws-amplify?

// TODO: CLEANLY EXPOSE USEFUL TYPES (LIKE INPUT PLUGINS AND PRESETS TYPES). USE MUI CONVENTION CheckboxProps, TracklessSlideProps, ETC... APPEND Type AT THE END.
// TODO USE Type SUFFIX EVERYWHERE FOR ALL EXPORTED TYPES.

// TODO: REMOVE UNNECESSARY GLOBAL STYLING (LEAVE ONLY FOR "COMPONENTS"?).
// TODO: REMOVE UNNECESSARY CUSTOM STYLING (LEAVE ONLY FOR "COMPONENTS"?).
// TODO: REMOVE UNNECESSARY RESET CSS (LEAVE ONLY FOR "COMPONENTS"?).

// TODO: REMOVE JSDOC.
