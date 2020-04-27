/** @module node/modules/file-utils/get-paths-tree */

import {statSync} from 'fs';
import {objectUtils} from '@codistica/core';
import {scanSync} from './scan-sync.js';

/**
 * @description Builds a tree of directories starting at the specified path.
 * @param {string} startingDirectory - The starting directory.
 * @returns {Object<string,*>} Directory tree.
 */
function getPathsTree(startingDirectory) {
    // TODO: IMPROVE!
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

export {getPathsTree};
