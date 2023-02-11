/** @module scriptfiber/plugins/scriptfiber-runtime-webpack-plugin */

import {log} from '@codistica/core';
import {mainTemplateRequireEnsure} from './internals/main-template-require-ensure.js';

// TODO: TWO METHODS BASED ON CONFIG (RECEIVE OPTIONS): 1. EVENT 2. INTERNALLY IMPORTING LOADER API AND MANIFEST (SAME USED IN BOOTLOADER, IF NOT, UNUSED EXPORTS WILL BE ELIMINATED) (USE mainTemplate.requireFn. GET MODULE ID FROM COMPILATION)
// TODO: USE WEBPACK OPTIONS FOR MODULE TYPE, TIMEOUT, ETC
// TODO: SETUP FALLBACK EVENT FOR WHEN LOADER IS NOT AVAILABLE (WHEN USING INTERNAL IMPORT METHOD)

// TODO: RECREATE mini-css-extract-plugin GENERATOR AND REPLACE RESPECTIVE FN INTERCEPTING TAP.
// TODO: GET mini-css-extract-plugin OPTIONS FROM PLUGIN INSTANCE. GET IT USING webpackUtils

/**
 * @typedef scriptfiberRuntimeWebpackPluginOptionsType
 * @property {Array<string>} [noEvent=false] - Use internal module system to communicate with loader instead of global events.
 */

/**
 * @classdesc
 */
class ScriptfiberRuntimeWebpackPlugin {
    /**
     * @description Constructor.
     * @param {scriptfiberRuntimeWebpackPluginOptionsType} [options] - Plugin options.
     */
    constructor(options) {
        this.options = options || {
            noEvent: false
        };
    }

    apply(compiler) {
        compiler.hooks.compilation.tap(this.constructor.name, (compilation) => {
            if (compilation.mainTemplate.hooks.jsonpScript) {
                if (compilation.mainTemplate.hooks.jsonpScript) {
                    compilation.mainTemplate.hooks.jsonpScript.intercept({
                        register: (tapInfo) => {
                            if (tapInfo.name !== 'JsonpMainTemplatePlugin') {
                                log.warning(
                                    `${this.constructor.name}()`,
                                    "AN UNKNOWN PLUGIN HAS TAPPED INTO 'compilation.mainTemplate.hooks.jsonpScript'. HOOK CALL HAS BEEN REMOVED"
                                )();
                            }
                            return tapInfo;
                        }
                    });
                }

                compilation.mainTemplate.hooks.requireEnsure.intercept({
                    register: (tapInfo) => {
                        if (tapInfo.name === 'JsonpMainTemplatePlugin load') {
                            tapInfo.fn = function fn(source, chunk, hash) {
                                // CALL jsonpScript HOOK TO THROW WARNING IF UNKNOWN TAPS ARE DETECTED
                                compilation.mainTemplate.hooks.jsonpScript.call(
                                    '',
                                    chunk,
                                    hash
                                );
                                // GENERATE NEW SCRIPT
                                return [
                                    source,
                                    mainTemplateRequireEnsure(
                                        compilation.mainTemplate
                                    )
                                ].join('\n');
                            };
                        }
                        return tapInfo;
                    }
                });
            }
        });
    }
}

export {ScriptfiberRuntimeWebpackPlugin};
