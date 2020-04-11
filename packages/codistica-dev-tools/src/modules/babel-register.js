/** @module dev-tools/modules/babel-register */

import {relative, resolve} from 'path';
import {npmBin} from './npm-bin.js';

/**
 * @async
 * @description Runs the specified script using babelRegister.
 * @param {string} scriptPath - Path to the script to be run using babelRegister.
 * @returns {Promise<*>} Promise. Executed script returned value.
 */
async function babelRegister(scriptPath) {
    (await import('@babel/register'))({
        configFile: false,
        babelrc: false,
        presets: [
            [
                resolve(__dirname, '../../node_modules/@babel/preset-env'), // CURRENT WORKING DIRECTORY WILL BE CALLER'S PACKAGE ROOT, SO PASS AN ABSOLUTE PATH
                {
                    targets: {
                        // TODO: PLACE IN CONFIG? USE CONFIG FILE? GET FROM engines IN package.json?
                        node: '10.0.0'
                    },
                    useBuiltIns: 'usage',
                    corejs: 3
                }
            ]
        ]
    });

    try {
        // SEARCH IN CALLERS PATH
        return await import(relative(__dirname, resolve(scriptPath)));
    } catch (err1) {
        try {
            // SEARCH IN LOCAL .bin
            return await import(
                relative(__dirname, resolve(await npmBin(), scriptPath))
            );
        } catch (err2) {
            try {
                // SEARCH IN GLOBAL .bin
                return await import(
                    relative(__dirname, resolve(await npmBin(true), scriptPath))
                );
            } catch (err3) {
                console.error(err1, err2, err3);
            }
        }
    }
}

export {babelRegister};
