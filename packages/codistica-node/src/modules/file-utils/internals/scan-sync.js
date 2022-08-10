/** @module node/modules/file-utils/scan-sync */

import {readdirSync, statSync} from 'fs';
import {join} from 'path';
import {log, regExpUtils} from '@codistica/core';
import {Types} from '@codistica/types';
import {getAbsolutePath} from './get-absolute-path.js';

const scanSyncTypes = new Types({
    path: {type: '!undefined'},
    options: {
        type: 'Object',
        def: {
            maxDepth: {type: 'number', def: Infinity},
            ignore: {
                type: ['string', 'RegExp', 'Array<string|RegExp>'],
                def: null
            },
            reverse: {type: 'boolean', def: false}
        }
    }
});

/** @typedef {(string|RegExp|Array<(string|RegExp)>)} scanSyncRawExpType */

/**
 * @typedef scanSyncOptionsType
 * @property {number} [maxDepth=Infinity] - Recursion maximum depth.
 * @property {scanSyncRawExpType} [ignore=null] - Paths to be ignored.
 * @property {boolean} [reverse=false] - Reverse scan.
 */

/**
 * @description Recurse through passed starting directory path and returns an array with all found paths.
 * @param {string} path - The starting directory path.
 * @param {scanSyncOptionsType} [options] - Scan options.
 * @returns {(Array<string>)} Found files path array.
 */
function scanSync(path, options) {
    ({path, options} = scanSyncTypes.validate({
        path,
        options
    }));

    if (!scanSyncTypes.isValid()) {
        log.error('scanSync()', 'ARGUMENTS ERROR. ABORTING')();
        return [];
    }

    path = getAbsolutePath(path);

    const output = [];

    if (statSync(path).isDirectory()) {
        recurse(path, 0);
    } else {
        log.error('scanSync()', 'NOT A DIRECTORY')();
    }

    /**
     * @description Recursive function.
     * @param {string} _path - Current directory path.
     * @param {number} _depth - Current directory depth.
     * @returns {void} Void.
     */
    function recurse(_path, _depth) {
        if (_depth > options.maxDepth) {
            return;
        }

        const names = readdirSync(_path);

        for (const name of names) {
            const currentPath = join(_path, name);

            // CHECK IGNORE
            if (regExpUtils.checkOne(currentPath, options.ignore)) {
                continue;
            }

            const currentStat = statSync(currentPath);

            if (!options.reverse) {
                output.push(currentPath);
            }

            if (currentStat.isDirectory()) {
                recurse(currentPath, _depth + 1);
            }

            if (options.reverse) {
                output.push(currentPath);
            }
        }
    }

    return output;
}

export {scanSync};
