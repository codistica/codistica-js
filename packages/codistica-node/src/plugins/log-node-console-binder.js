/** @module node/plugins/log-node-console-binder */

import {default as chalk} from 'chalk';

/**
 * @typedef logNodeConsoleBinderLogObjType
 * @property {string} type - Log type.
 * @property {string} color - Log color.
 * @property {string} backgroundColor - Log background color.
 * @property {string} caller - Log caller.
 * @property {*} msg - Log message.
 * @property {string} consoleMethod - Console method to be used.
 * @property {Date} date - Log date.
 */

/**
 * @classdesc Plugin for @codistica/core Log class. Node console binder.
 */
class LogNodeConsoleBinder {
    /**
     * @instance
     * @description Send log method.
     * @param {logNodeConsoleBinderLogObjType} logObj - The log object.
     * @returns {Function} Bound log function.
     */
    sendLog(logObj) {
        const consoleFn = console[logObj.consoleMethod] || console.log;
        return consoleFn.bind(
            null,
            chalk.hex(logObj.color)(logObj.type) + logObj.caller + logObj.msg
        );
    }
}

export {LogNodeConsoleBinder};
