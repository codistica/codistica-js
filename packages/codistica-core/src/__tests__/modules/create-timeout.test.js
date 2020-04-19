import {assert} from 'chai';
import {createTimeout} from '../../modules/create-timeout.js';

/**@see: module:core/modules/create-timeout*/
function createTimeoutTest() {
    describe('createTimeout()', () => {
        it('Should not trigger the timeout', async function () {
            const delay = 20;
            let timeoutWasTriggered = false;
            createTimeout(() => {
                timeoutWasTriggered = true;
            }, delay).clear();
            await new Promise((resolve) => setTimeout(resolve, delay + 5));
            assert.isFalse(timeoutWasTriggered);
        });
        it('Should force trigger the timeout', () => {
            let timeoutWasTriggered = false;
            createTimeout(() => (timeoutWasTriggered = true), 10000).trigger();
            assert.isTrue(timeoutWasTriggered);
        });
        it('Should trigger the timeout', async function () {
            const delay = 20;
            let timeoutWasTriggered = false;
            createTimeout(() => {
                timeoutWasTriggered = true;
            }, delay);
            await new Promise((resolve) => setTimeout(resolve, delay + 5));
            assert.isTrue(timeoutWasTriggered);
        });
        it('Should return null', () => {
            assert.isNull(createTimeout(undefined, 5));
        });
    });
}

export {createTimeoutTest};
