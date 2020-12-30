/** @flow */

/** @module react/modules/merge-class-names */

type ClassName = typeof undefined | string | null;
type Flag = any;
type Args = Array<ClassName | [ClassName, Flag]>;

/**
 * @description Dynamically merges class names into a string.
 * @param {...(undefined|string|Array<(undefined|string),*>)} args - Arguments.
 * @returns {string} Merged class names string.
 */
function mergeClassNames(...args: Args): string {
    const output = [];
    for (let i = 0; i < args.length; i++) {
        let className = args[i];
        if (!className) {
            continue;
        }
        if (Array.isArray(className)) {
            if (className[0] && className[1]) {
                output.push(className[0]);
            }
        } else {
            output.push(className);
        }
    }
    return output.join(' ');
}

export {mergeClassNames};
