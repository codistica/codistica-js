#!/usr/bin/env node

/** @module dev-tools/bin/codistica-dev-tools */

import {log} from '@codistica/core';
import {LogNodeConsoleBinder} from '@codistica/node';

log.setConsoleBinder(new LogNodeConsoleBinder());

(async () => {
    switch (process.argv[2]) {
        case 'run':
            await import('../scripts/run.js');
            break;

        case 'move-by-ext':
            await import('../scripts/move-by-ext.js');
            break;

        default:
    }
})();
