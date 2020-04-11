#!/usr/bin/env node

/** @module dev-tools/bin/codistica-dev-tools */

'use strict';

import {parseCmdArgs} from '@codistica/node';
import {babelRegister} from '../modules/babel-register.js';

// SET DEFAULT EXIT CODE
process.exitCode = 0;

(async () => {
    const parsedArgs = parseCmdArgs(process.argv);

    switch (parsedArgs._all[2]) {
        case 'run':
            await babelRegister(parsedArgs._all[3]);
            break;

        default:
    }
})();
