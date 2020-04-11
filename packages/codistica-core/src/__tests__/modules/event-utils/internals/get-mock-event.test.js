import {assert} from 'chai';
import {getMockEvent} from '../../../../modules/event-utils/internals/get-mock-event.js';

/** @see module:codistica-core/modules/array-utils/dedupe */
function getMockEventTest() {
    describe('getMockEvent()', () => {
        it('Should return an event object.', () => {
            const mockEventArray = [
                getMockEvent(),
                getMockEvent({test: 45}),
                getMockEvent({})
            ];
            mockEventArray.forEach((mockEvent) => {
                assert.containsAllKeys(mockEvent, [
                    'bubbles',
                    'cancelBubble',
                    'cancelable',
                    'composed',
                    'currentTarget',
                    'defaultPrevented',
                    'eventPhase',
                    'isTrusted',
                    'key',
                    'returnValue',
                    'srcElement',
                    'target',
                    'timeStamp',
                    'type'
                ]);
                assert.containsAllKeys(mockEvent.currentTarget, [
                    'value',
                    'selectionStart',
                    'selectionEnd'
                ]);
                assert.containsAllKeys(mockEvent.target, [
                    'value',
                    'selectionStart',
                    'selectionEnd'
                ]);
            });
        });
    });
}

export {getMockEventTest};
