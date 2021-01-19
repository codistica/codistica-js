/** @module core/classes/log */

import {Types} from '@codistica/types';
import {noop} from '../modules/noop.js';
import {getLength} from '../modules/object-utils/internals/get-length.js';
import {isObject} from '../modules/object-utils/internals/is-object.js';
import {isPrimitive} from '../modules/object-utils/internals/is-primitive.js';
import {prettify} from '../modules/object-utils/internals/prettify.js';
import {padStart} from '../modules/string-utils/internals/pad-start.js';
import {stringify} from '../modules/stringify.js';

// TODO: TEST/FIX/IMPROVE BROWSER CONSOLE BINDER.
// TODO: TEST/FIX/IMPROVE NODE CONSOLE BINDER.
// TODO: FIX MESSAGES BREAKING WHEN CLOSING/RE-OPENING INSPECTOR (BUG SEEN IN CHROME).

// TODO: OPTIMIZE.

// TODO: DEFINE STRING logLvl WITH A STRING -> NUMBER MAP.
// TODO: EXPOSE METHODS FOR CHANGING logLvl.

// TODO: ADD FEATURE TO GET LOG METHODS WITH BOUND CALLER.
// TODO: ADD CALLER FILTER FEATURE.
// TODO: CREATE UTILITY FOR REMOVING FROM PRODUCTION.
// TODO: REMOVE () FROM ALL CALLERS?
// TODO: LEVERAGE MORE CONSOLE FEATURES, LIKE GROUPS, ETC.
// TODO: OPTION TO LOG STACKS NATIVELY? OR TO RE-THROW?
// TODO: CHANGE verbose WITH full? OR SIMILAR. (verbose AND debug CAN BE USED AS SYNONYMS)

// TODO: ADD OPTION TO NOT DISPLAY CALLER.

const logSchema = new Types({
    options: {
        type: 'Object',
        def: {
            logLvl: {type: 'number', def: 9},
            typeSize: {type: 'number', def: 15},
            callerSize: {type: 'number', def: 25},
            loggers: {type: 'Array', def: []},
            consoleBinder: {type: ['Function', 'null'], def: null}
        }
    }
});

/**
 * @typedef logLogObjType
 * @property {string} type - Log type.
 * @property {string} color - Log color.
 * @property {string} backgroundColor - Log background color.
 * @property {string} caller - Log caller.
 * @property {*} msg - Log message.
 * @property {string} consoleMethod - Console method to be used.
 * @property {Date} date - Log date.
 */

/**
 * @callback logConsoleBinderSendLogType
 * @param {logLogObjType} logObj - The log object.
 * @returns {Function} Bound log function.
 */

/**
 * @callback logLoggerSendLogType
 * @param {logLogObjType} logObj - The log object.
 * @returns {void} Void.
 */

/**
 * @typedef logConsoleBinderType
 * @property {logConsoleBinderSendLogType} sendLog - Send log method.
 */

/**
 * @typedef logLoggerType
 * @property {logLoggerSendLogType} sendLog - Send log method.
 */

/**
 * @typedef logOptionsType
 * @property {number} [logLvl=9] - Log level.
 * @property {number} [typeSize=15] - Log type string size.
 * @property {number} [callerSize=25] - Log caller string size.
 * @property {Array<logLoggerType>} [loggers=[]] - Loggers array.
 * @property {(logConsoleBinderType|null)} [consoleBinder=null] - Console binder.
 */

/**
 * @classdesc A class for logging management.
 */
class Log {
    /**
     * @description Constructor.
     * @param {logOptionsType} [options] - Log options object.
     */
    constructor(options) {
        ({options} = logSchema.validate({options}));
        /** @type {logOptionsType} */
        this.options = options;
    }

    /**
     * @instance
     * @description Send fatal message.
     * @param {string} caller - Log caller.
     * @param {*} msg - Log message.
     * @returns {Function} Bound log function.
     */
    fatal(caller, msg) {
        if (this.options.logLvl >= 1 && this.canLog(msg)) {
            return this.dispatchLog({
                type: '[FATAL]',
                color: '#ffffff',
                backgroundColor: '#ff0000',
                caller,
                msg,
                consoleMethod: 'error',
                date: new Date()
            });
        } else {
            return noop;
        }
    }

    /**
     * @instance
     * @description Send error message.
     * @param {string} caller - Log caller.
     * @param {*} msg - Log message.
     * @returns {Function} Bound log function.
     */
    error(caller, msg) {
        if (this.options.logLvl >= 2 && this.canLog(msg)) {
            return this.dispatchLog({
                type: '[ERROR]',
                color: '#990000',
                backgroundColor: 'transparent',
                caller,
                msg,
                consoleMethod: 'error',
                date: new Date()
            });
        } else {
            return noop;
        }
    }

    /**
     * @instance
     * @description Send warning message.
     * @param {string} caller - Log caller.
     * @param {*} msg - Log message.
     * @returns {Function} Bound log function.
     */
    warning(caller, msg) {
        if (this.options.logLvl >= 3 && this.canLog(msg)) {
            return this.dispatchLog({
                type: '[WARNING]',
                color: '#cc9900',
                backgroundColor: 'transparent',
                caller,
                msg,
                consoleMethod: 'warn',
                date: new Date()
            });
        } else {
            return noop;
        }
    }

    /**
     * @instance
     * @description Send info message.
     * @param {string} caller - Log caller.
     * @param {*} msg - Log message.
     * @returns {Function} Bound log function.
     */
    info(caller, msg) {
        if (this.options.logLvl >= 4 && this.canLog(msg)) {
            return this.dispatchLog({
                type: '[INFO]',
                color: '#000099',
                backgroundColor: 'transparent',
                caller,
                msg,
                consoleMethod: 'info',
                date: new Date()
            });
        } else {
            return noop;
        }
    }

    /**
     * @instance
     * @description Send success message.
     * @param {string} caller - Log caller.
     * @param {*} msg - Log message.
     * @returns {Function} Bound log function.
     */
    success(caller, msg) {
        if (this.options.logLvl >= 5 && this.canLog(msg)) {
            return this.dispatchLog({
                type: '[SUCCESS]',
                color: '#009900',
                backgroundColor: 'transparent',
                caller,
                msg,
                consoleMethod: 'log',
                date: new Date()
            });
        } else {
            return noop;
        }
    }

    /**
     * @instance
     * @description Send result message.
     * @param {string} caller - Log caller.
     * @param {*} msg - Log message.
     * @returns {Function} Bound log function.
     */
    result(caller, msg) {
        if (this.options.logLvl >= 6 && this.canLog(msg)) {
            return this.dispatchLog({
                type: '[RESULT]',
                color: '#99ccff',
                backgroundColor: 'transparent',
                caller,
                msg,
                consoleMethod: 'log',
                date: new Date()
            });
        } else {
            return noop;
        }
    }

    /**
     * @instance
     * @description Send progress message.
     * @param {string} caller - Log caller.
     * @param {*} msg - Log message.
     * @returns {Function} Bound log function.
     */
    progress(caller, msg) {
        if (this.options.logLvl >= 7 && this.canLog(msg)) {
            return this.dispatchLog({
                type: '[PROGRESS]',
                color: '#8a2be2',
                backgroundColor: 'transparent',
                caller,
                msg,
                consoleMethod: 'log',
                date: new Date()
            });
        } else {
            return noop;
        }
    }

    /**
     * @instance
     * @description Send verbose message.
     * @param {string} caller - Log caller.
     * @param {*} msg - Log message.
     * @returns {Function} Bound log function.
     */
    verbose(caller, msg) {
        if (this.options.logLvl >= 8 && this.canLog(msg)) {
            return this.dispatchLog({
                type: '[VERBOSE]',
                color: '#999999',
                backgroundColor: 'transparent',
                caller,
                msg,
                consoleMethod: 'log',
                date: new Date()
            });
        } else {
            return noop;
        }
    }

    /**
     * @instance
     * @description Send debug message.
     * @param {string} caller - Log caller.
     * @param {*} msg - Log message.
     * @returns {Function} Bound log function.
     */
    debug(caller, msg) {
        if (this.options.logLvl >= 9 && this.canLog(msg)) {
            return this.dispatchLog({
                type: '[DEBUG]',
                color: '#ff66ff',
                backgroundColor: 'transparent',
                caller,
                msg,
                consoleMethod: 'debug',
                date: new Date()
            });
        } else {
            return noop;
        }
    }

    /**
     * @instance
     * @description Prepare and send the log object.
     * @param {logLogObjType} logObj - The log object.
     * @returns {Function} Bound log function.
     */
    dispatchLog(logObj) {
        // FORWARD ERROR MESSAGES
        // TODO: IMPROVE. CONSIDER Catcher CLASS
        if (logObj.msg instanceof Error) {
            return this.error(logObj.caller, {
                name: logObj.msg.name,
                message: logObj.msg.message,
                stack: logObj.msg.stack || ''
            });
        }

        // COMPOSE LOG
        this.composeLog(logObj);

        // CALL LOGGERS
        this.options.loggers.forEach((logger) => {
            logger.sendLog(logObj);
        });

        // CALL CONSOLE BINDER AND RETURN BOUND LOG FUNCTION
        if (this.options.consoleBinder !== null) {
            return this.options.consoleBinder.sendLog(logObj);
        } else {
            return noop;
        }
    }

    /**
     * @instance
     * @description Adjust log segments according to options.
     * @param {logLogObjType} logObj - The log object.
     * @returns {void} Void.
     */
    composeLog(logObj) {
        if (isPrimitive(logObj.msg)) {
            logObj.msg = padStart(
                stringify(logObj.msg),
                this.options.typeSize - logObj.type.length,
                ' '
            );
        } else {
            logObj.msg = '\n' + prettify(logObj.msg);
        }
        logObj.caller = padStart(
            logObj.caller,
            this.options.callerSize - logObj.caller.length,
            ' '
        );
    }

    /**
     * @instance
     * @description Adds a logger to the loggers array and returns respective index.
     * @param {logLoggerType} logger - The logger instance to be added.
     * @returns {(number|null)} Added logger index.
     */
    addLogger(logger) {
        if (this.getLoggerIndex(logger.constructor.name) !== null) {
            return null;
        } else {
            return this.options.loggers.push(logger) - 1;
        }
    }

    /**
     * @instance
     * @description Removes the specified logger.
     * @param {string} loggerName - Name of logger to be removed.
     * @returns {boolean} True if a logger has been removed and false otherwise.
     */
    removeLogger(loggerName) {
        const loggerIndex = this.getLoggerIndex(loggerName);
        if (loggerIndex !== null) {
            this.options.loggers.splice(loggerIndex, 1);
            return true;
        } else {
            return false;
        }
    }

    /**
     * @instance
     * @description Removes all loggers.
     * @returns {void} Void.
     */
    clearLoggers() {
        this.options.loggers = [];
    }

    /**
     * @instance
     * @description Searches and returns specified logger index if found.
     * @param {string} loggerName - Logger name.
     * @returns {(number|null)} Found logger index or null.
     */
    getLoggerIndex(loggerName) {
        const length = this.options.loggers.length;
        for (let i = 0; i < length; i++) {
            if (this.options.loggers[i].constructor.name === loggerName) {
                return i;
            }
        }
        return null;
    }

    /**
     * @instance
     * @description Setups the passed console binder.
     * @param {logConsoleBinderType} consoleBinder - The console binder.
     * @param {boolean} [force] - Replace console binder if already exists.
     * @returns {void} Void.
     */
    setConsoleBinder(consoleBinder, force) {
        if (this.options.consoleBinder === null || force) {
            this.options.consoleBinder = consoleBinder;
        } else {
            this.warning(
                'Log()',
                'THERE IS ALREADY A consoleBinder. USE force TO REPLACE. ABORTING'
            )();
        }
    }

    /**
     * @instance
     * @description Remove the current console binder.
     * @returns {boolean} True if a console binder has been removed and false otherwise.
     */
    removeConsoleBinder() {
        if (this.options.consoleBinder !== null) {
            this.options.consoleBinder = null;
            return true;
        } else {
            return false;
        }
    }

    /**
     * @instance
     * @description Indicates if logger can dispatch log with current state.
     * @param {*} msg - Input value.
     * @returns {boolean} Result.
     */
    canLog(msg) {
        return !!(
            Log.isValidMsg(msg) &&
            (this.options.consoleBinder || this.options.loggers.length)
        );
    }

    /**
     * @description Returns true if the passed value is considered a valid message and false otherwise.
     * @param {*} msg - Input value.
     * @returns {boolean} Result.
     */
    static isValidMsg(msg) {
        return (
            typeof msg !== 'undefined' &&
            msg !== '' &&
            (!isObject(msg) || getLength(msg) !== 0)
        );
    }
}

export {Log};
