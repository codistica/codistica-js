import {resolve} from 'path';
import {assert} from 'chai';
import {getMockFileSystem} from '../test-utils/get-mock-file-system/index.js';
import {mock} from './mock.js';

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
                target: /./,
                requester: resolve(
                    __dirname,
                    '../test-utils/mock-test-utils/use-mock-fs.js'
                )
            })
        );
    });

    it('Should mock non existent module.', async () => {
        const module = 'nonexistent-module';
        const {content} = await import(module);
        assert.strictEqual(content, 'MOCKED!');
    });

    it('Should get import content in the right order.', async () => {
        const {content} = await import(
            '../test-utils/mock-test-utils/module-a.js'
        );
        assert.strictEqual(content, 'A B C D');
    });

    it('Should get data from mock file system.', async () => {
        const {content} = await import(
            '../test-utils/mock-test-utils/use-mock-fs.js'
        );
        assert.strictEqual(content, 'MOCK DATA');
    });

    it('Should get data from mock file system (using mock.require() method).', async () => {
        const {content} = await import(
            '../test-utils/mock-test-utils/use-mock-fs-require.js'
        );
        assert.strictEqual(content, 'MOCK DATA');
    });

    it('Should get data from real file system.', async () => {
        const {content} = await import(
            '../test-utils/mock-test-utils/use-real-fs.js'
        );
        assert.strictEqual(content, 'REAL DATA');
    });

    after(() => {
        toUnregister.forEach((mockUtils) => mockUtils.unregister());
    });
});
