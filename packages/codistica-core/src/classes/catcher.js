/** @module core/classes/catcher */

import {Types} from '@codistica/types';
import {log} from '../modules/log.js';

// TODO: WORK IN PROGRESS.

const catcherTypes = new Types({
    options: {
        type: 'Object',
        def: {
            enableLogging: {type: 'boolean', def: false}
        }
    }
});

/**
 * @typedef catcherOptionsType
 * @property {boolean} [enableLogging=false] - Makes catcher log errors using internal logger.
 */

/**
 * @classdesc A class for error catching and handling.
 */
class Catcher {
    /**
     * @description Constructor.
     * @param {catcherOptionsType} [options] - Catcher options.
     */
    constructor(options) {
        ({options} = catcherTypes.validate({options}));
        /** @type {catcherOptionsType} */
        this.options = options;

        this.onReject = this.onReject.bind(this);
    }

    /**
     * @instance
     * @description Handler argument for catch method.
     * @param {*} reason - Rejection reason.
     * @returns {*} Default value for resolving promise when an error is caught.
     */
    onReject(reason) {
        // TODO: DEFINE STRATEGY FOR DEFAULT VALUE.
        // TODO: DEFINE STRATEGY TO DETERMINE WHEN ERROR IS FATAL.
        // TODO: DEFINE STRATEGY TO TERMINATE FUNCTION WHEN ERROR IS FATAL.
        // TODO: MAYBE SOMETHING LIKE: somePromise.catch(catcher.onReject(defaultValue)) - IF NO DEFAULT VALUE, THE FATAL, THEN TERMINATE.
        // TODO: LEVERAGE CHAINING? GET PROMISE INSIDE HANDLER? RECEIVE IT AS PROP? DO NOT USE .catch() BUT WRAP FUNCTION? (MAYBE LATEST NOT BECAUSE OF TYPES)
        // TODO: MARK ALREADY HANDLED ERRORS. HANDLED COUNT?
        // TODO: SEND ERRORS TO SERVER BY DEFAULT WHEN CONFIGURED. ADD OPTION IN CATCHER TO NOT SEND LOG.
        // TODO: ADD RETHROW UTILITY.
        // TODO: USE WRAPPERS? BINDING?
        if (this.options.enableLogging) {
            log.error('onReject()', reason)();
        }
        // TODO: RE-THROW IF NOT HANDLED.
        // TODO: ADD OPTION TO ALWAYS RE-THROW?
        // TODO: USER SHOULD BE ABLE TO ACCESS ORIGINAL ERROR OBJECT OR AT LEAST RECEIVE ERROR NAME/CODE TO KNOW HOW TO HANDLE IT.
        return undefined;
    }

    /**
     * @description Analyzes input for error type.
     * @param {*} input - Input.
     * @returns {string} Found error type.
     */
    static getErrorType(input) {
        if (
            !Array.isArray(input) &&
            typeof input === 'object' &&
            input !== null
        ) {
            if (input instanceof EvalError) {
                return 'EvalError';
            } else if (input instanceof RangeError) {
                return 'EvalError';
            } else if (input instanceof ReferenceError) {
                return 'ReferenceError';
            } else if (input instanceof SyntaxError) {
                return 'SyntaxError';
            } else if (input instanceof TypeError) {
                return 'TypeError';
            } else if (input instanceof URIError) {
                return 'URIError';
            }
        }
        return 'unknown';
    }

    /**
     * @description Collect runtime environment information for error submission.
     * @returns {Object<string,*>} Found error type.
     */
    static getEnvironmentObject() {
        return {};
    }
}

export {Catcher};
