#!/usr/bin/env node

/** @module dev-tools/bin/codistica-dev-tools */

(async () => {
    switch (process.argv[2]) {
        case 'run':
            await import('../scripts/run.js');
            break;

        default:
    }
})();
