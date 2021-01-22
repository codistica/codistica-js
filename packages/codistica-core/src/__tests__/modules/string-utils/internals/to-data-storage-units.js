import {assert} from 'chai';
import {toDataStorageUnits} from '../../../../modules/string-utils/internals/to-data-storage-units.js';

/** @see module:core/modules/string-utils/to-data-storage-units */
function toDataStorageUnitsTest() {
    describe('toDataStorageUnits()', () => {
        it('Should return a string with the correct data storage units.', () => {
            assert.strictEqual(toDataStorageUnits('Test'), '');
            assert.strictEqual(toDataStorageUnits('1'), '1B');
            assert.strictEqual(toDataStorageUnits(1), '1B');
            assert.strictEqual(toDataStorageUnits(10), '10B');
            assert.strictEqual(toDataStorageUnits(100), '100B');
            assert.strictEqual(toDataStorageUnits(1000), '1KB');
            assert.strictEqual(toDataStorageUnits(1234567), '1.235MB');
            assert.strictEqual(toDataStorageUnits(1234567, 3, 2), '1.23MB');
            assert.strictEqual(toDataStorageUnits(1234567, 0, 2), '0GB');
            assert.strictEqual(toDataStorageUnits(1234567, 0, 4), '0.0012GB');
        });
    });
}

export {toDataStorageUnitsTest};
