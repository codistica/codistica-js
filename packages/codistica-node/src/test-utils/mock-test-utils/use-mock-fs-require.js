import {mock} from '../../modules/mock.js';
import {getMockFileSystem} from '../get-mock-file-system/index.js';

const {getJSONSync} = mock.require(
    '../../modules/file-utils/internals/get-json-sync.js',
    {
        fs: getMockFileSystem()
    },
    module
);

const {content} = getJSONSync('./mock-root/data.json');

export {content};
