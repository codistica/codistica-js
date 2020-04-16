/** @module dev-tools/loaders/json-webpack-loader */

import {default as jsonLoader} from 'json-loader';
import {getOptions} from 'loader-utils';

// TODO: SEE OTHER LOADER WRITING POSSIBILITIES LIKE LOADER DEPENDENCIES, etc. MAYBE IT OPENS NEW POSSIBILITIES

// TODO
// const validateOptions = require('schema-utils');

// TODO
// const optionsSchema = {
//     type: 'object',
//     properties: {
//         data: {
//             type: 'Object'
//         }
//     }
// };

jsonWebpackLoader.loaderAbsolutePath = __filename;

/**
 * @typedef jsonWebpackLoaderOptionsType
 * @property {((function(): Object<string,*>)|Object<string,*>)} data - Data object or function returning data object.
 */

/**
 * @description Webpack loader for loading data from memory at compile time.
 * @this {Object<string,*>} jsonWebpackLoader
 * @param {string} source - Source.
 * @returns {string} New source.
 */
function jsonWebpackLoader(source) {
    /** @type {jsonWebpackLoaderOptionsType} */
    const options = getOptions(this);

    // TODO
    // validateOptions(optionsSchema, options, 'ScriptfiberManifestLoader');

    const dataObject =
        typeof options.data === 'function' ? options.data() : options.data;

    let loadedObject = typeof source === 'string' ? JSON.parse(source) : source;

    if (this.cacheable) {
        this.cacheable(false);
    }

    for (const i in dataObject) {
        if (!dataObject.hasOwnProperty(i)) {
            continue;
        }
        loadedObject[i] = dataObject[i];
    }

    return jsonLoader(JSON.stringify(loadedObject));
}

export {jsonWebpackLoader};
