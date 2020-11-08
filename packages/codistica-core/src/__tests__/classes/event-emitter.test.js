import {assert} from 'chai';
import {EventEmitter} from '../../classes/event-emitter.js';

// TODO: ADD TESTS FOR NUMBER OF ADDED/REMOVED LISTENERS. CONSIDER MULTIPLE CASES: BY USER, AUTOMATICALLY WHEN USING once SUBSCRIBERS, ETC.

/**@see module:core/classes/event-emitter */
function eventEmitterTest() {
    describe('EventEmitter', () => {
        const eventEmitter = new EventEmitter();

        const testData = {
            listenerAReceivedParams: [],
            listenerBExecutionCount: 0,
            listenerCExecutionCount: 0
        };

        /**
         * @description Listener A.
         * @param {string} param1 - Param 1.
         * @param {string} param2 - Param 2.
         * @returns {void} Void.
         */
        const listenerA = function listenerA(param1, param2) {
            testData.listenerAReceivedParams = [param1, param2];
        };

        /**
         * @description Listener B.
         * @returns {void} Void.
         */
        const listenerB = function listenerB() {
            testData.listenerBExecutionCount++;
        };

        /**
         * @description Listener C.
         * @returns {void} Void.
         */
        const listenerC = function listenerC() {
            testData.listenerCExecutionCount++;
        };

        eventEmitter.on('eventA', listenerA);
        eventEmitter.once('eventB', listenerB);
        eventEmitter.on('eventB', listenerC);

        describe('emit()', () => {
            it('Should return true when listeners are found for specified event.', () => {
                assert.isTrue(eventEmitter.emit('eventA', 'param1', 'param2'));
            });

            it('Should return false when no listeners are found for specified event.', () => {
                assert.isFalse(
                    eventEmitter.emit(
                        'eventWithNoListeners',
                        'param1',
                        'param2'
                    )
                );
            });
        });

        eventEmitter.off('eventB', listenerC);

        let eventBCallCount = 0;
        while (eventBCallCount < 5) {
            eventEmitter.emit('eventB');
            eventBCallCount++;
        }

        describe('once()', () => {
            it('Should have executed only once.', () => {
                assert.strictEqual(testData.listenerBExecutionCount, 1);
            });
        });

        describe('on()', () => {
            it('Should have received correct arguments.', () => {
                assert.strictEqual(
                    testData.listenerAReceivedParams[0],
                    'param1'
                );
                assert.strictEqual(
                    testData.listenerAReceivedParams[1],
                    'param2'
                );
            });
        });

        describe('off()', () => {
            it('Should have not executed.', () => {
                assert.strictEqual(testData.listenerCExecutionCount, 0);
            });
        });
    });
}

export {eventEmitterTest};
