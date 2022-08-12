# Contributing to Codistica JS

_(Work in progress.)_

Thank you for contributing to Codistica JS.

Before starting, be sure you have installed:

-   [Node][node-url]
-   [Yarn][yarn-url]
-   [Git][git-url]

## Code Styling

In order to guarantee harmony to the repository,
any code modification should follow the rules stated in this file.

## Javascript Standard

Use [ES6][es6-url] standard.

**Example:**

```js
import {importedSomething} from 'file'; // YEAH
const importedSomething = require('file'); // NOPE

let a = 5; // YEAH
var a = 5; // YIKES

export {exportedSomething}; // :-)
module.export = exportedSomething; // :-(
```

## Type Checking

-   For packages featuring React, we will use [Flow][flow-url] as type checker.

-   For any other package, we will use pure [JSDoc][jsdoc-url] that will be then parsed by [TypeScript][typescript-url] to generate and ship declaration files (more about this below).

## Comments

Add as many comments as needed so others understand what is going on.
Comments should be in capital letters and be placed close to where they are referring.

**Example:**

```js
// PRINTING NUMBERS 1 UP TO 3
[1, 2, 3].forEach((n) => {
    console.log(n);
});
```

## Modular Approach

If you think any new or existing code can be reused,
it would be better to add it as a new standalone module, class or constant.

## JSDoc and TypeScript

Any new function or class should be documented using [JSDoc][jsdoc-url]. It facilitates type checking without
intruding the code, easing any further access to it.
Use other piece codes to guide yourself.

**Example:**

```js
/**
 * @description Adds one to the input.
 * @param {number} input - Input number.
 * @returns {number} Input plus one.
 */
function addOne(input) {
    return input + 1;
}
```

## Testing

Every modification to the code should have a corresponding testing adaptation.

### Running Tests Locally

Running tests is important to catch any unexpected behavior.

```bash
yarn test:quick
```

or

```bash
yarn build
yarn test
```

_(NOTE: The repository has to be built for tests to work)_

### Tests Locations

Tests are located just beside the source file, respecting the following naming convention: `name-of-source-file.test.js`.

### Adding/Modifying/Removing Tests

Every module should have a test that runs every single line of the interested code, so be sure
any addition/modification/removal of code meets this requirement.

## Commits

In order to keep an organized workflow, be sure to split any modification to different
packages onto separate commits.
Commits should have the following syntax:

```bash
[<TAG>][<PACKAGE-NAME>] - <DESCRIPTION>.
```

Available tags are:

-   **[DOCS]** - Documentation related commits.
-   **[FIX]** - Bug and other code fixes.
-   **[NEW]** - Addition of something new.
-   **[POLISH]** - Code rewritten.
-   **[REFACTOR]** - File renaming.
-   **[TESTS]** - Addition/modification of tests.

Available package names are:

-   **browser**
-   **core**
-   **demo**
-   **dev-tools**
-   **node**
-   **react**
-   **react-icons**
-   **react-mui**
-   **scriptfiber**
-   **types**

_(NOTE: A [git hook][git-hooks-url] handler will run to validate and auto-fix every commit message, be sure you do not have pre-hooks disabled.)_

## Changelogs

On the changelog files of the interested packages,
add your contribution under the
'unreleased' title (and under the section(s) that better matches your contribution).

Sections can be:

-   **Added**
-   **Changed**
-   **Fixed**

Your contribution may look like this:

```md
### Added

-   Brief description (#<Issue number>, @<your github username>).
```

_(NOTE: if you prefer, you can keep your username anonymous, just write
"Anonymous" instead of your github username)_

Then, at the bottom of the changelog file, under the 'CONTRIBUTORS' section,
link your username to your github profile link:

```md
<!--CONTRIBUTORS-->

[@<your github username>]: <Your github profile url>
```

Finally, link the issue number to the actual issue that originated your pull
request under the 'ISSUES' section:

```md
<!--ISSUES-->

[#<issue number>]: <issue url>
```

_(NOTE: If your contribution has no related issue, you can skip this part)_

### Pull Requests

Once the hard job is done, it's the moment for a [pull request][pull-request-url].
This is the way to implement your changes to the codebase, so they will be published in
the next release.

[Create a new pull request][codistica-pr-url] from `your-branch` to `develop`.
Fill the template and submit the pull request for review.

#### Thank you for making Codistica JS better for everyone!

<!--EXTERNAL LINKS-->

[codistica-pr-url]: https://github.com/codistica/codistica-js/pulls
[es6-url]: http://es6-features.org/
[flow-url]: https://flow.org/en/
[typescript-url]: https://www.typescriptlang.org/
[git-url]: https://git-scm.com/
[git-hooks-url]: https://githooks.com/
[jsdoc-url]: https://jsdoc.app/
[node-url]: https://nodejs.org/en/
[pull-request-url]: https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests
[yarn-url]: https://yarnpkg.com/
