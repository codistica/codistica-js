/** @module core/modules/event-utils/get-mock-event */

/**
 * @description Creates a mock event object.
 * @param {Object<string,*>} [inject] - Object<string,*> with properties to be merged inside created object.
 * @returns {Object<string,*>} Event object.
 */
function getMockEvent(inject) {
    return {
        bubbles: false,
        cancelBubble: false,
        cancelable: false,
        composed: false,
        currentTarget: {
            value: '',
            selectionStart: 0,
            selectionEnd: 0
        },
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: false,
        key: '',
        returnValue: true,
        srcElement: null,
        target: {
            value: '',
            selectionStart: 0,
            selectionEnd: 0
        },
        timeStamp: 0,
        type: '',
        ...inject
    };
}

export {getMockEvent};
