/** @module node/modules/file-utils/get-paths-tree-sync */

import {statSync} from 'fs';
import {objectUtils} from '@codistica/core';
import {scanSync} from './scan-sync.js';

// TODO: WIP
// TODO: IMPROVE!
// TODO: CREATE async VERSION.

/**
 * @description Builds a tree of directories starting at the specified path.
 * @param {string} startingDirectory - The starting directory.
 * @returns {Object<string,*>} Directory tree.
 */
function getPathsTreeSync(startingDirectory) {
    const output = {
        ext: {},
        dir: {}
    };
    scanSync(startingDirectory).forEach((path) => {
        let extension = null;
        let relativePath = null;
        let stat = statSync(path);
        if (stat.isDirectory()) {
            return;
        }
        relativePath = path.replace(startingDirectory, '');
        // BY EXTENSION
        extension = relativePath.match(/(?<=[\w-]\.)\w+$/);
        if (extension !== null) {
            extension = extension[0];
            output.ext[extension] = output.ext[extension] || [];
            output.ext[extension].push(path);
        }
        // BY DIRECTORY
        objectUtils.seek(
            output.dir,
            relativePath
                .replace(/\/[^/]*$/, '')
                .replace(/^\//, '')
                .replace(/\//g, '.') + '._only[]', // TODO: DO objectUtils.seek() FIRST
            path
        );
    });
    return output;
}

export {getPathsTreeSync};
