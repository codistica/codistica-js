/** @module browser/modules/event-listener-object-support */

import {log} from '@codistica/core';

const eventListenerObjectSupport = {
    capture: null,
    passive: null
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
                    eventListenerObjectSupport.capture = true;
                    return undefined;
                }
            },
            passive: {
                /**
                 * @description Event listener passive object mock.
                 * @returns {undefined} Undefined.
                 */
                get() {
                    eventListenerObjectSupport.passive = true;
                    return undefined;
                }
            }
        }
    );
    window.addEventListener('test', null, eventOptions);
    window.removeEventListener('test', null, eventOptions);
} catch (err) {
    log.error('eventListenerObjectSupport', err);
    eventListenerObjectSupport.capture = false;
    eventListenerObjectSupport.passive = false;
}

export {eventListenerObjectSupport};
