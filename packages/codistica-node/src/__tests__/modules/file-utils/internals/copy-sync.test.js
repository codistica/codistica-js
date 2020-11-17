import {basename} from 'path';
import {assert} from 'chai';
import {containsPath} from '../../../../modules/file-utils/internals/contains-path.js';
import {copySync} from '../../../../modules/file-utils/internals/copy-sync.js';
import {scanSync} from '../../../../modules/file-utils/internals/scan-sync.js';

/** @see module:node/modules/file-utils/copy-sync */
function copySyncTest() {
    describe('copySync()', () => {
        it('Should correctly copy specified directory.', () => {
            assert.isNotEmpty(
                copySync('./mock-root/txt', './mock-root/copy/destination')
            );

            const originalDirPaths = scanSync('./mock-root/txt')
                .filter((path) => containsPath('./mock-root/txt', path))
                .map((path) => basename(path));

            const copiedDirPaths = scanSync('./mock-root/copy/destination/txt')
                .filter((path) =>
                    containsPath('./mock-root/copy/destination/txt', path)
                )
                .map((path) => basename(path));

            assert.deepEqual(originalDirPaths, copiedDirPaths);
        });
    });
}

export {copySyncTest};
