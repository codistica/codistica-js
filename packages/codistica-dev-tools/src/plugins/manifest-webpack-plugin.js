/** @module dev-tools/plugins/manifest-webpack-plugin */

import {jsonWebpackLoader} from '../loaders/json-webpack-loader.js';
import {RecompileWebpackPlugin} from './recompile-webpack-plugin.js';

// TODO: ADJUST TO NOT DEPEND ON RecompileWebpackPlugin

// TODO: ACCEPT COMPRESSION EXTENSIONS AS OPTIONS? (GET FROM scriptfiber config). OR HAVE A SAVED SET OF FAMOUS COMPRESSION EXTENSIONS?
// TODO: MAKE EVERYTHING EARLY IN DEVELOPMENT MODE? USE WATCHER HOOKS?
// TODO: COLLECT ON emit (FROM compilation.assets BEFORE ONLY SIZE IS AVAILABLE) AND NOT ON assetEmitted?

/**
 * @typedef manifestWebpackPluginOptionsType
 * @property {Object<string,*>} webpackConfig - Webpack configuration object.
 * @property {Array<string>} targetFiles - Files where manifest should be loaded in.
 */

/**
 * @classdesc
 */
class ManifestWebpackPlugin {
    /**
     * @description Constructor.
     * @param {manifestWebpackPluginOptionsType} options - Plugin options.
     */
    constructor(options) {
        this.options = options;

        this.manifestData = {};
        this.manifestLocked = false;
        this.toReset = {};
        this.shouldRecompile = true;
        this.hasEmitted = false;

        // SETUP JSON WEBPACK LOADER
        this.options.webpackConfig.module.rules.unshift({
            include: this.options.targetFiles,
            use: [
                {
                    loader: jsonWebpackLoader.loaderAbsolutePath,
                    options: {
                        data: () => this.manifestData
                    }
                }
            ],
            type: 'javascript/auto'
        });
    }

    apply(compiler) {
        compiler.hooks.assetEmitted.tap(this.constructor.name, (file, buf) => {
            if (this.manifestLocked) {
                return;
            }

            const key =
                (file.startsWith('/') ? '' : '/') + file.replace(/\.gz$/, ''); // TODO: REFACTOR PATHS LATER ("/" ADDING)

            this.hasEmitted = true;

            if (
                typeof this.manifestData[key] !== 'object' ||
                this.toReset[key]
            ) {
                this.toReset[key] = false;
                this.manifestData[key] = {
                    sizes: []
                };
            }
            this.manifestData[key].sizes.push(buf.byteLength);
            this.manifestData[key].sizes.sort((a, b) => b - a);
        });

        compiler.hooks.done.tap(this.constructor.name, () => {
            this.manifestLocked = true;
        });

        RecompileWebpackPlugin.getCompilerHooks(compiler).shouldRecompile.tap(
            this.constructor.name,
            () => this.shouldRecompile
        );

        RecompileWebpackPlugin.getCompilerHooks(compiler).finish.tap(
            this.constructor.name,
            () => {
                if (!this.hasEmitted) {
                    return;
                }
                this.hasEmitted = false;
                for (const i in this.toReset) {
                    if (
                        !Object.prototype.hasOwnProperty.call(this.toReset, i)
                    ) {
                        continue;
                    }
                    this.toReset[i] = true;
                }
                this.manifestLocked = false;
            }
        );
    }
}

export {ManifestWebpackPlugin};
