// MODULES
export {getCacheGroups} from './modules/get-cache-groups.js';
export {getScriptfiberConfig} from './modules/get-scriptfiber-config.js';
export {loader} from './modules/loader.js';
export {webpackConfigurator} from './modules/webpack-configurator.js';

// PLUGINS
export {ScriptfiberRuntimeWebpackPlugin} from './plugins/scriptfiber-runtime-webpack-plugin/index.js';

// TODO: ADD WEBPACK AS PEER DEPENDENCY? ALSO IN OTHER PACKAGES AS NEEDED? WITHOUT IMPACTING CONSUMER EXPERIENCE.
// TODO: FINISH FOR Webpack 4, THEN ADJUST FOR Webpack 5. (HOWEVER, WHEN HAVING ISSUES, CHECK IF Webpack 5 WOULD MAKE THINGS EASIER).
