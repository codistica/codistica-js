import {assert} from 'chai';
import {isPureObject} from './is-pure-object.js';

/** @see module:core/modules/object-utils/is-pure-object */

describe('isPureObject()', () => {
    it('Should return true if input is an object ({}) and false otherwise.', () => {
        assert.isTrue(isPureObject({}));
        assert.isFalse(isPureObject([]));
        assert.isFalse(isPureObject(''));
        assert.isFalse(isPureObject(null));
        assert.isFalse(isPureObject(undefined));
        assert.isFalse(isPureObject(true));
        assert.isFalse(isPureObject(() => {}));
    });
});
