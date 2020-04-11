import {clearDirSync} from './internals/clear-dir-sync.js';
import {clearDir} from './internals/clear-dir.js';
import {existsSync} from './internals/exists-sync.js';
import {exists} from './internals/exists.js';
import {getAbsolutePath} from './internals/get-absolute-path.js';
import {getJSONSync} from './internals/get-json-sync.js';
import {getJSON} from './internals/get-json.js';
import {getPathsTree} from './internals/get-paths-tree.js';
import {putJSONSync} from './internals/put-json-sync.js';
import {putJSON} from './internals/put-json.js';
import {scanSync} from './internals/scan-sync.js';
import {scan} from './internals/scan.js';

// TODO: RE-CHECK EVERYTHING. RETURNED VALUES, ERRORS, ETC.
// TODO: IT IS NOT RECOMMENDED TO TEST ACCESSIBILITY BEFORE DOING OTHER OPERATIONS (READ/WRITE). RECOMMENDED WAY IS TO HANDLE ERRORS CASE-BASE-CASE. CREATE UTILITY?
// TODO: CREATE INSTANCE UTILITY (SINGLETON, LIKE log), FOR ERRORS HANDLING! ADD CONFIGURABLE OPTION TO AUTOMATICALLY SEND LOGS TO SERVER (WITH ENVIRONMENT INFORMATION)

export {
    clearDir,
    clearDirSync,
    exists,
    existsSync,
    getAbsolutePath,
    getJSON,
    getJSONSync,
    getPathsTree,
    putJSON,
    putJSONSync,
    scan,
    scanSync
};
