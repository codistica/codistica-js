/** @module core/modules/array-utils/shuffle */

/**
 * @description Randomly shuffles input array elements.
 * @param {Array<*>} input - Input array.
 * @param {number} [times=1] - Number of times to shuffle.
 * @returns {Array<*>} Shuffled array.
 */
function shuffle(input, times) {
    let index = null;
    let randomIndex = null;
    times = typeof times === 'number' ? times : 1;
    for (let i = 0; i < times; i++) {
        index = input.length;
        // WHILE THERE ARE ELEMENTS TO SHUFFLE
        while (index > 0) {
            // PICK A REMAINING ELEMENT
            randomIndex = Math.floor(Math.random() * index);
            // SWAP IT WITH THE CURRENT ELEMENT
            [input[index], input[randomIndex]] = [
                input[randomIndex],
                input[index]
            ];
            index--;
        }
    }
    return input;
}

export {shuffle};
