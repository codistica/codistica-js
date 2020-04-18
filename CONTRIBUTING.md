<!--TODO: -->

# Contributing to codistica-js

Be sure you have installed:
* [Node][node-url] with version > 10.0.0
* [Yarn][yarn-url] with version > 1.22.0


## Code styling
Any code modification should follow the following rules.

### Standard
We use the [ES6][es6-url] standard.

### React
For React components, we also use [Flow][flow-url] typing standard.

### Coments
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
it would be better to add it as a new module, class or constant.

### jsdoc

JSdoc is required for any function as it facilitates typechecking without 
intruding the code.

## Testing
Running internal tests it is important to catch any unexpected behavior.
Tests need the code to be compiled in advance. Tests can be run by typing:
```bash
yarn test:quick
```
or
```bash
yarn build
yarn test
```

All modules should have their respective tests.

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


## Pull Requests

Any modification to codistica-js can only be implemented through a 
[pull request][pull-request-url] to ```develop```.


<!--LINKS-->
[es6-url]: http://es6-features.org/
[flow-url]: https://flow.org/en/
[node-url]: https://nodejs.org/en/
[pull-request-url]: https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests
[readme-url]: https://github.com/codistica/codistica-js/blob/develop/README.md
[webstorm-url]: https://www.jetbrains.com/webstorm/
[yarn-url]: https://yarnpkg.com/
