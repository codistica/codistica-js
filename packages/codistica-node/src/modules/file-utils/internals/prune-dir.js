/** @module node/modules/file-utils/prune-dir */

import {log} from '@codistica/core';
import {Types} from '@codistica/types';
import {readdir} from '../../promisified-fs/internals/readdir.js';
import {rmdir} from '../../promisified-fs/internals/rmdir.js';
import {stat} from '../../promisified-fs/internals/stat.js';
import {forEach} from './for-each.js';

const pruneDirTypes = new Types({
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

/** @typedef {(string|RegExp|Array<(string|RegExp)>)} pruneDirRawExpType */

/**
 * @typedef pruneDirOptionsType
 * @property {pruneDirRawExpType} [ignore=null] - Paths to be ignored.
 */

/**
 * @async
 * @description Traverse specified path and remove empty directories.
 * @param {string} path - The target directory path.
 * @param {pruneDirOptionsType} [options] - Prune options.
 * @returns {Promise<Array<string>>} Promise. Removed directories.
 */
async function pruneDir(path, options) {
    ({path, options} = pruneDirTypes.validate({
        path,
        options
    }));

    if (!pruneDirTypes.isValid()) {
        log.error('pruneDir()', 'ARGUMENTS ERROR. ABORTING')();
        return null;
    }

    const output = [];

    /**
     * @async
     * @description Remove directory if empty.
     * @param {string} p - Path.
     * @returns {Promise<void>} Promise. Void.
     */
    const removeDirectoryIfEmpty = async (p) => {
        if (!(await readdir(p)).length) {
            await rmdir(p);
            output.push(p);
        }
    };

    await forEach(
        path,
        async (p, s) => {
            if (s.isDirectory()) {
                await removeDirectoryIfEmpty(p);
            }
        },
        {
            ignore: options.ignore,
            reverse: true
        }
    );

    if ((await stat(path)).isDirectory()) {
        await removeDirectoryIfEmpty(path);
    }

    return output;
}

export {pruneDir};
