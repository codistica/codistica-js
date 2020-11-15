import {getJsonSyncTest} from './internals/get-json-sync.test.js';

function fileUtilsTest() {
    describe('fileUtils', () => {
        getJsonSyncTest();
    });
}

export {fileUtilsTest};
