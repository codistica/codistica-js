/**
 * @function babelConfig
 * @description Babel configuration function.
 * @param {Object<string,*>} [api] - Babel configuration API.
 * @returns {Object<string,*>} Babel configuration object.
 */
module.exports = function babelConfig(api) {
    api.cache(true);
    return {
        presets: [
            [
                '@codistica/babel-preset-default',
                {
                    reactPackages: [
                        /.+[\\/]packages[\\/]codistica-react[\\/].+\.js$/
                    ]
                }
            ]
        ]
    };
};
