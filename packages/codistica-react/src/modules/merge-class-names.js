/** @flow */

/** @module react/modules/merge-class-names */

type Args = Array<
    string | typeof undefined | {[string | typeof undefined]: any}
>;

/**
 * @description Dynamically merges class names into a string.
 * @param {...(string|undefined|Object<(string|undefined),*>)} args - Arguments.
 * @returns {string} Merged class names string.
 */
function mergeClassNames(...args: Args): string {
    const classNames = [];
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (!arg) {
            continue;
        }
        if (typeof arg === 'string') {
            classNames.push(arg);
        } else {
            for (const key in arg) {
                if (
                    Object.prototype.hasOwnProperty.call(arg, key) &&
                    arg[key]
                ) {
                    classNames.push(key);
                }
            }
        }
    }
    return classNames.join(' ');
}

export {mergeClassNames};
