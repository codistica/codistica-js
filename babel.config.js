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
                        /.+[\\/]packages[\\/]codistica-demo[\\/]src[\\/].+\.js$/,
                        /.+[\\/]packages[\\/]codistica-react[\\/]src[\\/].+\.js$/,
                        /.+[\\/]packages[\\/]codistica-react-icons[\\/]src[\\/].+\.js$/,
                        /.+[\\/]packages[\\/]codistica-react-mui[\\/]src[\\/].+\.js$/,
                        /.+[\\/]packages[\\/][\w-]+[\\/]stories[\\/].+\.js$/
                    ]
                }
            ]
        ]
    };
};
