/** @module browser/plugins/log-browser-console-binder */

/**
 * @typedef logBrowserConsoleBinderLogObjType
 * @property {string} type - Log type.
 * @property {string} color - Log color.
 * @property {string} backgroundColor - Log background color.
 * @property {string} caller - Log caller.
 * @property {*} msg - Log message.
 * @property {string} consoleMethod - Console method to be used.
 * @property {Date} date - Log date.
 */

/**
 * @classdesc Plugin for @codistica/core Log class. Browser console binder.
 */
class LogBrowserConsoleBinder {
    /**
     * @instance
     * @description Send log method.
     * @param {logBrowserConsoleBinderLogObjType} logObj - The log object.
     * @returns {Function} Bound log function.
     */
    sendLog(logObj) {
        const consoleFn = console[logObj.consoleMethod] || console.log;
        const cssColors = `color: ${logObj.color}; backgroundColor: ${logObj.backgroundColor}`;
        return consoleFn.bind(
            null,
            ...[
                '%c' + logObj.type + '%c' + logObj.caller + '%c' + logObj.msg,
                cssColors + ' font-family: monospace; white-space: pre;',
                'color: #888888; font-family: monospace; white-space: pre;',
                'color: #aaaaaa; font-family: monospace; white-space: pre;'
            ]
        );
    }
}

export {LogBrowserConsoleBinder};
