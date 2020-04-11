/** @module dev-tools/modules/npm-bin-sync */

import {execSync} from 'child_process';

/**
 * @description Returns nearest npm bin directory path or global npm bin directory path if useGlobalFlag is provided.
 * @param {boolean} [useGlobalFlag=false] - Use global flag (-g).
 * @returns {string} Found npm bin directory.
 */
function npmBinSync(useGlobalFlag) {
    let npmBinExec = {};

    if (typeof useGlobalFlag !== 'boolean') {
        useGlobalFlag = false;
    }

    npmBinExec = {
        cmd: 'npm',
        args: [' bin', useGlobalFlag ? ' -g' : '']
    };

    return execSync(
        npmBinExec.cmd +
            npmBinExec.args.reduce((a, b) => {
                return a + ' ' + b;
            }),
        {
            // DO NOT PASS UNSANITIZED CODE
            cwd: process.cwd(),
            env: Object.assign({}, process.env, {
                // CUSTOM ENV
            }),
            encoding: 'utf8'
        }
    ).trim();
}

export {npmBinSync};
