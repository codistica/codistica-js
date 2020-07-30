/** @module browser/modules/is-safe-header */

const CORS_SAFELISTED_HEADERS = [
    'Cache-Control',
    'Content-Language',
    'Content-Length',
    'Content-Type',
    'Expires',
    'Last-Modified',
    'Pragma'
];

/**
 * @description Checks if passed HTTP header is accessible in the specified request by CORS specification.
 * @param {Object<string,*>} req - Request object.
 * @param {string} header - Header to be checked.
 * @returns {boolean} Check Result.
 */
function isSafeHeader(req, header) {
    if (CORS_SAFELISTED_HEADERS.some((elem) => elem === header)) {
        return true;
    }

    const accessControlHeader =
        req.getResponseHeader('Access-Control-Expose-Headers') || '';

    const safeHeaders = accessControlHeader
        .split(',')
        .map((item) => item.trim());

    if (safeHeaders.length) {
        return safeHeaders.some((elem) => {
            if (elem === header) {
                return true;
            } else {
                return elem === '*' && header !== 'Authorization';
            }
        });
    } else {
        return false;
    }
}

export {isSafeHeader};
