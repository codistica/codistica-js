import {resolve} from 'path';
import {assert} from 'chai';
import {getMockFileSystem} from '../../test-utils/get-mock-file-system/index.js';
import {mock} from './index.js';

// TODO: ADD TEST FOR NON OBJECT exports
// TODO: CHECK __esModule PROPERTY FOR ESM, CJS AND NON-EXISTENT MODULES. ALSO FOR default ESM EXPORTS.

const toUnregister = [];

/** @see module:node/modules/mock */

describe('Mock', () => {
    before(() => {
        toUnregister.push(
            mock.registerMock(
                'nonexistent-module',
                {
                    content: 'MOCKED!'
                },
                {
                    target: __filename
                }
            )
        );

        toUnregister.push(
            mock.registerMock('fs', getMockFileSystem(), {
                target: '*',
                ignore: /node_modules/,
                requester: resolve(__dirname, './test-utils/targets/mock-fs.js')
            })
        );
    });

    it('Should mock non existent module.', async () => {
        const module = 'nonexistent-module';
        const {content} = await import(module);
        assert.strictEqual(content, 'MOCKED!');
    });

    it('Should get import content in the right order.', async () => {
        const {content} = await import('./test-utils/modules/module-a.js');
        assert.strictEqual(content, 'A B C D');
    });

    it('Should get data from mock file system.', async () => {
        const {content} = await import('./test-utils/targets/mock-fs.js');
        assert.strictEqual(content, 'MOCK DATA');
    });

    it('Should get data from mock file system (using mock.require method).', async () => {
        const {content} = await import(
            './test-utils/targets/mock-require-fs.js'
        );
        assert.strictEqual(content, 'MOCK DATA');
    });

    it('Should get data from real file system.', async () => {
        // THIS SHOULD BE LAST TO TEST THAT MOCK SYSTEM CORRECTLY AVOIDS MODULE TREE POISONING
        const {content} = await import(
            './test-utils/targets/do-not-mock-fs.js'
        );
        assert.strictEqual(content, 'REAL DATA');
    });

    after(() => {
        toUnregister.forEach(
            (mockUtils) => mockUtils && mockUtils.unregister()
        );
    });
});
