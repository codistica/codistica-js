<!--TODO: -->

# Contributing to codistica-js
Thank you for contributing to codistica-js!

Before starting, be sure you have installed:
* [Node][node-url] with version > 10.0.0
* [Yarn][yarn-url] with version > 1.22.0
* [Git][git-url]


## Code styling
In order to guarantee harmony to the repository, 
any code modification should follow the rules stated in this file.

### Javascript Standard
Use [ES6][es6-url] standard.
```js
import {importedSomething} from 'file'; // YEAH
const importedSomething = require('file'); // NOPE

let a = 5; // YEAH
var a = 5; // YIKES

export {exportedSomething} // :-)
module.export = exportedSomething // :-(
```

### React
For the react package, [Flow][flow-url] typing standard will also help us.

### Comments
Add as many comments as needed so others understand whats going on. 
Comments should be in capital letters and close to where it is referring. 
Example:
```js
// PRINTING NUMBERS 1 UP TO 3.
[1, 2, 3].forEach((n) => {
    console.log(n)
});
```

### Modules

If you think any new or existing code can be reused, 
it would be better to add it as a new module, class or constant!

### jsdoc

Any new function or class should be documented with [JSdocs][jsdoc-url]. It facilitates typechecking without 
intruding the code, easing any further access to the code. 
Any documentation should have description, param (type and description) and returns.
Use other piece codes to guide yourself.

e.g.
```js
/**
* @description Adds one to the input.
* @param {number} input - input number.
* @returns {number} input plus one.
*/
function addOne(input) {
    return input + 1;
}
```

## Testing
Every modification to the code should have a corresponding testing adaptation.

### Running internal tests
Running internal tests it is important to catch any unexpected behavior:
```bash
yarn test:quick
```
or
```bash
yarn build
yarn test
```
*(NOTE: The repository has to be built for tests to work, thats why
yarn test by itself won't work.)*

### Tests locations 
Tests are located under the ```__Tests__``` file of each package, having the same
file structure as the ```src``` directory.

### Adding/Modifying/Removing tests
Every module should have a test that runs every single line of the code, so be sure 
any addition/modification/removal of code should have its respective test change.

To add a test, create a new .js file on the correct directory 
```<FILENAME OF MODULE>.test```. Write the test and export it to its parent
```index.test.js``` file. (You can see previous tests to guide yourself).

### Test code style
Testing uses [Chai's Assertion library][chai-url] to run tests. 
Thus a testing module may look like this:

```js
import {assert} from 'chai';
import {mainFunction} from 'mainFunction file path';

function mainFunctionTest() {
    describe('mainFunction()', () => {
        it('Should return true.', () => {
            assert.isTrue(mainFunction('testParam'));
        });
    });
}

export {mainFunctionTest};

```

## Commits
In order to have an organized workflow, be sure to split any modification to different
packages onto separate commits. 
Commits should have the following description:
```bash
[<TAG>][<PACKAGE-NAME>] - <DESCRIPTION>.
```
Available tags:
* <b>[DOCS]</b> - For documentation related commits.
* <b>[FIX]</b> - Bug and other code fixes.
* <b>[MERGE]</b> - Merging previous features into a branch.
* <b>[NEW]</b> - Addition of something new.
* <b>[POLISH]</b> - Code rewritten.
* <b>[REFACTOR]</b> - File renaming.
* <b>[TESTS]</b> - Addition/modification of tests.

Available package names:
See packages section on [README.MD][readme-url]
(NOTE: a [pre-commit][githooks-url] pre-hook will run to validate any commit message,
be sure you do not have pre-hooks disabled)

## Pull Requests

Once the hard job is done, its the moment for a [pull request][pull-request-url]. 
This is the way to implement your changes to the code base and be published in
the next release!. But hold on! before putting the pull request, let the community
know your contributions to codistica-js!

### Add your contribution to the CHANGELOG.md
On the [CHANGELOG.md][changelog-url] files of the interested packages,
add your contribution under the 
'Unreleased' title (and under the section(s) that better matches your contribution).
Sections can be:
* **New Features**
* **Bug Fixes**
* **Documentation**
* **Polish**

Your contribution may look like this:
```md
Brief description ([#<Issue number>], [@<your github username>])
```
*(NOTE: if you prefer, you can keep your username anonymous, just write 
"Anonymous" instead of your github username)*

Then, at the bottom of the CHANGELOG file, under the 'CONTRIBUTORS' section,
link your username to your github profile link:

```
<!--CONTRIBUTORS-->
[@<your github username>]: <Your github profile link>
```

Finally, link the issue number to the actual issue that originated your pull
request under the 'ISSUES' section:

```
<!--ISSUES-->
[#<Issue number>]: <issue link>
```
*(NOTE: If your contribution has no issue related, you may avoid this part)*


### Now the actual pull request

Finally, [create a new pull request][codistica-pr-url] from `your branch` to `develop`.
Fill the template and submit the pull request for review from the codistica team!.


##
#### Thank you for making Codistica JS better for everyone!



<!--EXTERNAL LINKS-->
[chai-url]: https://www.chaijs.com/api/assert/
[changelog-url]: https://github.com/codistica/codistica-js/blob/develop/CHANGELOG.md
[codistica-pr-url]: https://github.com/codistica/codistica-js/pulls
[es6-url]: http://es6-features.org/
[flow-url]: https://flow.org/en/
[git-url]: https://git-scm.com/
[githooks-url]: https://githooks.com/
[jsdoc-url]: https://jsdoc.app/
[node-url]: https://nodejs.org/en/
[pull-request-url]: https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests
[readme-url]: https://github.com/codistica/codistica-js/blob/develop/README.md
[webstorm-url]: https://www.jetbrains.com/webstorm/
[yarn-url]: https://yarnpkg.com/
