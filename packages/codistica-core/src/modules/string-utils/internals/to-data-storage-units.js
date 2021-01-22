/** @module core/modules/string-utils/to-data-storage-units */

/**
 * @description Transforms a numerical input in bytes to a string with respective units according to passed parameters.
 * @param {(string|number)} value - Numerical value in bytes.
 * @param {number} [integers=3] - Maximum number of integers.
 * @param {number} [decimals=3] - Maximum number of decimals.
 * @returns {string} Resulting string.
 */
function toDataStorageUnits(value, integers, decimals) {
    if (typeof value !== 'number') {
        value = parseFloat(value);

        if (Number.isNaN(value)) {
            return '';
        }
    }

    if (typeof decimals !== 'number' || decimals < 0 || decimals === Infinity) {
        decimals = 3;
    }

    if (typeof integers !== 'number') {
        integers = 3;
    }

    const decPow = 10 ** decimals;
    const str = value.toLocaleString(undefined, {useGrouping: false});
    const intDiff = str.length - integers;

    let intPow = 0;
    let units = '';

    switch (true) {
        case intDiff <= 0 || Number.isNaN(intDiff):
            intPow = 1;
            units = 'B';
            break;
        case intDiff <= 3:
            intPow = 10 ** 3;
            units = 'KB';
            break;
        case intDiff <= 6:
            intPow = 10 ** 6;
            units = 'MB';
            break;
        case intDiff <= 9:
            intPow = 10 ** 9;
            units = 'GB';
            break;
        case intDiff <= 12:
            intPow = 10 ** 12;
            units = 'TB';
            break;
        case intDiff <= 15:
            intPow = 10 ** 15;
            units = 'PB';
            break;
        case intDiff <= 18:
            intPow = 10 ** 18;
            units = 'EB';
            break;
        case intDiff <= 21:
            intPow = 10 ** 21;
            units = 'ZB';
            break;
        default:
            intPow = 10 ** 24;
            units = 'YB';
            break;
    }

    return (Math.round((value / intPow) * decPow) / decPow).toString() + units;
}

export {toDataStorageUnits};
