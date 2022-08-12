/** @module node/modules/file-utils/move-by-ext */

import {resolve, join, relative, dirname} from 'path';
import {copyFile} from '../../promisified-fs/internals/copy-file.js';
import {mkdir} from '../../promisified-fs/internals/mkdir.js';
import {unlink} from '../../promisified-fs/internals/unlink.js';
import {containsPath} from './contains-path.js';
import {forEach} from './for-each.js';

/**
 * @async
 * @description Move all files matching specified extension, respecting source directory structure.
 * @param {string} from - Source path.
 * @param {string} to - Destination path.
 * @param {string} ext - Extension.
 * @returns {Promise<void>} Promise. Void.
 */
async function moveByExt(from, to, ext) {
    const paths = {
        from: resolve(from),
        to: resolve(to),
        ignore: null
    };

    if (containsPath(paths.from, paths.to)) {
        paths.ignore = paths.to;
    }

    await mkdir(paths.to, {recursive: true});

    await forEach(
        paths.from,
        async (p) => {
            if (!p.endsWith(ext)) {
                return;
            }

            const rel = relative(paths.from, p);
            const dest = join(paths.to, rel);

            await mkdir(dirname(dest), {recursive: true});

            await copyFile(p, dest);
            await unlink(p);
        },
        {ignore: paths.ignore}
    );
}

export {moveByExt};
