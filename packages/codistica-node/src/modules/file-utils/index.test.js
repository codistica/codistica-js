import {readdirSync} from 'fs';
import {resolve} from 'path';
import {getMockFileSystem} from '../../test-utils/get-mock-file-system/index.js';
import {mock} from '../mock-utils/index.js';

mock.setConfig({
    cacheSafeList: [/\/get-mock-file-system\/index\.js$/, /\/modules\/log\.js$/] // TODO: ? REMOVE? HOIST TO setup-tests?
});

const tests = readdirSync(resolve(__dirname, './internals'))
    .filter((p) => p.endsWith('.test.js'))
    .map((p) => './internals/' + p);

/**
 * @description Run tests.
 * @param {boolean} addRandomDelay - Add random delay to FS in tests.
 * @returns {void} Void.
 */
const runTests = function runTests(addRandomDelay) {
    for (const test of tests) {
        mock.clearCache(); // TODO: TEMP
        mock.require(
            test,
            [
                {
                    request: 'fs',
                    exports: getMockFileSystem(addRandomDelay),
                    target: '*',
                    ignore: /node_modules/,
                    requester: __filename
                }
            ],
            module
        ).run();
    }
};

describe('fileUtils', () => {
    runTests(false);
});

describe('fileUtils (with random delay)', () => {
    runTests(true);
});
