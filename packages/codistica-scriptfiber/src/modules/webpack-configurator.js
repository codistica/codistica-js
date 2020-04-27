/** @module scriptfiber/modules/webpack-configurator */

import {
    ManifestWebpackPlugin,
    RecompileWebpackPlugin,
    webpackUtils
} from '@codistica/dev-tools';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import {default as CompressionWebpackPlugin} from 'compression-webpack-plugin';
import {SourceMapDevToolPlugin} from 'webpack';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import {default as WebpackBarPlugin} from 'webpackbar';
import {ScriptfiberRuntimeWebpackPlugin} from '../plugins/scriptfiber-runtime-webpack-plugin/index.js';
import {getCacheGroups} from './get-cache-groups.js';
import {getScriptfiberConfig} from './get-scriptfiber-config.js';

// TODO: CHECK ORDER IN THIS FILE.

/**
 * @description Utility function to extend Webpack configuration for Scriptfiber.
 * @param {Object<string,*>} webpackConfig - Webpack configuration object.
 * @param {string} [scriptfiberConfigPath] - Scriptfiber config file path.
 * @returns {Object<string,*>} Extended configuration object.
 */
function webpackConfigurator(webpackConfig, scriptfiberConfigPath) {
    const scriptfiberConfig = getScriptfiberConfig(scriptfiberConfigPath);
    const isDevMode = webpackConfig.mode === 'development';

    webpackUtils.replaceInEntry(
        webpackConfig,
        scriptfiberConfig.appPath,
        scriptfiberConfig.bootloaderPath
    );

    webpackConfig.devtool = false;
    webpackConfig.plugins.unshift(
        new SourceMapDevToolPlugin({
            filename: '[file].map[query]',
            moduleFilenameTemplate:
                webpackConfig.output.devtoolModuleFilenameTemplate,
            fallbackModuleFilenameTemplate:
                webpackConfig.output.devtoolFallbackModuleFilenameTemplate,
            /** @todo Create issue on https://github.com/DefinitelyTyped/DefinitelyTyped repository. */
            // @ts-ignore
            namespace: webpackConfig.output.devtoolNamespace,
            module: true,
            columns: !isDevMode,
            noSources: false,
            publicPath: '/' // APPEND ABSOLUTE PATHS TO GET CORRECT SOURCE MAPS URLs WHILE USING BLOB URLs IN FILES
        })
    );

    webpackConfig.optimization.runtimeChunk = false;
    webpackConfig.optimization.moduleIds = 'natural';
    webpackConfig.optimization.chunkIds = 'natural';
    webpackConfig.optimization.minimize = false; // TODO: TEMP. REMOVE

    webpackConfig.optimization.splitChunks = {
        chunks: 'all',
        minSize: 0,
        maxSize: Infinity,
        minChunks: 1,
        maxAsyncRequests: Infinity, // WILL BE HANDLED BY LOADER
        maxInitialRequests: Infinity, // WILL BE HANDLED BY LOADER
        /**
         * @description Chunk naming function.
         * @param {Object<string,*>} module - Module.
         * @param {Array<Object<string,*>>} chunks - Chunks.
         * @param {string} cacheGroupKey - Matched cache group key.
         * @returns {string} Chunk name.
         */
        name(module, chunks, cacheGroupKey) {
            return cacheGroupKey;
        },
        cacheGroups: getCacheGroups(
            scriptfiberConfig.bootloaderPath,
            scriptfiberConfig.appPath
        )
    };

    webpackUtils.addPlugin(
        webpackConfig,
        new ScriptfiberRuntimeWebpackPlugin()
    );

    webpackUtils.addPlugin(
        webpackConfig,
        new ManifestWebpackPlugin({
            webpackConfig: webpackConfig,
            targetFiles: [scriptfiberConfig.bootloaderConfigPath]
        })
    );

    webpackUtils.addPlugin(
        webpackConfig,
        new RecompileWebpackPlugin({
            timestampFiles: [scriptfiberConfig.bootloaderConfigPath],
            allowedPlugins: [ManifestWebpackPlugin, CompressionWebpackPlugin]
        })
    );

    /** @todo Follow https://github.com/webpack-contrib/compression-webpack-plugin/issues/133 issue. */
    webpackUtils.addPlugin(
        webpackConfig,
        new CompressionWebpackPlugin({
            cache: false,
            algorithm: 'gzip',
            compressionOptions: {
                level: isDevMode ? 0 : 9
            },
            minRatio: 2,
            threshold: -1
        })
    );

    // TODO: WHY IS THIS DELETING SOME NEEDED FILES IN PRODUCTION AND NOT IN DEVELOPMENT (DURING RE-COMPILE)? SEE ITS SOURCE CODE. (WHAT IS THE IMPLEMENTED LOGIC?)
    // TODO: INDEED NOTHING IS BEING REMOVED IN DEVELOPMENT. WHY?
    webpackUtils.addPlugin(
        webpackConfig,
        new CleanWebpackPlugin({
            dry: false,
            verbose: true,
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                '!**/favicon.ico',
                '!**/logo192.png',
                '!**/logo512.png',
                '!**/manifest.json',
                '!**/robots.txt'
            ] // TODO: GET FROM public FOLDER IF FOLDER EXISTS. GET PATH FROM CONFIG, USE DEFAULT. // TODO: REPLACE ** WITH PATH FROM WEBPACK CONFIG
        })
    );

    scriptfiberConfig.building.useAnalyzer &&
        webpackUtils.addPlugin(
            webpackConfig,
            new BundleAnalyzerPlugin({
                analyzerHost: 'localhost',
                analyzerPort: 3001,
                openAnalyzer: false,
                generateStatsFile: !isDevMode
            })
        );

    scriptfiberConfig.building.useProgressBar &&
        webpackUtils.addPlugin(webpackConfig, new WebpackBarPlugin());

    return webpackConfig;
}

export {webpackConfigurator};
