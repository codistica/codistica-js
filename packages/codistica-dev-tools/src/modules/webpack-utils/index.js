import {addPlugin} from './internals/add-plugin.js';
import {getPluginIndex} from './internals/get-plugin-index.js';
import {getPluginName} from './internals/get-plugin-name.js';
import {getPlugin} from './internals/get-plugin.js';
import {getResourceChunks} from './internals/get-resource-chunks.js';
import {getResourceFiles} from './internals/get-resource-files.js';
import {getResourceModule} from './internals/get-resource-module.js';
import {instantiatePlugin} from './internals/instantiate-plugin.js';
import {isChildModuleOf} from './internals/is-child-module-of.js';
import {isInitialModule} from './internals/is-initial-module.js';
import {preventPluginTaps} from './internals/prevent-plugin-taps.js';
import {preventTaps} from './internals/prevent-taps.js';
import {removePlugin} from './internals/remove-plugin.js';
import {replaceInEntry} from './internals/replace-in-entry.js';
import {replacePlugin} from './internals/replace-plugin.js';
import {traverseModules} from './internals/traverse-modules.js';

export {
    addPlugin,
    getPluginIndex,
    getPluginName,
    getPlugin,
    getResourceChunks,
    getResourceFiles,
    getResourceModule,
    instantiatePlugin,
    isChildModuleOf,
    isInitialModule,
    preventPluginTaps,
    preventTaps,
    removePlugin,
    replaceInEntry,
    replacePlugin,
    traverseModules
};
