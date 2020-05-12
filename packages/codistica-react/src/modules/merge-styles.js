/** @flow */

/** @module react/modules/merge-styles */

type Args = Array<typeof undefined | {[string]: any}>;

/**
 * @description Dynamically merges styles into a single object.
 * @param {...(undefined|Object<string,*>)} args - Arguments.
 * @returns {Object<string,*>} Merged styles object.
 */
function mergeStyles(...args: Args): {[string]: string | number} {
    const styles = {};
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (!arg) {
            continue;
        }
        for (const key in arg) {
            if (Object.prototype.hasOwnProperty.call(arg, key)) {
                styles[key] = arg[key];
            }
        }
    }
    return styles;
}

export {mergeStyles};
