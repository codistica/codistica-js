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
    path: {type: '!undefined'},
    options: {
        type: 'Object',
        def: {
            maxDepth: {type: 'number', def: Infinity},
            ignore: rawExpSchema,
            reverse: {type: 'boolean', def: false}
        }
    }
});

/** @typedef {(string|RegExp|Array<(string|RegExp)>)} scanRawExpType */

/**
 * @typedef scanOptionsType
 * @property {number} [maxDepth=Infinity] - Recursion maximum depth.
 * @property {scanRawExpType} [ignore=null] - Paths to be ignored.
 * @property {boolean} [reverse=false] - Reverse scan.
 */

/**
 * @async
 * @description Recurse through passed starting directory path and returns an array with all found paths.
 * @param {string} path - The starting directory path.
 * @param {scanOptionsType} [options] - Scan options.
 * @returns {(Promise<Array<string>>)} Promise. Found files path array.
 */
async function scan(path, options) {
    ({path, options} = scanSchema.validate({
        path,
        options
    }));

    if (!scanSchema.isValid()) {
        log.error('scan()', 'ARGUMENTS ERROR. ABORTING')();
        return [];
    }

    path = getAbsolutePath(path);

    const output = [];

    if ((await stat(path).catch(catcher.onReject)).isDirectory()) {
        await recurse(path, 0);
    } else {
        log.error('scan()', 'NOT A DIRECTORY')();
    }

    /**
     * @async
     * @description Recursive function.
     * @param {string} _path - Current directory path.
     * @param {number} _depth - Current directory depth.
     * @returns {Promise<void>} Promise. Void.
     */
    async function recurse(_path, _depth) {
        if (_depth > options.maxDepth) {
            return;
        }

        const names = await readdir(_path).catch(catcher.onReject);

        for (const name of names) {
            const currentPath = join(_path, name);

            // CHECK IGNORE
            if (regExpUtils.checkOne(currentPath, options.ignore)) {
                continue;
            }

            const currentStat = await stat(currentPath).catch(catcher.onReject);

            if (!options.reverse) {
                output.push(currentPath);
            }

            if (currentStat.isDirectory()) {
                await recurse(currentPath, _depth + 1);
            }

            if (options.reverse) {
                output.push(currentPath);
            }
        }
    }

    return output;
}

export {scan};
