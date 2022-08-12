import {assert} from 'chai';
import {containsPath} from './contains-path.js';

/** @see module:node/modules/file-utils/contains-path */

function run() {
    describe('containsPath()', () => {
        it('Should correctly detect contained paths.', () => {
            assert.isTrue(containsPath('./', './dir'));
            assert.isTrue(containsPath('/', '/dir/file.txt'));
            assert.isTrue(containsPath('some-dir', 'some-dir/file.txt'));
            assert.isTrue(containsPath('./', './dir', './dir/sub-dir'));
            assert.isTrue(containsPath('C:', 'C:\\dir', 'C:\\dir/sub_dir'));
        });
        it('Should correctly detect non contained paths.', () => {
            assert.isFalse(containsPath('./dir', './'));
            assert.isFalse(containsPath('./', './'));
            assert.isFalse(containsPath('/', '/'));
            assert.isFalse(containsPath('./', ''));
            assert.isFalse(containsPath('/', ''));
            assert.isFalse(containsPath('/', './'));
            assert.isFalse(containsPath('C:\\users', 'C:'));
        });
    });
}

export {run};
