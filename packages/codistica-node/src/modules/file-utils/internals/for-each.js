/** @module node/modules/file-utils/for-each */

import {join} from 'path';
import {log, regExpUtils} from '@codistica/core';
import {Types} from '@codistica/types';
import {readdir} from '../../promisified-fs/internals/readdir.js';
import {stat} from '../../promisified-fs/internals/stat.js';
import {getAbsolutePath} from './get-absolute-path.js';

const forEachTypes = new Types({
    path: {type: 'string'},
    callback: {type: 'Function'},
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

/** @typedef {(string|RegExp|Array<(string|RegExp)>)} forEachRawExpType */

/**
 * @typedef forEachOptionsType
 * @property {number} [maxDepth=Infinity] - Recursion maximum depth.
 * @property {forEachRawExpType} [ignore=null] - Paths to be ignored.
 * @property {boolean} [reverse=false] - Reverse traversing.
 */

/**
 * @async
 * @description Recurse through passed starting directory path and call a callback for each found path.
 * @param {string} path - The starting directory path.
 * @param {function(string, Object<string,*>): void} callback - Function to be executed for each found path.
 * @param {forEachOptionsType} [options] - Recursion options.
 * @returns {Promise<void>} Promise. Void.
 */
async function forEach(path, callback, options) {
    ({path, callback, options} = forEachTypes.validate({
        path,
        callback,
        options
    }));

    if (!forEachTypes.isValid()) {
        log.error('forEach()', 'ARGUMENTS ERROR. ABORTING')();
        return;
    }

    path = getAbsolutePath(path);

    if ((await stat(path)).isDirectory()) {
        await recurse(path, 0);
    } else {
        log.error('forEach()', 'NOT A DIRECTORY')();
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

        const segments = await Promise.all(
            (
                await readdir(_path)
            ).map(async (basename) => {
                const p = join(_path, basename);
                const s = await stat(p);
                return {
                    path: p,
                    stat: s
                };
            })
        );

        if (options.reverse) {
            segments.sort((a, b) => {
                if (a.stat.isDirectory() && !b.stat.isDirectory()) {
                    return -1;
                }

                if (!a.stat.isDirectory() && b.stat.isDirectory()) {
                    return 1;
                }

                return 0;
            });
        }

        for (const segment of segments) {
            // CHECK IGNORE
            if (regExpUtils.checkOne(segment.path, options.ignore)) {
                continue;
            }

            if (!options.reverse) {
                callback(segment.path, segment.stat);
            }

            if (segment.stat.isDirectory()) {
                await recurse(segment.path, _depth + 1);
            }

            if (options.reverse) {
                callback(segment.path, segment.stat);
            }
        }
    }
}

export {forEach};
