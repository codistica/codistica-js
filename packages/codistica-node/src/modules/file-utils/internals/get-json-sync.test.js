import {assert} from 'chai';
import {getJSONSync} from './get-json-sync.js';

/** @see module:node/modules/file-utils/get-json-sync */

function run() {
    describe('getJsonSync()', () => {
        it('Should correctly read and parse JSON file.', () => {
            assert.deepEqual(getJSONSync('./mock-root/data.json'), {
                content: 'MOCK DATA'
            });
        });
    });
}

export {run};
