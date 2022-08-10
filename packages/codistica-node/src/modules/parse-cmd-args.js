/** @module node/modules/parse-cmd-args */

import {parse} from '@codistica/core';

// TODO: REVIEW
// TODO: WRITE TESTS

/**
 * @description Creates an object containing parsed process arguments from passed process argv array.
 * @param {Array<string>} argv - The process argv array.
 * @returns {Object<string,*>} Generated object.
 */
function parseCmdArgs(argv) {
    const outputArgs = {
        _interpreter: null,
        _script: null,
        _unknown: [],
        _all: [...argv]
    };
    let i = 0;
    let length = argv.length;

    for (i = 0; i < length; i++) {
        if (i === 0 && /^node$/i.test(argv[0])) {
            outputArgs._interpreter = 'node';
            outputArgs._script = argv[1];
            i++; // SKIP SCRIPT
        } else if (argv[i].startsWith('-')) {
            // ALLOW AT MOST TWO LEADING '-'
            argv[i] = argv[i].replace(/^-{1,2}/, '');

            if (/[^=]+=[^=]+$/.test(argv[i])) {
                // CASE: --key=value OR -key=value
                outputArgs[argv[i].match(/^.+(?==)/)[0]] = parse(
                    argv[i].match(/(?<==).+$/)[0]
                );
            } else if (i + 1 < length && !argv[i + 1].startsWith('-')) {
                // CASE: --key value OR -key value
                outputArgs[argv[i]] = parse(argv[i + 1]);
                i++;
            } else {
                // CASE: --flag OR -flag
                outputArgs[argv[i]] = true;
            }
        } else {
            // CASE: DEFAULT
            outputArgs._unknown.push(argv[i]);
        }
    }

    return outputArgs;
}

export {parseCmdArgs};
