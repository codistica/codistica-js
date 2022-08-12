import {assert} from 'chai';
import {exists} from './exists.js';
import {remove} from './remove.js';

// TODO: ADD RACE TEST CASE PARENT/CHILDREN RACE.
// TODO: ADD ENOENT TEST CASE.
// TODO: TEST MULTIPLE INPUTS (NESTED BETWEEN THEM).

/** @see module:node/modules/file-utils/remove */

function run() {
    describe('remove()', () => {
        it('Should correctly remove specified directory asynchronously.', async () => {
            assert.isNotEmpty(await remove('./mock-root'));
            assert.isFalse(await exists('./mock-root'));
        });
    });
}

export {run};
