/** @flow */

/** @module react/modules/merge-styles */

type Style = typeof undefined | {[string]: any};
type Flag = any;
type Args = Array<Style | [Style, Flag]>;

/**
 * @description Dynamically merges styles into a single object.
 * @param {...(undefined|Object<string,*>|Array<(undefined|Object<string,*>),*>)} args - Arguments.
 * @returns {Object<string,*>} Merged styles object.
 */
function mergeStyles(...args: Args): {[string]: any} {
    const output = {};
    for (let i = 0; i < args.length; i++) {
        let style = args[i];
        if (!style) {
            continue;
        }
        if (Array.isArray(style)) {
            if (style[0] && style[1]) {
                style = style[0];
            } else {
                continue;
            }
        }
        for (const key in style) {
            if (Object.prototype.hasOwnProperty.call(style, key)) {
                output[key] = style[key];
            }
        }
    }
    return output;
}

export {mergeStyles};
