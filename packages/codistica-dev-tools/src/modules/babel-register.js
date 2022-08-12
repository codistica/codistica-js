/** @module dev-tools/modules/babel-register */

import {isAbsolute, join, relative} from 'path';
import {fileUtils} from '@codistica/node';

const {searchUpwards} = fileUtils;

/**
 * @async
 * @description Runs the specified script using Babel Register.
 * @param {string} script - Absolute path or name of the script to be run.
 * @returns {Promise<*>} Promise. Executed script returned value.
 * @throws {Error} If no Babel preset env is found.
 * @throws {Error} If script argument is not of type string.
 * @throws {Error} If no script is found.
 */
async function babelRegister(script) {
    const babelPresetEnvPath = await searchUpwards(
        __dirname,
        './node_modules/@babel/preset-env',
        process.cwd()
    );

    if (!babelPresetEnvPath) {
        throw new Error('BABEL PRESET ENV NOT FOUND.');
    }

    if (typeof script !== 'string') {
        throw new Error('NO VALID SCRIPT ARGUMENT FOUND.');
    }

    const foundScriptPath = await searchUpwards(
        __dirname,
        isAbsolute(script) ? script : join('./node_modules/.bin/', script),
        process.cwd()
    );

    if (!foundScriptPath) {
        throw new Error('SCRIPT NOT FOUND.');
    }

    (await import('@babel/register'))({
        configFile: false,
        babelrc: false,
        presets: [
            [
                babelPresetEnvPath, // CURRENT WORKING DIRECTORY WILL BE CALLER'S PACKAGE ROOT, SO PASS AN ABSOLUTE PATH
                {
                    targets: {
                        node: '10.0.0'
                    },
                    useBuiltIns: 'usage',
                    corejs: 3
                }
            ]
        ]
    });

    return await import(relative(__dirname, foundScriptPath));
}

export {babelRegister};
