import {assert} from 'chai';
import {getCharType} from '../../../../modules/string-utils/internals/get-char-type.js';

/** @see module:core/modules/string-utils/get-char-type */
function getCharTypeTest() {
    describe('getCharType()', () => {
        it('Should correctly return passed character type.', () => {
            assert.strictEqual(getCharType('a'), 'LOWER');
            assert.strictEqual(getCharType('A'), 'UPPER');
            assert.strictEqual(getCharType('1'), 'DIGIT');
            assert.strictEqual(getCharType(' '), 'SPACE');
            assert.strictEqual(getCharType('\n'), 'SPACE');
            assert.strictEqual(getCharType('\t'), 'SPACE');
            assert.strictEqual(getCharType('@'), 'SPECIAL');
            assert.strictEqual(getCharType(''), 'EMPTY');
        });
    });
}

export {getCharTypeTest};
