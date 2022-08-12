/** @module node/modules/file-utils/for-each-sync */

import {readdirSync, statSync} from 'fs';
import {join} from 'path';
import {log, regExpUtils} from '@codistica/core';
import {Types} from '@codistica/types';
import {getAbsolutePath} from './get-absolute-path.js';

const forEachSyncTypes = new Types({
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

/** @typedef {(string|RegExp|Array<(string|RegExp)>)} forEachSyncRawExpType */

/**
 * @typedef forEachSyncOptionsType
 * @property {number} [maxDepth=Infinity] - Recursion maximum depth.
 * @property {forEachSyncRawExpType} [ignore=null] - Paths to be ignored.
 * @property {boolean} [reverse=false] - Reverse traversing.
 */

/**
 * @description Recurse through passed starting directory path and call a callback for each found path.
 * @param {string} path - The starting directory path.
 * @param {function(string, Object<string,*>): void} callback - Function to be executed for each found path.
 * @param {forEachSyncOptionsType} [options] - Recursion options.
 * @returns {void} Void.
 */
function forEachSync(path, callback, options) {
    ({path, callback, options} = forEachSyncTypes.validate({
        path,
        callback,
        options
    }));

    if (!forEachSyncTypes.isValid()) {
        log.error('forEachSync()', 'ARGUMENTS ERROR. ABORTING')();
        return;
    }

    path = getAbsolutePath(path);

    if (statSync(path).isDirectory()) {
        recurse(path, 0);
    } else {
        log.error('forEachSync()', 'NOT A DIRECTORY')();
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

        const segments = readdirSync(_path).map((basename) => {
            const p = join(_path, basename);
            const s = statSync(p);
            return {
                path: p,
                stat: s
            };
        });

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
                recurse(segment.path, _depth + 1);
            }

            if (options.reverse) {
                callback(segment.path, segment.stat);
            }
        }
    }
}

export {forEachSync};
