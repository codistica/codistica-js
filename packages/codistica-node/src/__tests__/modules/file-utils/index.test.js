import {mock} from '../../../modules/mock.js';
import {getMockFileSystem} from '../../__utils__/get-mock-file-system/index.js';

const tests = {
    clearDirSyncTest: './internals/clear-dir-sync.test.js',
    containsPathTest: './internals/contains-path.test.js',
    copySyncTest: './internals/copy-sync.test.js',
    getJsonSyncTest: './internals/get-json-sync.test.js',
    moveSyncTest: './internals/move-sync.test.js',
    removeSyncTest: './internals/remove-sync.test.js'
};

function fileUtilsTest() {
    describe('fileUtils', () => {
        mock.config({
            startFresh: true
        });

        for (const key in tests) {
            if (!Object.hasOwnProperty.call(tests, key)) {
                continue;
            }
            mock.require(
                tests[key],
                [
                    {
                        request: 'fs',
                        exports: getMockFileSystem(),
                        ignore: /node_modules/,
                        requester: __filename
                    }
                ],
                module
            )[key]();
        }
    });
}

export {fileUtilsTest};
