import {getMockFileSystem} from '../../../../test-utils/get-mock-file-system/index.js';
import {mock} from '../../index.js';

const {getJSONSync} = mock.require(
    '../../../file-utils/internals/get-json-sync.js',
    {
        fs: getMockFileSystem()
    },
    module
);

const {content} = getJSONSync('./mock-root/data.json');

export {content};
