'use strict';

module.exports =
    /**
     * @description Babel test method for react package.
     * @param {string} filename - File absolute path (from file system).
     * @returns {boolean} Test result.
     */
    function test(filename) {
        return !!(
            filename &&
            /.+[\\/]packages[\\/]codistica-react[\\/].+\.js$/.test(filename)
        );
    };
