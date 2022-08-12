/** @module node/modules/get-cmd-option */

/**
 * @description Gets option value from argv.
 *
 * @param {Array<string>} argv - The process argv array.
 * @param {(string|Array<string>)} identifier - Option identifier.
 * @param {*} [fallback] - Option value fallback.
 *
 * @returns {*} Option value.
 */
function getCmdOption(argv, identifier, fallback) {
    const isValidFallback = arguments.length > 1;

    if (Array.isArray(identifier)) {
        const output = [];
        argv.forEach((a) => {
            if (identifier.includes(a)) {
                output.push(a.replace(/^\W+/, ''));
            }
        });
        return output;
    }

    const prefix = (identifier.match(/^\W+/) || [])[0];
    const i = argv.indexOf(identifier);
    const found = i >= 0;

    if (isValidFallback) {
        // TREAT AS VALUE
        if (found) {
            const k = i + 1;

            if (k < argv.length) {
                const value = argv[k];
                if (!prefix || !value.startsWith(prefix)) {
                    return value;
                }
            }

            return undefined;
        } else {
            return fallback;
        }
    } else {
        // TREAT AS BOOLEAN
        return found;
    }
}

export {getCmdOption};
