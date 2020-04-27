/** @module node/modules/file-utils/scan */

import {join} from 'path';
import {log, regExpUtils, catcher} from '@codistica/core';
import {Types} from '@codistica/types';
import {readdir} from '../../promisified-fs/internals/readdir.js';
import {stat} from '../../promisified-fs/internals/stat.js';
import {getAbsolutePath} from './get-absolute-path.js';

const rawExpSchema = {
    type: ['string', 'RegExp', 'Array<string|RegExp>'],
    def: null
};

const scanSchema = new Types({
    startingDirectory: {type: '!undefined'},
    options: {
        type: 'Object',
        def: {
            maxDepth: {type: 'number', def: Infinity},
            ignore: rawExpSchema
        }
    }
});

/** @typedef {(string|RegExp|Array<(string|RegExp)>)} scanRawExpType */

/**
 * @typedef scanOptionsType
 * @property {number} [maxDepth=Infinity] - Recursion maximum depth.
 * @property {scanRawExpType} [ignore=null] - Paths to be ignored.
 */

/**
 * @async
 * @description Recurses through passes starting directory path and returns an array with all found paths.
 * @param {string} startingDirectory - The starting directory path.
 * @param {scanOptionsType} [options] - Scan options.
 * @returns {(Promise<Array<string>|null>)} Promise. Found files path array.
 */
async function scan(startingDirectory, options) {
    ({startingDirectory, options} = scanSchema.validate({
        startingDirectory,
        options
    }));
    if (!scanSchema.isValid()) {
        log.error('scan()', 'ARGUMENTS ERROR. ABORTING')();
        return null;
    }

    const output = [];
    let startingStat = null;

    startingDirectory = getAbsolutePath(startingDirectory);
    output.push(startingDirectory);

    startingStat = await stat(startingDirectory).catch(catcher.onReject);

    if (startingStat.isDirectory()) {
        await recurse(startingDirectory, 0);
    } else {
        log.error('scan()', 'NOT A DIRECTORY')();
    }

    /**
     * @async
     * @description Recursive function.
     * @param {string} dirPath - Current directory path.
     * @param {number} depth - Current directory depth.
     * @returns {Promise<void>} Promise. Void.
     */
    async function recurse(dirPath, depth) {
        let names = await readdir(dirPath).catch(catcher.onReject);
        let currentPath = null;
        let currentStat = null;
        depth++;
        for (const name of names) {
            currentPath = join(dirPath, name);

            // CHECK IGNORE
            if (regExpUtils.checkOne(currentPath, options.ignore)) {
                continue;
            }

            currentStat = await stat(currentPath).catch(catcher.onReject);

            output.push(currentPath);
            if (currentStat.isDirectory() && depth < options.maxDepth) {
                await recurse(currentPath, depth);
            }
        }
    }

    return output;
}

export {scan};
