import {mock} from '../../../modules/mock.js';
import {getMockFileSystem} from '../../__utils__/get-mock-file-system/index.js';

const tests = {
    clearDirSyncTest: './internals/clear-dir-sync.test.js',
    containsPathTest: './internals/contains-path.test.js',
    copySyncTest: './internals/copy-sync.test.js',
    existsTest: './internals/exists.test.js',
    getJsonSyncTest: './internals/get-json-sync.test.js',
    moveSyncTest: './internals/move-sync.test.js',
    removeTest: './internals/remove.test.js',
    removeSyncTest: './internals/remove-sync.test.js'
};

function fileUtilsTest() {
    describe('fileUtils', () => {
        mock.config({
            cacheAutoClear: true,
            cacheWhitelist: [
                /\/get-mock-file-system\/index\.js$/,
                /\/modules\/log\.js$/
            ]
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
                        exports: getMockFileSystem(true),
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
