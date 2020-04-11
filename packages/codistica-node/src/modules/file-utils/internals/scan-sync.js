/** @module node/modules/file-utils/scan-sync */

import {readdirSync, statSync} from 'fs';
import {join} from 'path';
import {log, RegExpUtils} from '@codistica/core';
import {Types} from '@codistica/types';
import {getAbsolutePath} from './get-absolute-path.js';

const rawExpSchema = {
    type: ['string', 'RegExp', 'Array<string|RegExp>'],
    def: null
};

const scanSyncSchema = new Types({
    startingDirectory: {type: '!undefined'},
    options: {
        type: 'Object',
        def: {
            maxDepth: {type: 'number', def: Infinity},
            ignore: rawExpSchema
        }
    }
});

/** @typedef {(string|RegExp|Array<(string|RegExp)>)} scanSyncRawExpType */

/**
 * @typedef scanSyncOptionsType
 * @property {number} [maxDepth=Infinity] - Recursion maximum depth.
 * @property {scanSyncRawExpType} [ignore=null] - Paths to be ignored.
 */

/**
 * @description Recurses through passes starting directory path and returns an array with all found paths.
 * @param {string} startingDirectory - The starting directory path.
 * @param {scanSyncOptionsType} [options] - Scan options.
 * @returns {(Array<string>|null)} Found files path array.
 */
function scanSync(startingDirectory, options) {
    ({startingDirectory, options} = scanSyncSchema.validate({
        startingDirectory,
        options
    }));
    if (!scanSyncSchema.isValid()) {
        log.error('scanSync()', 'ARGUMENTS ERROR. ABORTING')();
        return null;
    }

    const output = [];
    let startingStat = null;

    startingDirectory = getAbsolutePath(startingDirectory);
    output.push(startingDirectory);

    startingStat = statSync(startingDirectory);

    if (startingStat.isDirectory()) {
        recurse(startingDirectory, 0);
    } else {
        log.error('scanSync()', 'NOT A DIRECTORY')();
    }

    /**
     * @description Recursive function.
     * @param {string} dirPath - Current directory path.
     * @param {number} depth - Current directory depth.
     * @returns {void} Void.
     */
    function recurse(dirPath, depth) {
        let names = readdirSync(dirPath);
        let currentPath = null;
        let currentStat = null;
        depth++;
        for (const name of names) {
            currentPath = join(dirPath, name);

            // CHECK IGNORE
            if (RegExpUtils.checkOne(currentPath, options.ignore)) {
                continue;
            }

            currentStat = statSync(currentPath);

            output.push(currentPath);
            if (currentStat.isDirectory() && depth < options.maxDepth) {
                recurse(currentPath, depth);
            }
        }
    }

    return output;
}

export {scanSync};
