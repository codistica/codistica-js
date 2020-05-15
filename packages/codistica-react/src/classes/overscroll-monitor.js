/** @flow */

/** @module react/classes/overscroll-monitor */

import {eventListenerObjectSupport} from '@codistica/browser';

// TODO: OPTION TO RESPECT BROWSER BEHAVIOUR AT LIMITS
// TODO: OPTION TO ALLOW BODY SCROLLING (APPLY HANDLERS TO BODY (OR documentElement?)) (safePageScroll?)
// TODO: FORCE SCROLL STOP WHEN #document TARGET? FIXING HEIGHT OR SETTING overflow: hidden. WITH OPTION IN HOC
// TODO: DO NOT PREVENT WHEN ALREADY NOT PREVENTED IN STACK
// TODO: AUTOMATICALLY ADD CSS TO ELEMENT? FOR SCROLL?
// TODO: FIX SCROLL WHEN ZOOMED. MAYBE IS A BROWSER PROBLEM

/**
 * @typedef overscrollMonitorOptionsType
 * @property {boolean} [killPropagated=false] - Kills all propagated scrolling events.
 */

/**
 * @classdesc Utility class to prevent elements overscroll and scroll events propagation.
 */
class OverscrollMonitor {
    killPropagated: boolean;
    touchPoint: number;
    multiTouch: boolean | null;
    mounted: WeakSet<Object>;
    mountedCount: number;

    /**
     * @description Constructor.
     * @param {overscrollMonitorOptionsType} [options] - Overscroll handling options.
     */
    constructor(options: {killPropagated: boolean}) {
        if (typeof options !== 'object') {
            options = {
                killPropagated: false
            };
        } else {
            if (typeof options.killPropagated !== 'boolean') {
                options.killPropagated = false;
            }
        }

        this.killPropagated = options.killPropagated;

        this.touchPoint = 0;
        this.multiTouch = null;
        this.mounted = new WeakSet();
        this.mountedCount = 0;

        // BIND METHODS
        (this: any).mount = this.mount.bind(this);
        (this: any).unmount = this.unmount.bind(this);
        (this: any).eventKiller = this.eventKiller.bind(this);
        (this: any).overscrollBlocker = this.overscrollBlocker.bind(this);
    }

    /**
     * @instance
     * @description Adds event listeners.
     * @param {Object<string,*>} key - Set key.
     * @returns {void} Void.
     */
    mount(key: {[string]: any}) {
        if (this.mounted.has(key)) {
            return;
        } else {
            if (this.mountedCount) {
                this.mounted.add(key);
                this.mountedCount++;
                return;
            }
            this.mounted.add(key);
            this.mountedCount++;
        }
        window.addEventListener(
            'touchstart',
            this.eventKiller,
            eventListenerObjectSupport.passive === true
                ? {passive: false}
                : false
        );
        window.addEventListener(
            'touchmove',
            this.eventKiller,
            eventListenerObjectSupport.passive === true
                ? {passive: false}
                : false
        );
        window.addEventListener(
            'touchend',
            this.eventKiller,
            eventListenerObjectSupport.passive === true
                ? {passive: false}
                : false
        );
        window.addEventListener(
            'wheel',
            this.eventKiller,
            eventListenerObjectSupport.passive === true
                ? {passive: false}
                : false
        );
    }

    /**
     * @instance
     * @description Removes event listeners.
     * @param {Object<string,*>} key - Set key.
     * @returns {void} Void.
     */
    unmount(key: {[string]: any}) {
        if (!this.mounted.has(key)) {
            return;
        }
        this.mounted.delete(key);
        this.mountedCount--;
        if (this.mountedCount) {
            return;
        }
        window.removeEventListener(
            'touchstart',
            this.eventKiller,
            eventListenerObjectSupport.passive === true
                ? {passive: false}
                : false
        );
        window.removeEventListener(
            'touchmove',
            this.eventKiller,
            eventListenerObjectSupport.passive === true
                ? {passive: false}
                : false
        );
        window.removeEventListener(
            'touchend',
            this.eventKiller,
            eventListenerObjectSupport.passive === true
                ? {passive: false}
                : false
        );
        window.removeEventListener(
            'wheel',
            this.eventKiller,
            eventListenerObjectSupport.passive === true
                ? {passive: false}
                : false
        );
    }

    /**
     * @instance
     * @description Calls preventDefault() on passed event if current configuration requires it.
     * @param {Object<string,*>} e - Scrolling event.
     * @returns {void} Void.
     */
    eventKiller(e: {[string]: any}) {
        // IMPORTANT. KILL PROPAGATED EVENTS
        if (this.killPropagated && e.cancelable) {
            e.preventDefault();
        }
    }

    /**
     * @instance
     * @description Scrolling events handler for overscroll detection and prevention.
     * @param {Object<string,*>} e - Scrolling event.
     * @param {boolean} [isolate] - Isolate events flag.
     * @returns {void} Void.
     */
    overscrollBlocker(e: {[string]: any}, isolate: {[string]: any}) {
        let scrolledHeight = e.currentTarget.scrollTop;
        let scrollableHeight = e.currentTarget.scrollHeight;
        let scrollViewHeight = e.currentTarget.clientHeight;
        let deltaScroll = 0;
        let canScroll = true;
        let computedStyle = {};

        // ISOLATE EVENTS FROM THE REST OF THE DOCUMENT (DO NOT ALLOW PROPAGATION TO window)
        if (isolate) {
            e.stopPropagation();
        }

        // SAVE TOUCH STARTING POSITION
        if (e.type === 'touchstart') {
            this.touchPoint = e.touches[0].screenY;
            this.multiTouch = e.touches.length > 1;
            e.preventDefault(); // PREVENT MOUSE EVENTS FROM FIRING // TODO: REMOVE?
            return;
        } else if (e.type === 'touchend') {
            this.multiTouch = e.touches.length > 1;
            e.preventDefault(); // PREVENT MOUSE EVENTS FROM FIRING // TODO: REMOVE?
            return;
        }

        // DO NOT INTERFERE WITH MULTI TOUCH GESTURES
        if (this.multiTouch === true) {
            return;
        }

        // DETECT EVENT TYPE AND GET DELTA SCROLL
        if (
            e.type === 'wheel' ||
            e.type === 'mousewheel' ||
            e.type === 'DOMMouseScroll'
        ) {
            // GET DELTA SCROLL
            // INVERT TO BE COHERENT WITH DOM SIGNS
            deltaScroll = e.deltaY * -1;
        } else if (e.type === 'touchmove') {
            // CALCULATE DELTA SCROLL
            deltaScroll = e.touches[0].screenY - this.touchPoint;
            // UPDATE TOUCH POINT
            this.touchPoint = e.touches[0].screenY;
        }

        computedStyle = window.getComputedStyle(e.currentTarget);
        if (
            computedStyle.overflowY === 'hidden' ||
            (computedStyle.overflowY === 'visible' &&
                computedStyle.overflowX === 'visible') ||
            scrollViewHeight === scrollableHeight
        ) {
            canScroll = false;
        }

        if (e.cancelable) {
            if (
                scrolledHeight <= 0 &&
                (Math.sign(deltaScroll) === 1 || deltaScroll === 0)
            ) {
                // CASE: AT TOP AND PULL DOWN
                e.preventDefault();
            } else if (
                scrolledHeight + scrollViewHeight >= scrollableHeight &&
                (Math.sign(deltaScroll) === -1 || deltaScroll === 0)
            ) {
                // CASE: AT BOTTOM AND PULL UP
                e.preventDefault();
            } else if (!canScroll) {
                // CASE: NON SCROLLABLE ELEMENT
                e.preventDefault();
            }
        }
    }
}

export {OverscrollMonitor};
