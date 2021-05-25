/** @module core/modules/create-state-promise */

// TODO: RENAME TO addState.
// TODO: CONVERT TO CLASS?

/**
 * @typedef createStatePromiseWrappedPromiseType
 * @property {function(): boolean} [isPending] - Is pending method.
 * @property {function(): boolean} [isRejected] - Is rejected method.
 * @property {function(): boolean} [isFulfilled] - Is fulfilled method.
 */

/**
 * @description Wraps input promise with useful methods.
 * @param {Promise<*>} promise - Input promise.
 * @returns {*} Wrapped promise.
 */
function createStatePromise(promise) {
    if (Object.hasOwnProperty.call(promise, 'isPending')) {
        return promise;
    }

    let isPending = true;
    let isRejected = false;
    let isFulfilled = false;

    /** @type {*} */
    const wrappedPromise = promise.then(
        (value) => {
            isFulfilled = true;
            isPending = false;
            return value;
        },
        (err) => {
            isRejected = true;
            isPending = false;
            throw err;
        }
    );

    wrappedPromise.isFulfilled = () => isFulfilled;
    wrappedPromise.isPending = () => isPending;
    wrappedPromise.isRejected = () => isRejected;

    return wrappedPromise;
}

export {createStatePromise};
