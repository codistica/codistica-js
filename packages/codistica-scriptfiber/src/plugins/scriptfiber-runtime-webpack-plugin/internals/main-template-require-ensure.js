/** @module scriptfiber/plugins/scriptfiber-runtime-webpack-plugin/main-template-require-ensure */

import {Template} from 'webpack';

/**
 * @description Scriptfiber JSONP Chunk Loading script generator.
 * @param {Object<string,*>} mainTemplate - Main template object.
 * @returns {string} Generated script.
 */
function mainTemplateRequireEnsure(mainTemplate) {
    return Template.asString([
        '// SCRIPTFIBER JSONP CHUNK LOADING FOR JAVASCRIPT',
        '',
        'var installedChunkData = installedChunks[chunkId];',
        '',
        'if (installedChunkData !== 0) { // 0 MEANS "ALREADY INSTALLED"',
        Template.indent([
            '// A PROMISE MEANS "CURRENTLY LOADING"',
            'if (installedChunkData) {',
            Template.indent(['promises.push(installedChunkData[2]);']),
            '} else {',
            Template.indent([
                '// SETUP PROMISE IN CHUNK CACHE',
                'var promise = new Promise(function(resolve, reject) {',
                Template.indent([
                    'installedChunkData = installedChunks[chunkId] = [resolve, reject];'
                ]),
                '});',
                'promises.push(installedChunkData[2] = promise);',
                '',
                '// START CHUNK LOADING',
                '',
                '// *** NOTE: "jsonpScript" HOOK CALL HAS BEEN REMOVED ***',
                '',
                'var eventObj = {',
                Template.indent([
                    'cancelable: true,',
                    'detail: {',
                    Template.indent([
                        'src: jsonpScriptSrc(chunkId),',
                        'callback: function callback(src) {',
                        Template.indent([
                            'var script = document.createElement("script");',
                            mainTemplate.outputOptions.jsonpScriptType
                                ? Template.asString([
                                      '',
                                      `script.type = ${JSON.stringify(
                                          mainTemplate.outputOptions
                                              .jsonpScriptType
                                      )};`,
                                      ''
                                  ])
                                : '',
                            'script.charset = "utf-8";',
                            `script.timeout = ${
                                mainTemplate.outputOptions.chunkLoadTimeout /
                                1000
                            };`,
                            '',
                            `if (${mainTemplate.requireFn}.nc) {`,
                            Template.indent([
                                `script.setAttribute("nonce", ${mainTemplate.requireFn}.nc);`
                            ]),
                            '}',
                            '',
                            'script.src = src;',
                            mainTemplate.outputOptions.crossOriginLoading
                                ? Template.asString([
                                      '',
                                      'if (script.src.indexOf(window.location.origin + "/") !== 0) {',
                                      Template.indent([
                                          `script.crossOrigin = ${JSON.stringify(
                                              mainTemplate.outputOptions
                                                  .crossOriginLoading
                                          )};`
                                      ]),
                                      '}',
                                      ''
                                  ])
                                : '',
                            '// CREATE ERROR BEFORE STACK UNWOUND TO GET USEFUL STACKTRACE LATER',
                            'var error = new Error();',
                            '',
                            'var onScriptComplete = function (e) {',
                            Template.indent([
                                '// AVOID MEM LEAKS IN IE',
                                'script.onerror = script.onload = null;',
                                '',
                                'clearTimeout(timeout);',
                                '',
                                'var chunk = installedChunks[chunkId];',
                                '',
                                'if(chunk !== 0) {',
                                Template.indent([
                                    'if(chunk) {',
                                    Template.indent([
                                        'var errorType = e && (e.type === "load" ? "missing" : e.type);',
                                        'var realSrc = e && e.target && e.target.src;',
                                        'error.message = "Loading chunk " + chunkId + " failed.\\n(" + errorType + ": " + realSrc + ")";',
                                        'error.name = "ChunkLoadError";',
                                        'error.type = errorType;',
                                        'error.request = realSrc;',
                                        'chunk[1](error);'
                                    ]),
                                    '}',
                                    '',
                                    'installedChunks[chunkId] = undefined;'
                                ]),
                                '}'
                            ]),
                            '};',
                            '',
                            'var timeout = setTimeout(function(){',
                            Template.indent([
                                'onScriptComplete({ type: "timeout", target: script });'
                            ]),
                            `}, ${mainTemplate.outputOptions.chunkLoadTimeout});`,
                            '',
                            'script.onerror = script.onload = onScriptComplete;',
                            '',
                            'document.head.appendChild(script);'
                        ]),
                        '}'
                    ]),
                    '}'
                ]),
                '};',
                '',
                'var event = new CustomEvent("webpackModuleRequest", eventObj);',
                '',
                'if (window.dispatchEvent(event)) {',
                Template.indent([
                    'eventObj.detail.callback(eventObj.detail.src);'
                ]),
                '}'
            ]),
            '}'
        ]),
        '}'
    ]);
}

export {mainTemplateRequireEnsure};
