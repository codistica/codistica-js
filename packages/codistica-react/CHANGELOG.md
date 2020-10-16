# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org).

This change log adheres to standards from [Keep a CHANGELOG](https://keepachangelog.com).

## [Unreleased]

## [1.0.0-beta.8] - 2020-10-16

### Added
- New onAbort support on input-validator-plugin-utils.
- Extended email-validator plugin features.

### Changed
- Other minor improvements/fixes.
- Improved input plugins schema definitions.
- InputContext converted into FormContext.
- Make get-ref-handler work for any number of arguments.
- Improved Flow type annotations.

### Fixed
- Wrong Material-UI packages dependencies.

## [1.0.0-beta.7] - 2020-07-10

### Added
- Some Material-UI input components wrapped with `input-renderer` utility for validation support.
- Form validation ecosystem:
   - Both `form` and `input-renderer` utility components have been modified and improved to be integrable with any input component.
   - Added async validation support.
   - Added inputs linking support at form level.
   - Validation data flow has been improved.
   - Improved and extended plugin system. `presets` has been converted into a new `plugin` category.
   - Bug fixes.
- New `input-plugin-manager` class.
   - New `input-validator-plugin-utils` class.
   - New `word-validator` input renderer plugin.
   - New `async-validator` input renderer plugin.
- New `anchor-wrapper` utility component.
- New `img-hover-switch` utility component.

### Changed
- Removed `presence-validator` input renderer plugin.
- Removed `hover-icon` component.

## [1.0.0-beta.6] - 2020-06-01

### Added
- New `carousel-slide` component.
- New `full-screen-slide` component.
- New `track-slide` component.
- New `trackless-slide` component.
- New `get-ref-handler` module.
- New `with-on-scroll-action` hoc.

### Changed
- Several cleanups.
- `viewport-monitor` has been moved to `@codistica/browser` package.
- Renamed: `with-overscroll-monitor` -> `with-overscroll-blocker` hoc.
- `overscroll-monitor` has been heavily improved, renamed to `overscroll-blocker` and moved to `@codistica/browser` package.
- Removed: `slide` component in favor of `track-slide`.

## [1.0.0-beta.5] - 2020-05-16

### Added
- New global customization pattern implemented for all components via `globalStyles`, `globalClassNames` and `gloablColors` when available.

### Changed
- Some cleanups.
- `merge-class-names` module has been modified to match `merge-styles` syntax. Both modules have been polished.
- HOCs type annotations have been improved.
- HOCs have been separated from classes (for `overscroll-monitor` and `viewport-monitor`).
- Style import naming convention (EX: `classNames` -> `componentClassNames`).

### Fixed
- Some missing annotations in this change log.

## [1.0.0-beta.4] - 2020-05-13

### Added
- New customization pattern implemented for all components via `customStyles`, `customClassNames` and `customColors` when available.
- New reset css common module.
- New merge-class-names module.
- New merge-styles module.

### Changed
- Other performance improvements and cleanups.
- ClassNames and styles management normalization and cleanup.
- Style import naming convention (EX: `styles` -> `classNames`).
- Rename `triangle-dropdown` to `bullet-dropdown`.
- Rename `social-icons` to `icons`.
- HOCs naming convention (EX: `onClickOutsideHOC` -> `withOnClickOutside`).

## [1.0.0-beta.3] - 2020-05-07

### Added
- New triangle-dropdown component.
- New tooltip-hoc module.
- New hover-icon and social-icons components.
- Add custom JSS instance for components customization.

### Changed
- Package cleanup.
- All dependencies have been upgraded.
- All Storybook stories have been rewritten to match new CSF story format.
- Improved JSDoc annotations.
- Style import naming convention to start with a lowercase (EX: `Styles` -> `styles`).
- Form and Input components have been completely rewritten:
    - Logic has been split across multiple files for maintainability and scalability.
    - Mandatory flags and input matching rules are now configurable at input level and not at form's.
    - Blockers, filters and validators have been unified into a new `plugins` prop.
    - Components are now customizable via `customStyles` and `customColors` props.
    - Other stability and performance improvements.

## [1.0.0-beta.2] - 2020-04-23

### Fixed
- Flow not detecting types when consuming components because 
of full path being used for importing in `index.js` file. See [Flow #8354 Issue](https://github.com/facebook/flow/issues/8354).

## [1.0.0-beta.1] - 2020-04-22

### Fixed
- Types not being published because of wrong directory path in package.json files property.
- Wrong URLs in this Change Log.

## Earlier releases (1.0.0-beta.0 and younger)
See [GitHub release notes](https://github.com/codistica/codistica-js/releases?after=@codistica/react@1.0.0-beta.1)
for info on changes for earlier releases.

[Unreleased]: https://github.com/codistica/codistica-js/compare/@codistica/react@1.0.0-beta.8...HEAD
[1.0.0-beta.8]: https://github.com/codistica/codistica-js/compare/@codistica/react@1.0.0-beta.7...@codistica/react@1.0.0-beta.8
[1.0.0-beta.7]: https://github.com/codistica/codistica-js/compare/@codistica/react@1.0.0-beta.6...@codistica/react@1.0.0-beta.7
[1.0.0-beta.6]: https://github.com/codistica/codistica-js/compare/@codistica/react@1.0.0-beta.5...@codistica/react@1.0.0-beta.6
[1.0.0-beta.5]: https://github.com/codistica/codistica-js/compare/@codistica/react@1.0.0-beta.4...@codistica/react@1.0.0-beta.5
[1.0.0-beta.4]: https://github.com/codistica/codistica-js/compare/@codistica/react@1.0.0-beta.3...@codistica/react@1.0.0-beta.4
[1.0.0-beta.3]: https://github.com/codistica/codistica-js/compare/@codistica/react@1.0.0-beta.2...@codistica/react@1.0.0-beta.3
[1.0.0-beta.2]: https://github.com/codistica/codistica-js/compare/@codistica/react@1.0.0-beta.1...@codistica/react@1.0.0-beta.2
[1.0.0-beta.1]: https://github.com/codistica/codistica-js/compare/@codistica/react@1.0.0-beta.0...@codistica/react@1.0.0-beta.1
