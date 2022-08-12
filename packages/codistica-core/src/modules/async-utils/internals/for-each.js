/** @module core/modules/async-utils/for-each */

/**
 * @async
 * @description Iterates over passed elements executing callback asynchronously with specified concurrency limit.
 * @param {Array<*>} elems - Elements to iterate.
 * @param {Function} callback - Callback.
 * @param {number} limit - Concurrency limit.
 * @returns {Promise<void>} Promise. Void.
 */
async function forEach(elems, callback, limit) {
    return new Promise((resolve) => {
        let active = 0;
        let index = 0;

        /**
         * @description Internal loop function.
         * @returns {void} Void.
         */
        const loop = () => {
            while (active < limit && index < elems.length) {
                callback(elems[index], index, elems).then(() => {
                    active--;

                    if (!active && index === elems.length) {
                        resolve();
                    } else {
                        loop();
                    }
                });

                active++;
                index++;
            }
        };

        loop();
    });
}

export {forEach};
