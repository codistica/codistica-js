import {assert} from 'chai';
import {exists} from '../../../../modules/file-utils/internals/exists.js';

/** @see module:node/modules/file-utils/exists */
function existsTest() {
    describe('exists()', () => {
        it('Should determine if a file or directory exists at the specified path asynchronously.', async () => {
            assert.isTrue(await exists('./mock-root/dir-b'));
            assert.isTrue(await exists('./mock-root/dir-b/text-file-a.txt'));
            assert.isTrue(await exists('./mock-root/.hidden-file'));
            assert.isTrue(await exists('./mock-root/dir-a/file-a alias'));
            assert.isTrue(await exists('./'));

            assert.isFalse(await exists('./random'));
            assert.isFalse(await exists('./mock-root/text-file-a.txt'));
            assert.isFalse(await exists('./mock-root/dir-b/text-file-e.txt'));
        });
    });
}

export {existsTest};
