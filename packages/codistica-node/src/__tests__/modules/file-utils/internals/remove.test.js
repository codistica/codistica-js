import {assert} from 'chai';
import {exists} from '../../../../modules/file-utils/internals/exists.js';
import {remove} from '../../../../modules/file-utils/internals/remove.js';

// TODO: ADD RACE TEST CASE PARENT/CHILDREN RACE.
// TODO: ADD ENOENT TEST CASE.
// TODO: TEST MULTIPLE INPUTS (NESTED BETWEEN THEM).

/** @see module:node/modules/file-utils/remove */
function removeTest() {
    describe('remove()', () => {
        it('Should correctly remove specified directory asynchronously.', async () => {
            assert.isNotEmpty(await remove('./mock-root'));
            assert.isFalse(await exists('./mock-root'));
        });
    });
}

export {removeTest};
