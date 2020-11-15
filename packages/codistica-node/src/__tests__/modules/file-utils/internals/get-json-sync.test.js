import {assert} from 'chai';
import {mock} from '../../../../modules/mock.js';
import {getMockFileSystem} from '../../../__utils__/get-mock-file-system/index.js';

const {getJSONSync} = mock.require(
    '../../../../modules/file-utils/internals/get-json-sync.js',
    {
        fs: getMockFileSystem()
    },
    module
);

/** @see module:node/modules/file-utils/get-json-sync */
function getJsonSyncTest() {
    describe('getJsonSync()', () => {
        it('Should correctly read and parse JSON file.', async () => {
            assert.deepEqual(getJSONSync('./mock-root/data.json'), {
                content: 'MOCK DATA'
            });
        });
    });
}

export {getJsonSyncTest};
