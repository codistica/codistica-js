/** @module node/modules/parse-cmd-args */

import {parsePrimitive} from '@codistica/core';

/**
 * @typedef parseCmdArgsOutputType
 * @property {(string|null)} _interpreter - Eventual interpreter used to run script.
 * @property {(string|null)} _script - Eventual script to be ran using interpreter.
 * @property {Array<*>} _all - All parsed segments.
 */

/**
 * @description Creates an object containing parsed process arguments from passed process argv array.
 * @param {Array<string>} argv - The process argv array.
 * @returns {parseCmdArgsOutputType} Generated object.
 */
function parseCmdArgs(argv) {
    const outputArgs = {
        _interpreter: null,
        _script: null,
        _all: []
    };
    let i = 0;
    let length = argv.length;

    for (i = 0; i < length; i++) {
        if (i === 0 && /^node$/i.test(argv[0])) {
            outputArgs._interpreter = 'node';
            outputArgs._script = argv[1];
        }

        if (argv[i].startsWith('-')) {
            // REMOVE AT MOST TWO LEADING '-'
            argv[i] = argv[i].replace(/^-{1,2}/, '');

            if (/[^=]+=[^=]+$/.test(argv[i])) {
                // CASE: --key=value OR -key=value
                outputArgs[argv[i].match(/^.+(?==)/)[0]] = parsePrimitive(
                    argv[i].match(/(?<==).+$/)[0]
                );
            } else if (i + 1 < length && !argv[i + 1].startsWith('-')) {
                // CASE: --key value OR -key value
                outputArgs[argv[i]] = parsePrimitive(argv[i + 1]);
                i++;
            } else {
                // CASE: --flag OR -flag
                outputArgs[argv[i]] = true;
            }
        } else {
            // CASE: DEFAULT
            outputArgs[argv[i]] = argv[i];
            outputArgs._all.push(argv[i]);
        }
    }

    return outputArgs;
}

export {parseCmdArgs};
