/** @module node/plugins/log-file-logger/core */

import {stringUtils, STRINGS} from '@codistica/core';

/**
 * @typedef logFileLoggerCoreLogObjType
 * @property {string} type - Log type.
 * @property {string} color - Log color.
 * @property {string} backgroundColor - Log background color.
 * @property {string} caller - Log caller.
 * @property {*} msg - Log message.
 * @property {string} consoleMethod - Console method to be used.
 * @property {Date} date - Log date.
 */

/**
 * @classdesc Plugin for @codistica/core Log class. File logger (core).
 */
class LogFileLoggerCore {
    /**
     * @description Build log string to be written to file.
     * @param {logFileLoggerCoreLogObjType} logObj - Log object.
     * @returns {string} Log string.
     */
    static getLogString(logObj) {
        return (
            `${stringUtils.injectBefore(
                logObj.date.getHours(),
                2,
                '0'
            )}:${stringUtils.injectBefore(
                logObj.date.getMinutes(),
                2,
                '0'
            )}:${stringUtils.injectBefore(
                logObj.date.getSeconds(),
                2,
                '0'
            )}:${stringUtils.injectBefore(
                logObj.date.getMilliseconds(),
                3,
                '0'
            )}` +
            STRINGS.STD_TAB_SPACE +
            logObj.type +
            logObj.caller +
            logObj.msg +
            '\n'
        );
    }
}

export {LogFileLoggerCore};
