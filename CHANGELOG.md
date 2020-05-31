# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org).

This change log adheres to standards from [Keep a CHANGELOG](https://keepachangelog.com).

## Single Package Change Logs

* [codistica-browser](packages/codistica-browser/CHANGELOG.md)
* [codistica-core](packages/codistica-core/CHANGELOG.md)
* [codistica-dev-tools](packages/codistica-dev-tools/CHANGELOG.md)
* [codistica-node](packages/codistica-node/CHANGELOG.md)
* [codistica-react](packages/codistica-react/CHANGELOG.md)
* [codistica-scriptfiber](packages/codistica-scriptfiber/CHANGELOG.md)
* [codistica-types](packages/codistica-types/CHANGELOG.md)

## [Unreleased]

### Changed
- Renamed: `run:demo` -> `start:demo` and `run:react` -> `start:react` scripts.

### Fixed
- Missing date tag in this Change Log.

### Packages Bumps

## [2020-05-16]

### Added
- Lerna config `ignoreChanges` property has been added.

### Fixed
- Typo in `bump` script at root's `package.json`.

### Packages Bumps
- `@codistica/browser`: 1.0.0-beta.3
- `@codistica/react`: 1.0.0-beta.5
- `@codistica/scriptfiber`: 1.0.0-beta.3

## [2020-05-13]

### Fixed
- Minor corrections in this change log.

### Packages Bumps
- `@codistica/react`: 1.0.0-beta.4

## [2020-05-07]

### Added
- Coveralls integration to have feedback on code coverage.
- Automate tag creation on push to master.

### Changed
- Other minor changes to monorepo configuration.
- Complete build procedure added to Husky pre-push handler routine.
- JSDoc documentation generation made local for each package instead of global for the entire monorepo.
- Module groups naming convention to start with a lowercase (EX: `ObjectUtils` -> `objectUtils`).
- All dependencies have been upgraded.

### Packages Bumps
- `@codistica/browser`: 1.0.0-beta.2
- `@codistica/core`: 1.0.0-beta.2
- `@codistica/demo`: 1.0.0-beta.2
- `@codistica/dev-tools`: 1.0.0-beta.2
- `@codistica/node`: 1.0.0-beta.2
- `@codistica/react`: 1.0.0-beta.3
- `@codistica/scriptfiber`: 1.0.0-beta.2
- `@codistica/types`: 1.0.0-beta.2

## [2020-04-23]

### Added
- Extended root ESLint config for packages using `create-react-app`.
- `run:demo` script to launch `@codistica/demo`.
- `types` property in root `tsconfig.json` file to avoid types conflicts.

### Packages Bumps
- `@codistica/demo`: 1.0.0-beta.1
- `@codistica/react`: 1.0.0-beta.2

## [2020-04-22]

### Packages Bumps
- `@codistica/browser`: 1.0.0-beta.1
- `@codistica/core`: 1.0.0-beta.1
- `@codistica/dev-tools`: 1.0.0-beta.1
- `@codistica/node`: 1.0.0-beta.1
- `@codistica/react`: 1.0.0-beta.1
- `@codistica/scriptfiber`: 1.0.0-beta.1
- `@codistica/types`: 1.0.0-beta.1

## Earlier releases (20/04/21 and younger)
See [GitHub release notes](https://github.com/codistica/codistica-js/releases?after=2020/04/22)
for info on changes for earlier releases.

[Unreleased]: https://github.com/codistica/codistica-js/compare/master...HEAD
[2020-05-16]: https://github.com/codistica/codistica-js/compare/2020/05/13...2020/05/16
[2020-05-13]: https://github.com/codistica/codistica-js/compare/2020/05/07...2020/05/13
[2020-05-07]: https://github.com/codistica/codistica-js/compare/2020/04/23...2020/05/07
[2020-04-23]: https://github.com/codistica/codistica-js/compare/2020/04/22...2020/04/23
[2020-04-22]: https://github.com/codistica/codistica-js/compare/2020/04/21...2020/04/22
