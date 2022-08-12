#!/usr/bin/env node

/** @module dev-tools/bin/codistica-dev-tools */

import {log} from '@codistica/core';
import {LogNodeConsoleBinder} from '@codistica/node';

log.setConsoleBinder(new LogNodeConsoleBinder());

log.info('codistica-dev-tools', "STARTING CODISTICA'S DEV TOOLS")();

const script = process.argv[2];

if (!script) {
    log.error(
        'codistica-dev-tools',
        'PLEASE SPECIFY A SCRIPT TO RUN. ABORTING'
    )();
    process.abort();
}

(async () => {
    switch (script) {
        case 'run':
            log.info('codistica-dev-tools', 'EXECUTING "run" SCRIPT')();
            await import('../scripts/run.js');
            break;

        case 'move-by-ext':
            log.info('codistica-dev-tools', 'EXECUTING "move-by-ext" SCRIPT')();
            await import('../scripts/move-by-ext.js');
            break;

        default:
            log.error(
                'codistica-dev-tools',
                `COULD NOT FIND "${script}" SCRIPT. ABORTING`
            )();
            break;
    }
})();
