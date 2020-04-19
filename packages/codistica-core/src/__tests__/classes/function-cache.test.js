import {assert} from 'chai';
import {FunctionCache} from '../../classes/function-cache.js';

/**@see module:core/classes/function-cache */
function classFunctionCacheTest() {
    // TODO: TRIGGER CONDITION "if(!args.hasOwnProperty(i))" FOR REACHING FULL COVERAGE.
    describe('FunctionCache', () => {
        const nonModifiedArg = 'nonModifiedArg';
        const nonModifiedValue = 'nonModifiedValue';
        const modifiableArg = 'modifiableArg';
        const preModifiedValue = 'startingValue';
        const modifiedValue = 'modifiedValue';

        /**
         * @description Sets a new function cache to be tested.
         * @returns {FunctionCache} - Function cache under test.
         */
        const getTestFunctionCache = () => {
            const outputFunctionCache = new FunctionCache();
            outputFunctionCache.set(nonModifiedArg, nonModifiedValue);
            outputFunctionCache.set(modifiableArg, preModifiedValue);
            outputFunctionCache.set(modifiableArg, modifiedValue);
            outputFunctionCache.set(1, 2, 3, 'value');
            return outputFunctionCache;
        };
        describe('set()', () => {
            it('Should set a new cache entry', () => {
                const functionCache = new FunctionCache();
                assert.doesNotThrow(() => functionCache.set('arg1', 'arg2'));
                assert.doesNotThrow(() => functionCache.set(1, 2, 3, 'value'));
            });
            it('Should set an existing cache entry', () => {
                const functionCache = new FunctionCache();
                functionCache.set(modifiableArg, 'arg2');
                assert.doesNotThrow(() =>
                    functionCache.set(modifiableArg, 'modifiedArg2')
                );
            });
        });
        describe('has()', () => {
            const functionCache = getTestFunctionCache();
            it('Should state that a new entry exists', () => {
                assert.isTrue(
                    functionCache.has(nonModifiedArg, nonModifiedValue)
                );
                assert.isTrue(functionCache.has(1, 2, 3, 'value'));
            });
            it('Should state that a modified entry exists', () => {
                assert.isFalse(
                    functionCache.has(modifiedValue, preModifiedValue)
                );
                assert.isTrue(functionCache.has(modifiableArg, modifiedValue));
            });
            it('Should state that unset entry does not exist', () => {
                assert.isFalse(functionCache.has('unset entry'));
            });
        });
        describe('get()', () => {
            const functionCache = getTestFunctionCache();
            it('Should return the value of a new entry', () => {
                assert.strictEqual(
                    functionCache.get(nonModifiedArg),
                    nonModifiedValue
                );
                assert.strictEqual(functionCache.get(1, 2, 3), 'value');
            });
            it('Should return the value of a modified entry', () => {
                assert.strictEqual(
                    functionCache.get(modifiableArg),
                    modifiedValue
                );
            });
            it('Should return undefined', () => {
                assert.isUndefined(functionCache.get('unset entry'));
            });
        });
        describe('delete()', () => {
            const functionCache = getTestFunctionCache();
            it('Should only delete the value of a new entry', () => {
                functionCache.delete(nonModifiedArg);
                assert.isFalse(
                    functionCache.has(nonModifiedArg, nonModifiedValue)
                );
                assert.isUndefined(functionCache.get(nonModifiedArg));
                assert.isTrue(functionCache.has(modifiableArg, modifiedValue));
                assert.strictEqual(
                    functionCache.get(modifiableArg),
                    modifiedValue
                );
                assert.isTrue(functionCache.has(1, 2, 3, 'value'));
                assert.strictEqual(functionCache.get(1, 2, 3), 'value');
            });
            it('Should delete only the value of a modified entry', () => {
                functionCache.delete(modifiableArg);
                assert.isFalse(functionCache.has(modifiableArg, modifiedValue));
                assert.isUndefined(functionCache.get(modifiableArg));
                assert.isTrue(functionCache.has(1, 2, 3, 'value'));
            });
            it('Should return undefined', () => {
                assert.isUndefined(functionCache.get('unset entry'));
                assert.strictEqual(functionCache.get(1, 2, 3), 'value');
            });
        });
        describe('clear()', () => {
            const functionCache = getTestFunctionCache();
            it('Should clear the function cache', () => {
                functionCache.clear();
                assert.isUndefined(functionCache.get(nonModifiedArg));
                assert.isFalse(
                    functionCache.has(nonModifiedArg, nonModifiedValue)
                );
                assert.isUndefined(functionCache.get(modifiableArg));
                assert.isFalse(functionCache.has(modifiableArg, modifiedValue));
                assert.isUndefined(functionCache.get(1, 2, 3));
                assert.isFalse(functionCache.has(1, 2, 3, 'value'));
            });
        });
    });
}

export {classFunctionCacheTest};
