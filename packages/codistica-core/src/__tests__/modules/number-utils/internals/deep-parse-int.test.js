import {assert} from 'chai';
import {deepParseInt} from '../../../../modules/number-utils/internals/deep-parse-int.js';

/** @see module:codistica-core/modules/number-utils/deep-parse-int */
function deepParseIntTest() {
    describe('deepParseInt()', () => {
        it('Should return a concatenated integer with all integers from a string.', () => {
            assert.strictEqual(
                deepParseInt('ThisIs,a34Test55,,##;;dd55'),
                345555
            );
        });
    });
}

export {deepParseIntTest};
