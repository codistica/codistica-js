/** @module dev-tools/modules/webpack-utils/replace-in-entry */

import {log, ObjectUtils} from '@codistica/core';

/**
 * @description Replaces a path inside Webpack's entry configuration regardless of structure.
 * @param {Object<string,*>} webpackConfig - Webpack configuration object to make operations in.
 * @param {string} oldPath - Path to be replaced.
 * @param {string} newPath - Replacement path.
 * @returns {boolean} True if operation succeeded, false otherwise.
 */
function replaceInEntry(webpackConfig, oldPath, newPath) {
    if (
        typeof webpackConfig.entry === 'string' &&
        webpackConfig.entry === oldPath
    ) {
        webpackConfig.entry = newPath;
        return true;
    } else if (Array.isArray(webpackConfig.entry)) {
        webpackConfig.entry = webpackConfig.entry.map((entry) =>
            entry === oldPath ? newPath : entry
        );
        if (webpackConfig.entry.length === 1) {
            log.info(
                'replaceInEntry()',
                'ENTRY ARRAY LENGTH IS 1. CONVERTING TO STRING'
            )();
            webpackConfig.entry = webpackConfig.entry[0];
        }
        return true;
    } else if (ObjectUtils.isObject(webpackConfig.entry)) {
        for (const i in webpackConfig.entry) {
            if (!webpackConfig.entry.hasOwnProperty(i)) {
                continue;
            }
            if (webpackConfig.entry[i] === oldPath) {
                webpackConfig.entry[i] = newPath;
                return true;
            }
        }
    }
    log.fatal(
        'replaceInEntry()',
        'WEBPACK ENTRY REPLACEMENT FAILED. NO MATCH FOUND'
    )();
    return false;
}

export {replaceInEntry};
