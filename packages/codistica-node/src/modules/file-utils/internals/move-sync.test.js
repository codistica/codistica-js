import {basename} from 'path';
import {assert} from 'chai';
import {containsPath} from './contains-path.js';
import {existsSync} from './exists-sync.js';
import {moveSync} from './move-sync.js';
import {scanSync} from './scan-sync.js';

/** @see module:node/modules/file-utils/move-sync */

function run() {
    describe('moveSync()', () => {
        it('Should correctly move specified directory.', () => {
            const originalDirPaths = scanSync('./mock-root/dir-b')
                .filter((path) => containsPath('./mock-root/dir-b', path))
                .map((path) => basename(path));

            assert.isNotEmpty(
                moveSync('./mock-root/dir-b', './mock-root/copy/destination')
            );

            assert.isFalse(existsSync('./mock-root/dir-b'));

            const movedDirPaths = scanSync('./mock-root/copy/destination/dir-b')
                .filter((path) =>
                    containsPath('./mock-root/copy/destination/dir-b', path)
                )
                .map((path) => basename(path));

            assert.deepEqual(originalDirPaths, movedDirPaths);
        });
    });
}

export {run};
