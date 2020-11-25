import {assert} from 'chai';
import {getCharType} from '../../../../modules/string-utils/internals/get-char-type.js';

/** @see module:core/modules/string-utils/get-char-type */
function getCharTypeTest() {
    describe('getCharType()', () => {
        it('Should correctly return passed character type.', () => {
            assert.strictEqual(getCharType('a'), 'LOW_LETTER');
            assert.strictEqual(getCharType('A'), 'UP_LETTER');
            assert.strictEqual(getCharType('1'), 'NUMBER');
            assert.strictEqual(getCharType(' '), 'SPACING');
            assert.strictEqual(getCharType('\n'), 'SPACING');
            assert.strictEqual(getCharType('\t'), 'SPACING');
            assert.strictEqual(getCharType('@'), 'SPECIAL');
            assert.strictEqual(getCharType(''), 'EMPTY');
            assert.strictEqual(getCharType(undefined), 'NO_STRING');
        });
    });
}

export {getCharTypeTest};
