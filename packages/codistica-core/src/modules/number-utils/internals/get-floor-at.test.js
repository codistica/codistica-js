import {assert} from 'chai';
import {getFloorAt} from './get-floor-at.js';

/** @see module:core/modules/number-utils/get-floor-at */

describe('getFloorAt()', () => {
    it('Should return the floor of the number at the selected level.', () => {
        assert.strictEqual(getFloorAt(45139, 2), 45100);
        assert.strictEqual(getFloorAt(943992, -3), 943000);
        assert.strictEqual(getFloorAt(1111, 1.0), 1100);
        assert.strictEqual(getFloorAt(3599, 0), 3000);
        assert.isNull(getFloorAt(100, 5));
    });
});
