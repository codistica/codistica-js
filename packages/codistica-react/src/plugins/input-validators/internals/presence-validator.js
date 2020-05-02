/** @module react/plugins/input-validators/presence-validator */

/**
 * @description Validates input if any value is present.
 * @returns {{type: 'validator', plugin: RegExp}} Validator.
 */
function presenceValidator() {
    return {
        type: 'validator',
        plugin: /.+/
    };
}

export {presenceValidator};
