/** @module node/plugins/log-file-logger/async */

import {LogFileLoggerCore} from './core.js';

/**
 * @typedef logFileLoggerLogObjType
 * @property {string} type - Log type.
 * @property {string} color - Log color.
 * @property {string} backgroundColor - Log background color.
 * @property {string} caller - Log caller.
 * @property {*} msg - Log message.
 * @property {string} consoleMethod - Console method to be used.
 * @property {Date} date - Log date.
 */

/**
 * @typedef logFileLoggerOptionsType
 * @property {number} [logLvl=9] - Log level.
 * @property {string} [logsPath=`${process.cwd()}/logs`] - Path to write logs.
 * @property {string} [logsFilename='logs.txt'] - File to write logs.
 */

/**
 * @classdesc Plugin for @codistica/core Log class. File logger.
 */
class LogFileLogger extends LogFileLoggerCore {
    /**
     * @description Constructor.
     * @param {logFileLoggerOptionsType} [options] - File logger options.
     */
    constructor(options) {
        super();
        this.options = options;
    }

    /**
     * @instance
     * @async
     * @description Send log method.
     * @param {logFileLoggerLogObjType} logObj - The log object.
     * @returns {Promise<void>} Void.
     */
    async sendLog(logObj) {
        // TODO
        console.log(logObj);
    }
}

export {LogFileLogger};
