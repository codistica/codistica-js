# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org).

This change log adheres to standards from [Keep a CHANGELOG](https://keepachangelog.com).

## [Unreleased]

## [1.0.0-beta.3] - 2020-05-07

### Added
- New triangle-dropdown component.
- New tooltip-hoc module.
- New hover-icon and social-icons components.
- Add custom JSS instance for components customization.

## Changed
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

[Unreleased]: https://github.com/codistica/codistica-js/compare/@codistica/react@1.0.0-beta.3...HEAD
[1.0.0-beta.3]: https://github.com/codistica/codistica-js/compare/@codistica/react@1.0.0-beta.2...@codistica/react@1.0.0-beta.3
[1.0.0-beta.2]: https://github.com/codistica/codistica-js/compare/@codistica/react@1.0.0-beta.1...@codistica/react@1.0.0-beta.2
[1.0.0-beta.1]: https://github.com/codistica/codistica-js/compare/@codistica/react@1.0.0-beta.0...@codistica/react@1.0.0-beta.1
