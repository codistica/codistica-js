/** @module core/modules/compose-fn */

/**
 * @description Uses chaining to compose a single function from input functions.
 * @this {*}
 * @param {...Function} fns - Functions.
 * @returns {function(...*): *} Composed function.
 */
function composeFn(...fns) {
    const length = fns.length;
    return (...args) => {
        let index = 1;
        let result = length ? fns[0].apply(this, args) : args[0];
        while (index < length) {
            result = fns[index].call(this, result);
            index++;
        }
        return result;
    };
}

export {composeFn};
