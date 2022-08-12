import {assert} from 'chai';
import {capitalizeFirst} from './capitalize-first.js';

/** @see module:core/modules/string-utils/capitalize-first */

describe('capitalizeFirst()', () => {
    it('Should correctly capitalize the first letter of passed string.', () => {
        assert.strictEqual(capitalizeFirst('test'), 'Test');
        assert.strictEqual(capitalizeFirst('     test'), '     Test');
        assert.strictEqual(capitalizeFirst('    test    '), '    Test    ');
        assert.strictEqual(capitalizeFirst(' t e s t '), ' T e s t ');
        assert.strictEqual(capitalizeFirst(' !t e s t '), ' !T e s t ');
        assert.strictEqual(capitalizeFirst('t'), 'T');
        assert.strictEqual(capitalizeFirst('T'), 'T');
    });
});
