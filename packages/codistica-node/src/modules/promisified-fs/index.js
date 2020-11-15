/**
 * @todo REMOVE THIS MODULE AND REPLACE IT'S USAGES WITH NODE NEW "fs/promises" WHEN POLYFILL IS AVAILABLE.
 */

import {access} from './internals/access.js';
import {copyFile} from './internals/copy-file.js';
import {mkdir} from './internals/mkdir.js';
import {readFile} from './internals/read-file.js';
import {readdir} from './internals/readdir.js';
import {realpath} from './internals/realpath.js';
import {rmdir} from './internals/rmdir.js';
import {stat} from './internals/stat.js';
import {unlink} from './internals/unlink.js';
import {writeFile} from './internals/write-file.js';

// TODO: REPLICATE ORIGINAL METHODS EXACT SIGNATURE AND MAKE TYPE ANNOTATIONS LESS STRICT IF NEEDED.
// TODO: RE-CHECK ALL JS DOCS.
// TODO: ADJUST USAGES ACCORDINGLY.

export {
    access,
    copyFile,
    mkdir,
    readFile,
    readdir,
    realpath,
    rmdir,
    stat,
    unlink,
    writeFile
};
