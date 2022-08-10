/** @module core/modules/once */

/**
 * @description Returns a wrapped function that can only be called once.
 * @param {Function} fn - Input function.
 * @returns {Function} Wrapped function.
 */
function once(fn) {
    /**
     * @description Wrapper.
     * @param {...*} args - Arguments.
     * @returns {*} Output.
     */
    function wrapper(...args) {
        if (!fn) {
            return undefined;
        }
        const callFn = fn;
        fn = null;
        return callFn.apply(undefined, args);
    }

    Object.assign(wrapper, fn);

    return wrapper;
}

export {once};
