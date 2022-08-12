import {assert} from 'chai';
import {controlledTimeout} from './controlled-timeout.js';

/** @see module:core/modules/controlled-timeout*/

describe('controlledTimeout()', () => {
    it('Should not trigger the timeout.', async () => {
        const delay = 20;
        let timeoutWasTriggered = false;
        controlledTimeout(() => {
            timeoutWasTriggered = true;
        }, delay).clear();
        await new Promise((resolve) => setTimeout(resolve, delay + 5));
        assert.isFalse(timeoutWasTriggered);
    });
    it('Should force trigger the timeout.', () => {
        let timeoutWasTriggered = false;
        controlledTimeout(() => (timeoutWasTriggered = true), 10000).trigger();
        assert.isTrue(timeoutWasTriggered);
    });
    it('Should trigger the timeout.', async () => {
        const delay = 20;
        let timeoutWasTriggered = false;
        controlledTimeout(() => {
            timeoutWasTriggered = true;
        }, delay);
        await new Promise((resolve) => setTimeout(resolve, delay + 5));
        assert.isTrue(timeoutWasTriggered);
    });
    it('Should return null.', () => {
        assert.isNull(controlledTimeout(undefined, 5));
    });
});
