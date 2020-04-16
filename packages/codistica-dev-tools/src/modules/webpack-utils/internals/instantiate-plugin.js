/** @module dev-tools/modules/webpack-utils/instantiate-plugin */

/**
 * @description Instantiates given input if not already instantiated.
 * @param {*} input - Input.
 * @returns {Object<string,*>} Input instance.
 */
function instantiatePlugin(input) {
    if (typeof input === 'function') {
        return new input();
    } else {
        return input;
    }
}

export {instantiatePlugin};
