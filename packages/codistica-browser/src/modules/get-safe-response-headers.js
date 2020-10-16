/** @module browser/modules/get-safe-response-headers */

/**
 * @description Parses headers that are accessible in the specified request by CORS specification.
 * @param {Object<string,*>} req - Request object.
 * @returns {Object<string,*>} Headers object.
 */
function getSafeResponseHeaders(req) {
    const output = {};
    const headersString = req.getAllResponseHeaders();

    if (!headersString) {
        return {};
    }

    headersString
        .trim()
        .split(/[\r\n]+/)
        .forEach((rawHeader) => {
            const parts = rawHeader.split(':');
            output[parts[0].trim().toLowerCase()] = parts[1].trim();
        });

    return output;
}

export {getSafeResponseHeaders};
