import {assert} from 'chai';
import {existsSync} from './exists-sync.js';
import {removeSync} from './remove-sync.js';

/** @see module:node/modules/file-utils/remove-sync */

function run() {
    describe('removeSync()', () => {
        it('Should correctly remove specified directory.', () => {
            assert.isNotEmpty(removeSync('./mock-root'));
            assert.isFalse(existsSync('./mock-root'));
        });
    });
}

export {run};
