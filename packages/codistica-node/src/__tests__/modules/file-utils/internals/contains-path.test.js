import {assert} from 'chai';
import {containsPath} from '../../../../modules/file-utils/internals/contains-path.js';

/** @see module:node/modules/file-utils/contains-path */
function containsPathTest() {
    describe('containsPath()', () => {
        it('Should correctly detect contained paths.', () => {
            assert.isTrue(containsPath('./', './dir'));
            assert.isTrue(containsPath('/', '/dir/file.txt'));
            assert.isTrue(containsPath('some-dir', 'some-dir/file.txt'));
            assert.isTrue(containsPath('./', './dir', './dir/sub-dir'));
        });
        it('Should correctly detect non contained paths.', () => {
            assert.isFalse(containsPath('./dir', './'));
            assert.isFalse(containsPath('./', './'));
            assert.isFalse(containsPath('/', '/'));
            assert.isFalse(containsPath('./', ''));
            assert.isFalse(containsPath('/', ''));
            assert.isFalse(containsPath('/', './'));
        });
    });
}

export {containsPathTest};
