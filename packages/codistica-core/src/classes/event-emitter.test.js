import {assert} from 'chai';
import {EventEmitter} from './event-emitter.js';

/** @see module:core/classes/event-emitter */

describe('EventEmitter', () => {
    const eventEmitter = new EventEmitter();

    const data = {
        eventAReceivedParams: [],
        eventBExecutionCount: 0,
        eventCExecutionCount: 0,
        eventDExecutionCount: 0,
        eventEExecutionCount: 0
    };

    /**
     * @description Listener A.
     * @param {string} param1 - Param 1.
     * @param {string} param2 - Param 2.
     * @returns {void} Void.
     */
    const listenerA = function listenerA(param1, param2) {
        data.eventAReceivedParams = [param1, param2];
    };

    /**
     * @description Listener B.
     * @returns {void} Void.
     */
    const listenerB = function listenerB() {
        data.eventBExecutionCount++;
    };

    /**
     * @description Listener C.
     * @returns {void} Void.
     */
    const listenerC = function listenerC() {
        data.eventCExecutionCount++;
    };

    /**
     * @description Listener D.
     * @returns {void} Void.
     */
    const listenerD = function listenerD() {
        data.eventDExecutionCount++;
    };

    eventEmitter.on('eventA', listenerA);
    eventEmitter.once('eventB', listenerB);
    eventEmitter.on('eventC', listenerC);
    eventEmitter.once('eventD', listenerD);
    eventEmitter.prependOnceListener('eventE', () => {
        data.eventEExecutionCount++;
    });

    describe('emit()', () => {
        it('Should return true when listeners are found for specified event.', () => {
            assert.isTrue(eventEmitter.emit('eventA', 'param1', 'param2'));
        });

        it('Should return false when no listeners are found for specified event.', () => {
            assert.isFalse(
                eventEmitter.emit('eventWithNoListeners', 'param1', 'param2')
            );
        });
    });

    eventEmitter.off('eventC', listenerC);
    eventEmitter.off('eventD', listenerD);

    let eventBCallCount = 0;
    while (eventBCallCount < 5) {
        eventEmitter.emit('eventB');
        eventEmitter.emit('eventC');
        eventEmitter.emit('eventD');
        eventEmitter.emit('eventE');
        eventBCallCount++;
    }

    describe('once()', () => {
        it('Should have executed only once.', () => {
            assert.strictEqual(data.eventBExecutionCount, 1);
            assert.strictEqual(data.eventEExecutionCount, 1);
        });
    });

    describe('on()', () => {
        it('Should have received correct arguments.', () => {
            assert.strictEqual(data.eventAReceivedParams[0], 'param1');
            assert.strictEqual(data.eventAReceivedParams[1], 'param2');
        });
    });

    describe('off()', () => {
        it('Should have not executed.', () => {
            assert.strictEqual(data.eventCExecutionCount, 0);
            assert.strictEqual(data.eventDExecutionCount, 0);
        });
    });

    describe('Memory Performance', () => {
        it('Should remain only one event handler.', () => {
            const events = Array.from(eventEmitter.eventListeners.keys());
            const listeners = Array.from(eventEmitter.eventListeners.values());
            assert.deepEqual(events, ['eventA']);
            assert.deepEqual(listeners, [[listenerA]]);
        });
        it('Should not remain any event handler.', () => {
            eventEmitter.off('eventA', listenerA);
            const events = Array.from(eventEmitter.eventListeners.keys());
            const listeners = Array.from(eventEmitter.eventListeners.values());
            assert.isEmpty(events);
            assert.isEmpty(listeners);
        });
    });
});
