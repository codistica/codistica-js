import {assert} from 'chai';
import {clearDirSync} from '../../../../modules/file-utils/internals/clear-dir-sync.js';
import {scanSync} from '../../../../modules/file-utils/internals/scan-sync.js';

/** @see module:node/modules/file-utils/clear-dir-sync */
function clearDirSyncTest() {
    describe('clearDirSync()', () => {
        it('Should correctly clear specified directory.', () => {
            assert.isNotEmpty(clearDirSync('./mock-root/dir-b'));
            assert.deepEqual(scanSync('./mock-root/dir-b'), []);
        });
    });
}

export {clearDirSyncTest};
