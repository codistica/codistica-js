/** @module node/modules/file-utils/copy-sync */

import {existsSync, mkdirSync, statSync, copyFileSync} from 'fs';
import {join, basename} from 'path';
import {arrayUtils} from '@codistica/core';
import {getAbsolutePath} from './get-absolute-path.js';
import {scanSync} from './scan-sync.js';

// TODO: IMPORTANT. CHECK THAT COPY SUCCEEDED BEFORE ADDING TO copiedPaths.

/**
 * @description Copies input files to specified location.
 * @param {(Array<string>|string)} input - Input.
 * @param {string} targetDirPath - Target directory path.
 * @param {boolean} [force] - Overwrite existing files.
 * @returns {Array<string>} Copied paths array.
 */
function copySync(input, targetDirPath, force) {
    const copiedPaths = [];

    targetDirPath = getAbsolutePath(targetDirPath);

    if (!existsSync(targetDirPath)) {
        mkdirSync(targetDirPath, {recursive: true});
    }

    arrayUtils.normalize(input).forEach((currentInput) => {
        currentInput = getAbsolutePath(currentInput);

        if (statSync(currentInput).isDirectory()) {
            // COPY DIRECTORY

            const sourceDirPath = currentInput;
            const sourceDirName = basename(sourceDirPath);

            /**
             * @description Callback.
             * @param {string} sourcePath - Copy source path.
             * @returns {void} - Void.
             */
            const cb = function cb(sourcePath) {
                const relativePath = sourcePath.replace(sourceDirPath, '');

                const destinationPath = join(
                    targetDirPath,
                    sourceDirName,
                    relativePath
                );

                if (!existsSync(destinationPath) || force) {
                    if (statSync(sourcePath).isDirectory()) {
                        mkdirSync(destinationPath);
                        copiedPaths.push(sourcePath);
                    } else {
                        copyFileSync(sourcePath, destinationPath);
                        copiedPaths.push(sourcePath);
                    }
                }
            };

            cb(sourceDirPath);

            scanSync(sourceDirPath).forEach(cb);
        } else {
            // COPY FILE

            const sourcePath = currentInput;

            const destinationPath = join(targetDirPath, basename(sourcePath));

            if (!existsSync(destinationPath) || force) {
                copyFileSync(sourcePath, destinationPath);
                copiedPaths.push(sourcePath);
            }
        }
    });

    return copiedPaths;
}

export {copySync};
