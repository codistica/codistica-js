const cp = require('child_process');

/**
 * @function yarnRun
 * @description Programmatically run yarn scripts from current working directory.
 * @param {string} scriptName - Yarn script to be ran.
 * @param {Function} [callback] - Callback.
 * @returns {void} Void.
 */
module.exports = function yarnRun(scriptName, callback) {
    const yarnTestQuickExec = {
        cmd: 'yarn',
        args: ['run', scriptName]
    };
    cp.spawn(yarnTestQuickExec.cmd, yarnTestQuickExec.args, {
        cwd: process.cwd(),
        stdio: ['inherit', 'inherit', 'inherit'],
        shell: process.platform === 'win32'
    }).on('exit', (exitCode) => {
        if (exitCode !== 0) {
            typeof callback === 'function' &&
                callback(new Error('SCRIPT EXECUTION FAILED'));
        }
        typeof callback === 'function' && callback();
    });
};
