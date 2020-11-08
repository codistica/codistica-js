/**
 * @todo REMOVE THIS MODULE AND REPLACE IT'S USAGES WITH NODE NEW "fs/promises" WHEN POLYFILL IS AVAILABLE.
 */

import {access} from './internals/access.js';
import {readFile} from './internals/read-file.js';
import {readdir} from './internals/readdir.js';
import {realpath} from './internals/realpath.js';
import {rmdir} from './internals/rmdir.js';
import {stat} from './internals/stat.js';
import {unlink} from './internals/unlink.js';
import {writeFile} from './internals/write-file.js';

// TODO: SPECIFY THAT THIS ARE SIMPLIFIED VERSIONS TO WORK WITH ONLY STINGS AS INPUTS AND OUTPUTS
// TODO: RE-CHECK ALL JS DOCS BASED ON THIS

export {access, readFile, readdir, realpath, rmdir, stat, unlink, writeFile};
