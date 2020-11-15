/** @module node/modules/file-utils/copy */

import {join, basename} from 'path';
import {arrayUtils} from '@codistica/core';
import {copyFile} from '../../promisified-fs/internals/copy-file.js';
import {mkdir} from '../../promisified-fs/internals/mkdir.js';
import {stat} from '../../promisified-fs/internals/stat.js';
import {exists} from './exists.js';
import {getAbsolutePath} from './get-absolute-path.js';
import {scan} from './scan.js';

// TODO: IMPORTANT. CHECK THAT COPY SUCCEEDED BEFORE ADDING TO copiedPaths.

/**
 * @async
 * @description Copies input files to specified location.
 * @param {(Array<string>|string)} input - Input.
 * @param {string} targetDirPath - Target directory path.
 * @param {boolean} [force] - Overwrite existing files.
 * @returns {Promise<Array<string>>} Promise. Copied paths array.
 */
async function copy(input, targetDirPath, force) {
    const copiedPaths = [];

    targetDirPath = getAbsolutePath(targetDirPath);

    if (!(await exists(targetDirPath))) {
        await mkdir(targetDirPath, {recursive: true});
    }

    await Promise.all(
        arrayUtils.normalize(input).map(async (currentInput) => {
            currentInput = getAbsolutePath(currentInput);

            if ((await stat(currentInput)).isDirectory()) {
                // COPY DIRECTORY

                const sourceDirPath = currentInput;
                const sourceDirName = basename(sourceDirPath);

                await Promise.all(
                    (await scan(sourceDirPath)).map(async (sourcePath) => {
                        const relativePath = sourcePath.replace(
                            sourceDirPath,
                            ''
                        );

                        const destinationPath = join(
                            targetDirPath,
                            sourceDirName,
                            relativePath
                        );

                        if (!(await exists(destinationPath)) || force) {
                            if ((await stat(sourcePath)).isDirectory()) {
                                await mkdir(destinationPath);
                                copiedPaths.push(destinationPath);
                            } else {
                                await copyFile(sourcePath, destinationPath);
                                copiedPaths.push(sourcePath);
                            }
                        }
                    })
                );
            } else {
                // COPY FILE

                const sourcePath = currentInput;

                const destinationPath = join(
                    targetDirPath,
                    basename(sourcePath)
                );

                if (!(await exists(destinationPath)) || force) {
                    await copyFile(sourcePath, destinationPath);
                    copiedPaths.push(sourcePath);
                }
            }
        })
    );

    return copiedPaths;
}

export {copy};
