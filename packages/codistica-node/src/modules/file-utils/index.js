import {clearDirSync} from './internals/clear-dir-sync.js';
import {clearDir} from './internals/clear-dir.js';
import {copySync} from './internals/copy-sync.js';
import {copy} from './internals/copy.js';
import {existsSync} from './internals/exists-sync.js';
import {exists} from './internals/exists.js';
import {forEachSync} from './internals/for-each-sync.js';
import {forEach} from './internals/for-each.js';
import {getAbsolutePath} from './internals/get-absolute-path.js';
import {getJSONSync} from './internals/get-json-sync.js';
import {getJSON} from './internals/get-json.js';
import {getPathsTreeSync} from './internals/get-paths-tree-sync.js';
import {moveByExtSync} from './internals/move-by-ext-sync.js';
import {moveByExt} from './internals/move-by-ext.js';
import {moveSync} from './internals/move-sync.js';
import {move} from './internals/move.js';
import {pruneDirSync} from './internals/prune-dir-sync.js';
import {pruneDir} from './internals/prune-dir.js';
import {putJSONSync} from './internals/put-json-sync.js';
import {putJSON} from './internals/put-json.js';
import {removeSync} from './internals/remove-sync.js';
import {remove} from './internals/remove.js';
import {scanSync} from './internals/scan-sync.js';
import {scan} from './internals/scan.js';
import {searchUpwardsSync} from './internals/search-upwards-sync.js';
import {searchUpwards} from './internals/search-upwards.js';

// TODO: REVIEW ALL CODE.
// TODO: CREATE TESTS (WITH CUSTOM FS MOCK).
// TODO: TEST WITH HIDDEN FILES, ALIASES/LINKS, ETC.
// TODO: TEST root FILES/DIRECTORIES OPERATIONS.
// TODO: TEST ERROR HANDLING AND THROWING.

// TODO: IMPROVE LOGGING.
// TODO: RE-CHECK EVERYTHING. RETURNED VALUES, ERRORS, ETC.
// TODO: IT IS NOT RECOMMENDED TO TEST ACCESSIBILITY BEFORE DOING OTHER OPERATIONS (READ/WRITE). RECOMMENDED WAY IS TO HANDLE ERRORS CASE-BASE-CASE. CREATE UTILITY?
// TODO: CREATE INSTANCE UTILITY (SINGLETON, LIKE log), FOR ERRORS HANDLING. ADD CONFIGURABLE OPTION TO AUTOMATICALLY SEND LOGS TO SERVER (WITH ENVIRONMENT INFORMATION)
// TODO: DEFINE ERROR HANDLING STRATEGY FOR SYNC VERSIONS. (USE Catcher AS A SINGLE SOLUTION?)
// TODO: RE-THROW ERRORS WHEN NOT HANDLED.
// TODO: ADD OPTION TO EACH FUNCTION TO USE CUSTOM fs?
// TODO: MAKE SURE EACH METHOD HAS SYNC/ASYNC MODE.
// TODO: REMOVE UNNECESSARY getAbsolutePath() CALLS.

// TODO: REGULATE MAXIMUM PARALLEL OPERATIONS (CREATE/USE EXISTING UTILS?). INVESTIGATE.
// TODO: DOES NOT NODE HANDLE THIS AUTOMATICALLY?
// TODO: CREATE GLOBAL UTILITY FOR PARALLEL TASKS HANDLING (WITH QUEUE) BASED ON MEMORY USAGE LIMIT AND CONCURRENT OPERATIONS LIMIT.
// TODO: HANDLE PRIORITY? FIRST-COME FIRST-SERVED? TASK PREDICTIVE MEMORY USAGE?
// TODO: AVOID RACE CONDITIONS.

export {
    clearDirSync,
    clearDir,
    copySync,
    copy,
    existsSync,
    exists,
    forEachSync,
    forEach,
    getAbsolutePath,
    getJSONSync,
    getJSON,
    getPathsTreeSync,
    moveByExtSync,
    moveByExt,
    moveSync,
    move,
    pruneDirSync,
    pruneDir,
    putJSONSync,
    putJSON,
    removeSync,
    remove,
    scanSync,
    scan,
    searchUpwardsSync,
    searchUpwards
};
