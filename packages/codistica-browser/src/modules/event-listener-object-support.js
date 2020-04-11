/** @module browser/modules/event-listener-object-support */

import {log} from '@codistica/core';

const eventListenerObjectSupport = {
    captureEvt: null,
    passiveEvt: null
};

// DETECT EVENT LISTENER OBJECT ARGUMENT SUPPORT
try {
    const eventOptions = Object.defineProperties(
        {},
        {
            capture: {
                /**
                 * @description Event listener capture object mock.
                 * @returns {undefined} Undefined.
                 */
                get() {
                    eventListenerObjectSupport.captureEvt = true;
                    return undefined;
                }
            },
            passive: {
                /**
                 * @description Event listener passive object mock.
                 * @returns {undefined} Undefined.
                 */
                get() {
                    eventListenerObjectSupport.passiveEvt = true;
                    return undefined;
                }
            }
        }
    );
    window.addEventListener('test', null, eventOptions);
    window.removeEventListener('test', null, eventOptions);
} catch (err) {
    log.error('eventListenerObjectSupport', err);
    eventListenerObjectSupport.captureEvt = false;
    eventListenerObjectSupport.passiveEvt = false;
}

export {eventListenerObjectSupport};
