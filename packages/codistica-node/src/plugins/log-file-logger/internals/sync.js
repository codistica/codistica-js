/** @module node/plugins/log-file-logger/sync */

import {appendFileSync} from 'fs';
import {join} from 'path';
import {STRINGS} from '@codistica/core';
import {LogFileLoggerCore} from './core.js';

/**
 * @typedef logFileLoggerSyncLogObjType
 * @property {string} type - Log type.
 * @property {string} color - Log color.
 * @property {string} backgroundColor - Log background color.
 * @property {string} caller - Log caller.
 * @property {*} msg - Log message.
 * @property {string} consoleMethod - Console method to be used.
 * @property {Date} date - Log date.
 */

/**
 * @typedef logFileLoggerSyncOptionsType
 * @property {number} [logLvl=9] - Log level.
 * @property {string} [logsPath=`${process.cwd()}/logs`] - Path to write logs.
 * @property {string} [logsFilename='logs.txt'] - File to write logs.
 */

/**
 * @classdesc Plugin for @codistica/core Log class. File logger sync.
 */
class LogFileLoggerSync extends LogFileLoggerCore {
    /**
     * @description Constructor.
     * @param {logFileLoggerSyncOptionsType} [options] - File logger options.
     */
    constructor(options) {
        super();
        this.options = options;
    }

    /**
     * @instance
     * @description Send log method.
     * @param {logFileLoggerSyncLogObjType} logObj - The log object.
     * @returns {void} Void.
     */
    sendLog(logObj) {
        appendFileSync(
            join(this.options.logsPath, this.options.logsFilename + '.txt'),
            LogFileLoggerSync.getLogString(logObj),
            {encoding: STRINGS.STD_ENCODING}
        );
    }
}

export {LogFileLoggerSync};
