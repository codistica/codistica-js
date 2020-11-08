// *** IMPORTS ***

import * as webpackUtils from './modules/webpack-utils/index.js';

// *** EXPORTS ***

// GROUPS
export {webpackUtils};

// LOADERS
export {jsonWebpackLoader} from './loaders/json-webpack-loader.js';

// MODULES
export {babelRegister} from './modules/babel-register.js';
export {npmBin} from './modules/npm-bin.js';
export {npmBinSync} from './modules/npm-bin-sync.js';

// PLUGINS
export {ManifestWebpackPlugin} from './plugins/manifest-webpack-plugin.js';
export {RecompileWebpackPlugin} from './plugins/recompile-webpack-plugin.js';

// TODO: ADD UTILITY COMMANDS FOR GIT MANAGEMENT (CHANGING COMMITS, FIXING TAGS, FIXING GITIGNORE, ETC...)
// TODO: FINISH FOR Webpack 4, THEN ADJUST FOR Webpack 5. (HOWEVER, WHEN HAVING ISSUES, CHECK IF Webpack 5 WOULD MAKE THINGS EASIER).
