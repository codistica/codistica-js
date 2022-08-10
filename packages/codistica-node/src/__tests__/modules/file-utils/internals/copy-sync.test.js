import {basename, join, resolve} from 'path';
import {assert} from 'chai';
import {copySync} from '../../../../modules/file-utils/internals/copy-sync.js';
import {scanSync} from '../../../../modules/file-utils/internals/scan-sync.js';

/** @see module:node/modules/file-utils/copy-sync */
function copySyncTest() {
    describe('copySync()', () => {
        it('Should correctly copy specified directory.', () => {
            const input = './mock-root/dir-b';
            const destination = './mock-root/copy/destination';

            const copiedPaths = copySync(input, destination);

            assert.isNotEmpty(copiedPaths);

            const originalPaths = scanSync(input).map((path) =>
                path.replace(resolve(input), '')
            );

            const copiedDirPath = join(destination, basename(input));

            const newPaths = scanSync(copiedDirPath).map((path) =>
                path.replace(resolve(copiedDirPath), '')
            );

            assert.deepEqual(originalPaths, newPaths);
        });
    });
}

export {copySyncTest};
