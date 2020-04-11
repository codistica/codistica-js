const fs = require('fs');
const path = require('path');

const commitMsgFile = process.env.HUSKY_GIT_PARAMS;
const maxCommitLength = 72;
const validTags = [
    '[DOCS]',
    '[FIX]',
    '[MERGE]',
    '[NEW]',
    '[POLISH]',
    '[REFACTOR]',
    '[TESTS]'
];
const validPackageNames = ['[*]'];

fs.readdir(path.resolve(__dirname, '../packages'), (err, dirContent) => {
    if (err) {
        throw err;
    }

    dirContent.forEach((name) => {
        const str = '[' + name.replace('codistica-', '') + ']';
        validPackageNames.push(str);
    });

    fs.readFile(commitMsgFile, 'utf8', (err, commitMsg) => {
        if (err) {
            throw err;
        }
        fs.writeFile(commitMsgFile, validateCommitMessage(commitMsg), (err) => {
            if (err) {
                throw err;
            }
        });
    });
});

/**
 * @description Validates commit message.
 * @param {string} commitMsg - Input string.
 * @returns {string} Validated commit message or null.
 * @throws {SyntaxError} If invalid commit message.
 */
function validateCommitMessage(commitMsg) {
    if (typeof commitMsg !== 'string') {
        throw new TypeError('INVALID INPUT.');
    }

    const parsedCommitMsg = parseCommitMessage(prettifySpaces(commitMsg));

    if (
        parsedCommitMsg &&
        parsedCommitMsg.tag &&
        parsedCommitMsg.packageName &&
        parsedCommitMsg.description
    ) {
        const finalCommitMsg =
            parsedCommitMsg.tag +
            ' ' +
            parsedCommitMsg.packageName +
            ' ' +
            parsedCommitMsg.description;

        checkLength(finalCommitMsg);

        return finalCommitMsg;
    } else {
        throw new SyntaxError('INVALID COMMIT MESSAGE.');
    }
}

/**
 * @description Parses commit message.
 * @param {string} str - Input string.
 * @returns {{tag: string, packageName: string, description: string}} Parsed commit message.
 */
function parseCommitMessage(str) {
    const metadataBlocks = getMetadataBlocks(str);
    return {
        tag: validateTag(metadataBlocks[0]),
        packageName: validatePackageName(metadataBlocks[1]),
        description: getDescription(str)
    };
}

/**
 * @description Remove unnecessary spaces.
 * @param {string} str - Input string.
 * @returns {string} Processed string.
 */
function prettifySpaces(str) {
    return str.replace(/\s+/g, ' ').replace(/(?:^\s)|(?:\s$)|/g, '');
}

/**
 * @description Get commit message description section.
 * @param {string} str - Input string.
 * @returns {string} Found description section.
 * @throws {SyntaxError} If invalid description.
 */
function getDescription(str) {
    let description = (str.match(/-\s.+$/) || [])[0] || null;
    if (!description) {
        throw new SyntaxError('INVALID OR NO DESCRIPTION FOUND.');
    }
    if (!/^-\s[A-Z]/.test(description) || !description.endsWith('.')) {
        throw new SyntaxError(
            'DESCRIPTION MUST BE START WITH AN UPPERCASE LETTER AND END WITH A PERIOD.'
        );
    }
    return description;
}

/**
 * @description Get commit message metadata blocks.
 * @param {string} str - Input string.
 * @returns {Array<string>} Found metadata blocks array.
 * @throws {SyntaxError} If invalid metadata tags.
 */
function getMetadataBlocks(str) {
    const metadataStr = (str.match(/.+]\s*-/g) || [])[0];
    const metadataBlocks = metadataStr && metadataStr.match(/\[[^\]]+]/g);
    if (!metadataBlocks) {
        throw new SyntaxError('INVALID METADATA.');
    } else if (metadataBlocks.length !== 2) {
        throw new SyntaxError('INVALID METADATA BLOCKS NUMBER.');
    }
    return metadataBlocks;
}

/**
 * @description Get valid tag from input string.
 * @param {string} str - Input string.
 * @returns {string} Found valid tag.
 * @throws {SyntaxError} If invalid tag.
 */
function validateTag(str) {
    const tag = str.replace(/[^A-z\][]/g, '').toUpperCase();
    if (validTags.some((currentTag) => currentTag === tag)) {
        return tag;
    } else {
        throw new SyntaxError('INVALID TAG.');
    }
}

/**
 * @description Get valid package name from input string.
 * @param {string} str - Input string.
 * @returns {string} Found valid package name.
 * @throws {SyntaxError} If invalid package name.
 */
function validatePackageName(str) {
    const tag = str.replace(/[^\-*A-z\][]/g, '').toLowerCase();
    if (validPackageNames.some((currentTag) => currentTag === tag)) {
        return tag;
    }
    throw new SyntaxError('INVALID PACKAGE NAME.');
}

/**
 * @description Checks commit length.
 * @param {string} str - Input string.
 * @returns {boolean} Check result.
 * @throws {SyntaxError} If invalid commit length.
 */
function checkLength(str) {
    if (str.length >= maxCommitLength) {
        throw new SyntaxError('COMMIT MAX LENGTH IS ' + maxCommitLength);
    }
    return true;
}
