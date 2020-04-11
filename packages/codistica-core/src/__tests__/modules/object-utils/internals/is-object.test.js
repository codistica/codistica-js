import {assert} from 'chai';
import {isObject} from '../../../../modules/object-utils/internals/is-object.js';

/** @see module:codistica-core/modules/object-utils/is-object */
function isObjectTest() {
    describe('isObject()', () => {
        it('Should return true if input is an object ({}) or an array ([]) and false otherwise.', () => {
            assert.isTrue(isObject({}));
            assert.isTrue(isObject([]));
            assert.isFalse(isObject(''));
            assert.isFalse(isObject(null));
            assert.isFalse(isObject(undefined));
            assert.isFalse(isObject(true));
            assert.isFalse(isObject(() => {}));
        });
    });
}

export {isObjectTest};
