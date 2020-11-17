import {assert} from 'chai';
import {existsSync} from '../../../../modules/file-utils/internals/exists-sync.js';
import {removeSync} from '../../../../modules/file-utils/internals/remove-sync.js';

/** @see module:node/modules/file-utils/remove-sync */
function removeSyncTest() {
    describe('removeSync()', () => {
        it('Should correctly remove specified directory.', () => {
            assert.isNotEmpty(removeSync('./mock-root/txt'));
            assert.isFalse(existsSync('./mock-root/txt'));
        });
    });
}

export {removeSyncTest};
