import {assert} from 'chai';
import {forEach} from '../../../../modules/async-utils/internals/for-each.js';

/** @see module:core/modules/async-utils/for-each */
function forEachTest() {
    describe('forEach()', () => {
        it('Should asynchronously loop through passed array ensuring specified concurrency limit.', async () => {
            const array = [1, 2, 3, 4, 5, 6];

            const results = [];

            let called = 0;

            /**
             * @async
             * @description Sum async mock.
             * @param {number} a - A.
             * @param {number} b - B.
             * @returns {Promise<number>} Promise. Result.
             */
            const sum = async (a, b) => {
                return await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(a + b);
                    }, 100);
                });
            };

            /**
             * @async
             * @description Callback.
             * @param {number} elem - Element.
             * @returns {Promise<void>} Promise. Void.
             */
            const callback = async (elem) => {
                called++;
                results.push(await sum(elem, 1));
            };

            const limit = 2;

            const promise = forEach(array, callback, limit);

            assert.strictEqual(called, limit);

            await promise;

            assert.sameOrderedMembers(results, [2, 3, 4, 5, 6, 7]);
        });
    });
}

export {forEachTest};
