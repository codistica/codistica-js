/** @module node/modules/file-utils/move-by-ext-sync */

import {copyFileSync, unlinkSync, mkdirSync} from 'fs';
import {resolve, join, relative, dirname} from 'path';
import {containsPath} from './contains-path.js';
import {forEachSync} from './for-each-sync.js';

/**
 * @description Move all files matching specified extension, respecting source directory structure.
 * @param {string} from - Source path.
 * @param {string} to - Destination path.
 * @param {string} ext - Extension.
 * @returns {void} Void.
 */
function moveByExtSync(from, to, ext) {
    const paths = {
        from: resolve(from),
        to: resolve(to),
        ignore: null
    };

    if (containsPath(paths.from, paths.to)) {
        paths.ignore = paths.to;
    }

    mkdirSync(paths.to, {recursive: true});

    forEachSync(
        paths.from,
        (p) => {
            if (!p.endsWith(ext)) {
                return;
            }

            const rel = relative(paths.from, p);
            const dest = join(paths.to, rel);

            mkdirSync(dirname(dest), {recursive: true});

            copyFileSync(p, dest);
            unlinkSync(p);
        },
        {ignore: paths.ignore}
    );
}

export {moveByExtSync};
