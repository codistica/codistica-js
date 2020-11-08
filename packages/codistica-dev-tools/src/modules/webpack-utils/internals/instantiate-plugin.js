/** @module dev-tools/modules/webpack-utils/instantiate-plugin */

/**
 * @description Instantiates given input if not already instantiated.
 * @param {*} Input - Input.
 * @returns {Object<string,*>} Input instance.
 */
function instantiatePlugin(Input) {
    if (typeof Input === 'function') {
        return new Input();
    } else {
        return Input;
    }
}

export {instantiatePlugin};
