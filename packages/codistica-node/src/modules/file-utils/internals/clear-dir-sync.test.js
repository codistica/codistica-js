import {assert} from 'chai';
import {clearDirSync} from './clear-dir-sync.js';
import {scanSync} from './scan-sync.js';

/** @see module:node/modules/file-utils/clear-dir-sync */

function run() {
    describe('clearDirSync()', () => {
        it('Should correctly clear specified directory.', () => {
            assert.isNotEmpty(clearDirSync('./mock-root/dir-b'));
            assert.deepEqual(scanSync('./mock-root/dir-b'), []);
        });
    });
}

export {run};
