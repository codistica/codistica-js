/** @module browser/modules/element-utils/add-overscroll-blocker */

import {OverscrollBlocker} from '../../../classes/overscroll-blocker.js';
import {eventListenerObjectSupport} from '../../event-listener-object-support.js';

const eventOptions = eventListenerObjectSupport.passive
    ? {passive: false}
    : undefined;

/**
 * @typedef addOverscrollBlockerOptionsType
 * @property {boolean} [blockX=true] - Block overscroll on X axis.
 * @property {boolean} [blockY=true] - Block overscroll on Y axis.
 * @property {boolean} [contentAware=false] - Traverse DOM searching for other scrollable elements to take into consideration.
 */

/**
 * @description Smartly blocks overscroll on passed element without disrupting scrolling.
 * @param {HTMLElement} elem - Element.
 * @param {addOverscrollBlockerOptionsType} [options] - Options.
 * @returns {{overscrollBlocker: OverscrollBlocker, detach: Function}} Instance and cleanup function object.
 */
function addOverscrollBlocker(elem, options) {
    const overscrollBlocker = new OverscrollBlocker(options);

    elem.addEventListener(
        'touchstart',
        overscrollBlocker.handler,
        eventOptions
    );
    elem.addEventListener('touchmove', overscrollBlocker.handler, eventOptions);
    elem.addEventListener('touchend', overscrollBlocker.handler, eventOptions);
    elem.addEventListener('wheel', overscrollBlocker.handler, eventOptions);

    return {
        overscrollBlocker,
        detach() {
            elem.removeEventListener('touchstart', overscrollBlocker.handler);
            elem.removeEventListener('touchmove', overscrollBlocker.handler);
            elem.removeEventListener('touchend', overscrollBlocker.handler);
            elem.removeEventListener('wheel', overscrollBlocker.handler);
        }
    };
}

export {addOverscrollBlocker};
