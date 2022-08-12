/** @module node/modules/file-utils/prune-dir-sync */

import {readdirSync, rmdirSync, statSync} from 'fs';
import {log} from '@codistica/core';
import {Types} from '@codistica/types';
import {forEachSync} from './for-each-sync.js';

const pruneDirSyncTypes = new Types({
    path: {type: 'string'},
    options: {
        type: 'Object',
        def: {
            ignore: {
                type: ['string', 'RegExp', 'Array<string|RegExp>'],
                def: null
            }
        }
    }
});

/** @typedef {(string|RegExp|Array<(string|RegExp)>)} pruneDirSyncRawExpType */

/**
 * @typedef pruneDirSyncOptionsType
 * @property {pruneDirSyncRawExpType} [ignore=null] - Paths to be ignored.
 */

/**
 * @description Traverse specified path and remove empty directories.
 * @param {string} path - The target directory path.
 * @param {pruneDirSyncOptionsType} [options] - Prune options.
 * @returns {Array<string>} Removed directories.
 */
function pruneDirSync(path, options) {
    ({path, options} = pruneDirSyncTypes.validate({
        path,
        options
    }));

    if (!pruneDirSyncTypes.isValid()) {
        log.error('pruneDirSync()', 'ARGUMENTS ERROR. ABORTING')();
        return null;
    }

    const output = [];

    /**
     * @description Remove directory if empty.
     * @param {string} p - Path.
     * @returns {void} Void.
     */
    const removeDirectoryIfEmpty = (p) => {
        if (!readdirSync(p).length) {
            rmdirSync(p);
            output.push(p);
        }
    };

    forEachSync(
        path,
        (p, s) => {
            if (s.isDirectory()) {
                removeDirectoryIfEmpty(p);
            }
        },
        {
            ignore: options.ignore,
            reverse: true
        }
    );

    if (statSync(path).isDirectory()) {
        removeDirectoryIfEmpty(path);
    }

    return output;
}

export {pruneDirSync};
