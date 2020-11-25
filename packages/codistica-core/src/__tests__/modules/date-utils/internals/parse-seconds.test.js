import {assert} from 'chai';
import {parseSeconds} from '../../../../modules/date-utils/internals/parse-seconds.js';

/** @see module:core/modules/date-utils/parse-seconds */
function parseSecondsTest() {
    describe('parseSeconds()', () => {
        it('Should return a parsed array of hours.', () => {
            const parsedSeconds = parseSeconds(8140);
            assert.strictEqual(parsedSeconds.hours, 2);
            assert.strictEqual(parsedSeconds.minutes, 15);
            assert.strictEqual(parsedSeconds.seconds, 40);
        });
    });
}

export {parseSecondsTest};
