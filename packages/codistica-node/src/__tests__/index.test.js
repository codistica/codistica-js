import {fileUtilsTest} from './modules/file-utils/index.test.js';
import {mockTest} from './modules/mock/index.test.js';

describe('@codistica/node', () => {
    // MODULES
    describe('Modules', () => {
        fileUtilsTest();
        mockTest();
    });
});
