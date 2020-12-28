import {assert} from 'chai';
import {getShortestPath} from '../../../../modules/array-utils/internals/get-shortest-path.js';

/** @see module:core/modules/array-utils/get-shortest-path */
function getShortestPathTest() {
    describe('getShortestPath()', () => {
        it('Should return the shortest path between specified indexes', () => {
            const evenArray = ['a', 'b', 'c', 'd', 'e', 'f'];
            const oddArray = ['a', 'b', 'c', 'd', 'e'];

            assert.strictEqual(getShortestPath(evenArray, 0, 0), 0);
            assert.strictEqual(getShortestPath(evenArray, 0, 1), 1);
            assert.strictEqual(getShortestPath(evenArray, 0, 2), 2);
            assert.strictEqual(getShortestPath(evenArray, 0, 3), 3);
            assert.strictEqual(getShortestPath(evenArray, 0, 4), -2);
            assert.strictEqual(getShortestPath(evenArray, 0, 5), -1);
            assert.strictEqual(getShortestPath(evenArray, 0, 10), -2);

            assert.strictEqual(getShortestPath(oddArray, 0, 0), 0);
            assert.strictEqual(getShortestPath(oddArray, 0, 1), 1);
            assert.strictEqual(getShortestPath(oddArray, 0, 2), 2);
            assert.strictEqual(getShortestPath(oddArray, 0, 3), -2);
            assert.strictEqual(getShortestPath(oddArray, 0, 4), -1);

            assert.strictEqual(getShortestPath([], 0, 1), 0);
            assert.strictEqual(getShortestPath(['a'], 0, 1), 0);
        });
    });
}

export {getShortestPathTest};
