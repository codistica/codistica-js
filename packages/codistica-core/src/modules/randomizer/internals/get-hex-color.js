/** @module core/modules/randomizer/get-hex-color */

/**
 * @description Generates and return a random HEX color code.
 * @returns {string} Generated HEX color code.
 */
function getHEXColor() {
    const SEED = '0123456789abcdef';
    let output = '#';
    while (output.length < 7) {
        output += SEED[Math.floor(Math.random() * SEED.length)];
    }
    return output;
}

export {getHEXColor};
