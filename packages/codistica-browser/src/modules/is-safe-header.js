/** @module browser/modules/is-safe-header */

/**
 * @description Checks if passed HTTP headers are accessible in the specified request.
 * @param {Object<string,*>} req - Request object.
 * @param {string|Array<string>} headers - Headers names to be checked.
 * @returns {boolean} Check Result.
 */
function isSafeHeader(req, headers) {
    let accessCtrl = (
        req.getResponseHeader('Access-Control-Expose-Headers') || ''
    )
        .split(',')
        .map((item) => item.trim());
    headers = Array.isArray(headers) ? headers : [headers];
    if (accessCtrl.length && headers.length) {
        return headers.every((header) =>
            accessCtrl.some((key) => header === key || key === '*')
        );
    } else {
        return false;
    }
}

export {isSafeHeader};
