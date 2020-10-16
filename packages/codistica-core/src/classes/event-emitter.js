/** @module core/classes/event-emitter */

// TODO: TEMP.
let addedCount = 0;
let removedCount = 0;

/**
 * @classdesc A class for NodeJS like event support.
 */
class EventEmitter {
    /**
     * @description Constructor.
     */
    constructor() {
        /** @type {Map<string,Array<Function>>} */
        this.eventListeners = new Map();
    }

    /**
     * @instance
     * @description Emit event.
     * @param {string} eventName - Event name.
     * @param {...*} args - Args.
     * @returns {boolean} Boolean indicating if specified event had attached listeners.
     */
    emit(eventName, ...args) {
        const listeners = this.eventListeners.get(eventName);
        if (!listeners || !listeners.length) {
            return false;
        }
        // USING slice() CREATES A NEW ARRAY PREVENTING ISSUES IF ONE LISTENER MODIFIES ORIGINAL ARRAY DURING ITERATION.
        listeners.slice().forEach((listener) => {
            listener(...args);
        });
        return true;
    }

    /**
     * @instance
     * @description Add event listener to the end of the listeners array.
     * @param {string} eventName - Event name.
     * @param {Function} listener - Listener.
     * @returns {EventEmitter} EventEmitter.
     */
    on(eventName, listener) {
        const listeners = this.eventListeners.get(eventName) || [];
        addListener(listeners, listener);
        this.eventListeners.set(eventName, listeners);
        return this;
    }

    /**
     * @instance
     * @description Add event listener to the beginning of the listeners array.
     * @param {string} eventName - Event name.
     * @param {Function} listener - Listener.
     * @returns {EventEmitter} EventEmitter.
     */
    prependListener(eventName, listener) {
        const listeners = this.eventListeners.get(eventName) || [];
        addListener(listeners, listener, true);
        this.eventListeners.set(eventName, listeners);
        return this;
    }

    /**
     * @instance
     * @description Add event listener to be executed only once to the end of the listeners array.
     * @param {string} eventName - Event name.
     * @param {Function} listener - Listener.
     * @returns {EventEmitter} EventEmitter.
     */
    once(eventName, listener) {
        const that = this;
        const listeners = this.eventListeners.get(eventName) || [];
        /**
         * @description Wrapped listener.
         * @param {...*} args - Args.
         */
        const wrappedListener = function wrappedListener(...args) {
            that.off(eventName, wrappedListener);
            listener(...args);
        };
        addListener(listeners, wrappedListener);
        this.eventListeners.set(eventName, listeners);
        return this;
    }

    /**
     * @instance
     * @description Add event listener to be executed only once to the beginning of the listeners array.
     * @param {string} eventName - Event name.
     * @param {Function} listener - Listener.
     * @returns {EventEmitter} EventEmitter.
     */
    prependOnceListener(eventName, listener) {
        const that = this;
        const listeners = this.eventListeners.get(eventName) || [];
        /**
         * @description Wrapped listener.
         * @param {...*} args - Args.
         */
        const wrappedListener = function wrappedListener(...args) {
            that.off(eventName, wrappedListener);
            listener(...args);
        };
        addListener(listeners, wrappedListener, true);
        this.eventListeners.set(eventName, listeners);
        return this;
    }

    /**
     * @instance
     * @description Remove event listener.
     * @param {string} eventName - Event name.
     * @param {Function} listener - Listener.
     * @returns {EventEmitter} EventEmitter.
     */
    off(eventName, listener) {
        const listeners = this.eventListeners.get(eventName);
        removeListener(listeners, listener);
        this.eventListeners.set(eventName, listeners);
        return this;
    }
}

/**
 * @description Add listener helper.
 * @param {Array<Function>} listeners - Listeners array.
 * @param {Function} listener - Listener to be added.
 * @param {boolean} [prepend] - Prepend listener.
 * @returns {void} Void.
 */
function addListener(listeners, listener, prepend) {
    removeListener(listeners, listener);
    if (prepend) {
        listeners.unshift(listener);
    } else {
        listeners.push(listener);
    }
    addedCount++;
    console.log('Added: ' + addedCount);
}

/**
 * @description Remove listener helper.
 * @param {Array<Function>} listeners - Listeners array.
 * @param {Function} listener - Listener to be removed.
 * @returns {void} Void.
 */
function removeListener(listeners, listener) {
    for (let i = 0; i < listeners.length; i++) {
        if (listeners[i] === listener) {
            listeners.splice(i, 1);
            removedCount++;
            console.log('Removed: ' + removedCount);
            return;
        }
    }
}

export {EventEmitter};
