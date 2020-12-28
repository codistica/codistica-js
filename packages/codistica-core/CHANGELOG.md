# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning][semver-url].

This change log adheres to standards from [Keep a CHANGELOG][keep-a-changelog-url].

## [unreleased]

## [1.0.0-beta.6] - 2020-11-26

### Added

-   New `SHORTHEX` AND `LONGHEX` RegExps.
-   New `compose-fn` module.
-   New `clamp` module in `number-utils`.
-   New `get-char-type` module in `string-utils`.
-   New `split-by-words` module in `string-utils`.
-   New `to-kebab-case` module in `string-utils`.
-   New `to-pascal-case` module in `string-utils`.
-   New `to-title-case` module in `string-utils`.
-   New `capitalize-first` module in `string-utils`.
-   New `to-camel-case` module in `string-utils`.

### Fixed

-   Fixed some JSDoc tag paths and descriptions in tests.

## [1.0.0-beta.5] - 2020-10-16

### Added

-   New `event-emitter` class.
-   New `strip-query-string` module in `url-utils`.
-   New `stringify-query-string` module in `url-utils`.
-   New `parse-query-string` module in `url-utils`.
-   New `url-utils` module group.

## [1.0.0-beta.4] - 2020-07-10

### Added

-   New `create-state-promise` module in `promise-utils`.
-   New `auto-clear-promises` module in `promise-utils`.
-   New `promise-utils` module group.
-   New `get-values-array` module in `object-utils`.

### Changed

-   Removed `envent-utils` module group.

## [1.0.0-beta.3] - 2020-06-01

### Added

-   New `get-shortest-path` module in `array-utils`.
-   New `conditional-timeout` module.
-   New `create-heartbeat-timeout` module.

### Changed

-   Some cleanups.
-   Renamed: `create-timeout` -> `controlled-timeout` module.

## [1.0.0-beta.2] - 2020-05-07

### Changed

-   All dependencies have been upgraded.

### Fixed

-   Make `arrayUtils.flatten` method respect input order.

## [1.0.0-beta.1] - 2020-04-22

### Fixed

-   Types not being published because of wrong directory path in package.json files property.
-   Wrong URLs in this Change Log.

## Earlier releases (1.0.0-beta.0 and younger)

See [GitHub release notes][earlier] for info on changes for earlier releases.

[unreleased]: https://github.com/codistica/codistica-js/compare/@codistica/core@1.0.0-beta.6...HEAD
[1.0.0-beta.6]: https://github.com/codistica/codistica-js/compare/@codistica/core@1.0.0-beta.5...@codistica/core@1.0.0-beta.6
[1.0.0-beta.5]: https://github.com/codistica/codistica-js/compare/@codistica/core@1.0.0-beta.4...@codistica/core@1.0.0-beta.5
[1.0.0-beta.4]: https://github.com/codistica/codistica-js/compare/@codistica/core@1.0.0-beta.3...@codistica/core@1.0.0-beta.4
[1.0.0-beta.3]: https://github.com/codistica/codistica-js/compare/@codistica/core@1.0.0-beta.2...@codistica/core@1.0.0-beta.3
[1.0.0-beta.2]: https://github.com/codistica/codistica-js/compare/@codistica/core@1.0.0-beta.1...@codistica/core@1.0.0-beta.2
[1.0.0-beta.1]: https://github.com/codistica/codistica-js/compare/@codistica/core@1.0.0-beta.0...@codistica/core@1.0.0-beta.1
[earlier]: https://github.com/codistica/codistica-js/releases?after=@codistica/core@1.0.0-beta.1

<!--EXTERNAL LINKS-->

[semver-url]: https://semver.org
[keep-a-changelog-url]: https://keepachangelog.com
