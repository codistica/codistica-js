import {assert} from 'chai';
import {parse} from './parse.js';

/** @see module:core/modules/string-utils/parse */

describe('parse()', () => {
    it('Should correctly parse passed string.', () => {
        const parsed = parse('thisIsATest');

        const expected = [
            {
                content: 'this',
                index: 0,
                type: 'LETTERS',
                remove: parsed[0].remove
            },
            {
                content: 'Is',
                index: 4,
                type: 'LETTERS',
                remove: parsed[1].remove
            },
            {
                content: 'A',
                index: 6,
                type: 'LETTERS',
                remove: parsed[2].remove
            },
            {
                content: 'Test',
                index: 7,
                type: 'LETTERS',
                remove: parsed[3].remove
            }
        ];

        expected[0].previous = null;
        expected[0].next = expected[1];
        expected[1].previous = expected[0];
        expected[1].next = expected[2];
        expected[2].previous = expected[1];
        expected[2].next = expected[3];
        expected[3].previous = expected[2];
        expected[3].next = null;

        assert.deepEqual(parsed, expected);

        parsed[2].remove();

        expected.splice(2, 1);

        expected[1].next = expected[2];
        expected[2].previous = expected[1];
        expected[2].next = null;

        assert.deepEqual(parsed, expected);
    });
});
