/** @module dev-tools/modules/npm-bin */

import {exec} from 'child_process';

/**
 * @async
 * @description Returns nearest npm bin directory path or global npm bin directory path if useGlobalFlag is provided.
 * @param {boolean} [useGlobalFlag=false] - Use global flag (-g).
 * @returns {Promise<string>} Promise. Found npm bin directory.
 */
async function npmBin(useGlobalFlag) {
    let npmBinExec = {};

    if (typeof useGlobalFlag !== 'boolean') {
        useGlobalFlag = false;
    }

    npmBinExec = {
        cmd: 'npm',
        args: [' bin', useGlobalFlag ? ' -g' : '']
    };

    return await new Promise((resolve, reject) => {
        exec(
            npmBinExec.cmd +
                npmBinExec.args.reduce((a, b) => {
                    return a + ' ' + b;
                }),
            {
                // DO NOT PASS UNSANITIZED CODE
                cwd: process.cwd(),
                env: Object.assign({}, process.env, {
                    // CUSTOM ENV
                })
            },
            (err, stdout) => {
                if (err !== null) {
                    reject(err);
                } else {
                    resolve(stdout.trim());
                }
            }
        );
    });
}

export {npmBin};
