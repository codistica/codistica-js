/** @module scriptfiber/modules/get-scriptfiber-config */

import {FileUtils} from '@codistica/node';
import {Types} from '@codistica/types';

// TODO: CREATE SCRIPTFIBER CONFIG AND BOOTLOADER CONFIG JSON SCHEMAS

const getScriptfiberConfigConfigSchema = new Types({
    type: 'Object',
    def: {
        appPath: {type: 'string', def: './src/index.js'},
        bootloaderPath: {type: 'string', def: './src/bootloader.js'},
        bootloaderConfigPath: {
            type: 'string',
            def: './src/bootloader-config.json'
        },
        building: {
            type: 'Object',
            def: {
                useAnalyzer: {type: 'boolean', def: true},
                useProgressBar: {type: 'boolean', def: true}
            }
        }
    }
});

let cachedConfig = null;

/**
 * @typedef getScriptfiberConfigBuildingType
 * @property {boolean} [useAnalyzer=true] - Use embedded bundle analyzer plugin.
 * @property {boolean} [useProgressBar=true] - Use embedded progress bar plugin.
 */

/**
 * @typedef getScriptfiberConfigConfigType
 * @property {string} appPath - Your app entry point path.
 * @property {string} bootloaderPath - Bootloader file path.
 * @property {string} bootloaderConfigPath - Bootloader config file path.
 * @property {getScriptfiberConfigBuildingType} building - Building options.
 */

/**
 * @description Gets Scriptfiber config object.
 * @param {string} [configPath='./scriptfiber-config.json'] - Scriptfiber config file path.
 * @returns {getScriptfiberConfigConfigType} Scriptfiber config object.
 * @throws {TypeError} If invalid configuration.
 */
function getScriptfiberConfig(configPath) {
    let output = null;

    if (cachedConfig !== null) {
        // GET FROM CACHE
        output = cachedConfig;
    } else {
        output = FileUtils.getJSONSync(
            FileUtils.getAbsolutePath(
                typeof configPath === 'string'
                    ? configPath
                    : './scriptfiber-config.json'
            )
        );

        output = /** @type {getScriptfiberConfigConfigType} */ (getScriptfiberConfigConfigSchema.validate(
            output
        ));

        if (!getScriptfiberConfigConfigSchema.isValid()) {
            throw new TypeError('INVALID CONFIGURATION.');
        }

        output.appPath = FileUtils.getAbsolutePath(output.appPath);

        output.bootloaderPath = FileUtils.getAbsolutePath(
            output.bootloaderPath
        );

        output.bootloaderConfigPath = FileUtils.getAbsolutePath(
            output.bootloaderConfigPath
        );

        // SAVE IN CACHE
        cachedConfig = output;
    }

    return output;
}

export {getScriptfiberConfig};
