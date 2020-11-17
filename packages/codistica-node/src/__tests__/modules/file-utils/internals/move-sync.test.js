import {basename} from 'path';
import {assert} from 'chai';
import {containsPath} from '../../../../modules/file-utils/internals/contains-path.js';
import {existsSync} from '../../../../modules/file-utils/internals/exists-sync.js';
import {moveSync} from '../../../../modules/file-utils/internals/move-sync.js';
import {scanSync} from '../../../../modules/file-utils/internals/scan-sync.js';

/** @see module:node/modules/file-utils/move-sync */
function moveSyncTest() {
    describe('moveSync()', () => {
        it('Should correctly move specified directory.', () => {
            const originalDirPaths = scanSync('./mock-root/txt')
                .filter((path) => containsPath('./mock-root/txt', path))
                .map((path) => basename(path));

            assert.isNotEmpty(
                moveSync('./mock-root/txt', './mock-root/copy/destination')
            );

            assert.isFalse(existsSync('./mock-root/txt'));

            const movedDirPaths = scanSync('./mock-root/copy/destination/txt')
                .filter((path) =>
                    containsPath('./mock-root/copy/destination/txt', path)
                )
                .map((path) => basename(path));

            assert.deepEqual(originalDirPaths, movedDirPaths);
        });
    });
}

export {moveSyncTest};
