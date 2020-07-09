const path = require('path');

/**
 * @async
 * @description Webpack configuration function.
 * @param {Object<string,*>} config - Input Webpack configuration object.
 * @returns {Promise<Object<string,*>>} Promise. Output Webpack configuration object.
 */
module.exports = async function config({config}) {
    // TODO: USE webpackUtils. USE create-react-app CONVENTION FOR CCS MODULES (MAYBE CHANGED... FIRST IT WAS CAMEL CASE. CHANGE LIBRARY CONVENTION?). CHECK CSS MODULES AFTER CHANGING

    const includedPaths = [
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../stories'),
        /codistica-react/ // INCLUDE @codistica/react PACKAGE
    ]; // TODO: CREATE CONFIGURATOR AND IMPORT FROM @codistica/dev-tools

    const cssPlain = {
        test: /(?:(?<!\.module)\.css$)/,
        include: includedPaths,
        use: ['style-loader', 'css-loader']
    };

    const cssModules = {
        test: /(?:\.module\.css$)/,
        include: includedPaths,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 1,
                    localsConvention: 'asIs'
                }
            }
        ]
    };

    let index = -1;

    // SCSS PLAIN
    config.module.rules.push({
        test: /(?:(?<!\.module)\.scss$)/,
        include: includedPaths,
        use: ['style-loader', 'css-loader', 'sass-loader']
    });

    // SCSS MODULES
    config.module.rules.push({
        test: /(?:\.module\.scss$)/,
        include: includedPaths,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 1,
                    localsConvention: 'asIs'
                }
            },
            'sass-loader'
        ]
    });

    // TODO: USE webpackUtils TO CORRECTLY REPLACE EXISTENT LOADER IN GIVEN TEST!
    index = config.module.rules.findIndex((elem) => {
        return elem.test.toString() === /\.css$/.toString();
    });

    // CSS PLAIN
    if (index > -1) {
        config.module.rules[index] = cssPlain;
    } else {
        config.module.rules.push(cssPlain);
    }

    // CSS MODULES
    config.module.rules.push(cssModules);

    return config;
};
