// import {resolve} from 'path';
import {assert} from 'chai';
import {mock} from '../../../modules/mock.js';
// import {getMockFileSystem} from '../../__utils__/get-mock-file-system/index.js';

const toUnregister = [];

/** @see module:node/classes/mock */
function mockTest() {
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

            // toUnregister.push(
            //     mock.registerMock('fs', getMockFileSystem(), {
            //         target: resolve(
            //             __dirname,
            //             '../../../modules/file-utils/internals/get-json-sync.js'
            //         ),
            //         caller: resolve(__dirname, './internals/use-mock-fs.js')
            //     })
            // );
        });

        it('Should mock non existent module.', async () => {
            const module = 'nonexistent-module';
            const {content} = await import(module);
            assert.strictEqual(content, 'MOCKED!');
        });

        // it('Should get import content in the right order.', async () => {
        //     const {content} = await import('./internals/module-a.js');
        //     assert.strictEqual(content, 'A B C D');
        // });

        // it('Should get data from mock file system.', async () => {
        //     const {content} = await import('./internals/use-mock-fs.js');
        //     assert.strictEqual(content, 'MOCK DATA');
        // });

        it('Should get data from mock file system (using mock.require() method).', async () => {
            const {content} = await import(
                './internals/use-mock-fs-require.js'
            );
            assert.strictEqual(content, 'MOCK DATA');
        });

        it('Should get data from real file system.', async () => {
            const {content} = await import('./internals/use-real-fs.js');
            assert.strictEqual(content, 'REAL DATA');
        });

        after(() => {
            toUnregister.forEach((unregisterMock) => unregisterMock());
        });
    });
}

export {mockTest};
