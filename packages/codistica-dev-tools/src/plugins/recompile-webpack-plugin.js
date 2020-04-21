/** @module dev-tools/plugins/recompile-webpack-plugin */

import {FileUtils} from '@codistica/node';
import {SyncHook, SyncBailHook} from 'tapable';
import {Stats} from 'webpack';
import {getPluginName} from '../modules/webpack-utils/internals/get-plugin-name.js';
import {preventTaps} from '../modules/webpack-utils/internals/prevent-taps.js';

/** @typedef {{shouldRecompile: SyncBailHook<Object<string,*>>, beforeRecompile: SyncHook<Object<string,*>>, finish: SyncHook<Stats>}} recompileWebpackPluginHooksType */

/** @type {WeakMap<Object<string,*>, recompileWebpackPluginHooksType>} */
const pluginHooks = new WeakMap();

/**
 * @typedef recompileWebpackPluginOptionsType
 * @property {Array<string>} [purgeFiles=[]] - File paths to be purged from Webpack's input filesystem.
 * @property {Array<string>} [timestampFiles=[]] - File paths whose modify timestamp must be updated.
 * @property {number} [maxRecompilations=1] - Number of re-compilations.
 * @property {boolean} [emitOnce=false] - Only emit assets on final compilation.
 * @property {Array<string>} [allowedPlugins=[]] - Plugins whitelist during re-compilations.
 */

/**
 * @classdesc
 */
class RecompileWebpackPlugin {
    /**
     * @description Constructor.
     * @param {recompileWebpackPluginOptionsType} [options] - Plugin options.
     */
    constructor(options) {
        this.options = options || {
            purgeFiles: [],
            timestampFiles: [],
            maxRecompilations: 1,
            emitOnce: false,
            allowedPlugins: []
        };

        this.options.purgeFiles = (options.purgeFiles || []).map((filePath) =>
            FileUtils.getAbsolutePath(filePath)
        );

        this.options.timestampFiles = (
            options.timestampFiles || []
        ).map((filePath) => FileUtils.getAbsolutePath(filePath));

        this.options.maxRecompilations =
            typeof options.maxRecompilations === 'number'
                ? options.maxRecompilations
                : 1;

        this.options.emitOnce =
            typeof options.emitOnce === 'boolean' ? options.emitOnce : false;

        this.options.allowedPlugins = (
            options.allowedPlugins || []
        ).map((plugin) => getPluginName(plugin));

        this.compiler = null;
        this.fileDependencies = [];
        this.contextDependencies = [];
        this.depth = 0;
        this.stats = null;
        this.startTime = null;
        this.callbacks = [];

        // BIND METHODS
        this.apply = this.apply.bind(this);
        this.onCompiled = this.onCompiled.bind(this);
        this.done = this.done.bind(this);
        this.finish = this.finish.bind(this);
        this.getStats = this.getStats.bind(this);
        this.updateStats = this.updateStats.bind(this);
    }

    /**
     * @instance
     * @description Plugin apply method.
     * @param {Object<string,*>} compiler - Webpack's Compiler instance.
     */
    apply(compiler) {
        /**
         * @description Prevent taps callback function.
         * @returns {boolean} Should tap be prevented.
         */
        const shouldPreventTaps = () => {
            return this.depth <= this.options.maxRecompilations - 1;
        };

        this.compiler = compiler;

        preventTaps(this.compiler.hooks.shouldEmit, {
            ignore: this.options.allowedPlugins.concat(this.constructor.name),
            returnValue: true,
            shouldPrevent: shouldPreventTaps
        });

        preventTaps(
            [
                this.compiler.hooks.emit,
                this.compiler.hooks.assetEmitted,
                this.compiler.hooks.afterEmit,
                this.compiler.hooks.done
            ],
            {
                ignore: this.options.allowedPlugins.concat(
                    this.constructor.name
                ),
                shouldPrevent: shouldPreventTaps
            }
        );

        this.compiler.hooks.afterCompile.tap(
            {
                name: this.constructor.name,
                stage: Infinity // EXECUTE LAST
            },
            (compilation) => {
                this.fileDependencies = Array.from(
                    compilation.fileDependencies
                );
                this.contextDependencies = Array.from(
                    compilation.contextDependencies
                );
            }
        );

        this.compiler.hooks.shouldEmit.tap(
            {
                name: this.constructor.name,
                stage: -Infinity // EXECUTE FIRST
            },
            () => {
                return (
                    !this.options.emitOnce ||
                    this.depth > this.options.maxRecompilations - 1
                );
            }
        );

        this.compiler.hooks.done.tapAsync(
            {
                name: this.constructor.name,
                stage: Infinity // EXECUTE LAST
            },
            (stats, callback) => {
                this.callbacks.unshift(callback);

                // SAVE MAIN COMPILATION STATS REFERENCE
                if (!this.stats) {
                    this.stats = stats;
                }

                if (
                    this.depth <= this.options.maxRecompilations - 1 &&
                    RecompileWebpackPlugin.getCompilerHooks(
                        this.compiler
                    ).shouldRecompile.call(this.compiler) !== false
                ) {
                    let fileTimestamps = new Map();
                    let contextTimestamps = new Map();
                    let removedFiles = new Set();

                    this.startTime = Date.now();
                    this.depth++;

                    // IGNORE FILES BY DEFAULT
                    for (const path of this.fileDependencies) {
                        fileTimestamps.set(path, 1);
                    }

                    // IGNORE DIRECTORIES BY DEFAULT
                    for (const path of this.contextDependencies) {
                        contextTimestamps.set(path, 1);
                    }

                    this.options.purgeFiles.forEach((file) => {
                        // PURGE FROM INPUT FILESYSTEM
                        if (
                            this.compiler.inputFileSystem &&
                            this.compiler.inputFileSystem.purge
                        ) {
                            this.compiler.inputFileSystem.purge(file);
                        }
                    });

                    this.options.timestampFiles.forEach((file) => {
                        // SET CHANGE TIMESTAMP
                        fileTimestamps.set(file, Date.now());
                    });

                    this.compiler.fileTimestamps = fileTimestamps;
                    this.compiler.contextTimestamps = contextTimestamps;
                    this.compiler.removedFiles = removedFiles;

                    RecompileWebpackPlugin.getCompilerHooks(
                        this.compiler
                    ).beforeRecompile.call(this.compiler);

                    // RE-COMPILE
                    this.compiler.compile(this.onCompiled);
                } else {
                    this.finish();
                }
            }
        );
    }

    /**
     * @instance
     * @description Callback for Webpack's compile method.
     * @param {Error} err - Error.
     * @param {Object<string,*>} compilation - Webpack's Compilation instance.
     */
    onCompiled(err, compilation) {
        if (err) {
            this.done(err);
            return;
        }

        if (this.compiler.hooks.shouldEmit.call(compilation) === false) {
            this.done(null, compilation);
            return;
        }

        this.compiler.emitAssets(compilation, (err) => {
            if (err) {
                this.done(err);
                return;
            }

            this.compiler.emitRecords((err) => {
                if (err) {
                    this.done(err);
                    return;
                }

                if (compilation.hooks.needAdditionalPass.call()) {
                    compilation.needAdditionalPass = true;

                    this.compiler.hooks.done.callAsync(
                        this.getStats(compilation),
                        (err) => {
                            if (err) {
                                this.done(err);
                                return;
                            }

                            this.compiler.hooks.additionalPass.callAsync(
                                (err) => {
                                    if (err) {
                                        this.done(err);
                                        return;
                                    }
                                    this.compiler.compile(this.onCompiled);
                                }
                            );
                        }
                    );

                    return;
                }

                this.done(null, compilation);
            });
        });
    }

    /**
     * @instance
     * @description Handler for Webpack's done hook.
     * @param {Error} err - Error.
     * @param {Object<string,*>} [compilation] - Webpack's Compilation instance.
     */
    done(err, compilation) {
        if (err || !compilation) {
            this.depth--;
            this.callbacks.shift()(err);
            return;
        }

        this.compiler.hooks.done.callAsync(
            this.getStats(compilation),
            (err) => {
                this.depth--;
                if (err) {
                    this.callbacks.shift()(err);
                } else {
                    this.callbacks.shift()();
                }
            }
        );
    }

    finish() {
        RecompileWebpackPlugin.getCompilerHooks(this.compiler).finish.call(
            this.stats
        );
        this.callbacks.shift()();
    }

    /**
     * @instance
     * @description Get new stats object.
     * @param {Object<string,*>} compilation - Webpack's Compilation instance.
     */
    getStats(compilation) {
        const stats = compilation
            ? new Stats(/** @type {*} */ (compilation))
            : null;
        if (stats) {
            stats.startTime = this.startTime;
            stats.endTime = Date.now();
            this.updateStats(stats);
        }
        return stats;
    }

    /**
     * @instance
     * @description Update main compilation stats reference.
     * @param {Object<string,*>} newStats - New stats object.
     */
    updateStats(newStats) {
        for (const i in newStats) {
            if (!Object.prototype.hasOwnProperty.call(newStats, i)) {
                continue;
            }
            this.stats[i] = newStats[i];
        }
    }

    /**
     * @description Static method for getting plugin hooks.
     * @param {Object<string,*>} compiler - Webpack's Compiler instance.
     * @returns {recompileWebpackPluginHooksType} Hooks.
     */
    static getCompilerHooks(compiler) {
        let hooks = pluginHooks.get(compiler);
        if (!hooks) {
            hooks = {
                shouldRecompile: new SyncBailHook(['compiler']),
                beforeRecompile: new SyncHook(['compiler']),
                finish: new SyncHook(['stats'])
            };
            pluginHooks.set(compiler, hooks);
        }
        return hooks;
    }
}

export {RecompileWebpackPlugin};
