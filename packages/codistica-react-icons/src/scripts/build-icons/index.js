#!/usr/bin/env node

import {resolve, join, basename} from 'path';
import {stringUtils, log, catcher} from '@codistica/core';
import {
    fileUtils,
    promisifiedFs,
    LogNodeConsoleBinder,
    parseCmdArgs
} from '@codistica/node';
import {ESLint} from 'eslint';
import {default as Mustache} from 'mustache';
import {default as prettier} from 'prettier';
import {optimize} from 'svgo';
import {svgoConfig} from './configs/svgo-config.js';

const {scan, exists, remove, copy} = fileUtils;
const {readFile, mkdir, writeFile} = promisifiedFs;

log.setConsoleBinder(new LogNodeConsoleBinder());

catcher.options.enableLogging = true;

// TODO: CHECK THAT PLUGINS WILL NOT BREAK WHAT THEY DON'T UNDERSTAND.
// TODO: TEST RETURNED PROMISES.
// TODO: CHECK PLUGINS EXECUTION ORDER.
// TODO: CHECK OUTPUT. COMPARE WITH OLD. USE GIT? CREATE ICONS BACKUP
// TODO: NORMALIZE log CASING.
// TODO: WRITE TESTS.

// TODO: REGULATE MAXIMUM PARALLEL OPERATIONS (CREATE/USE EXISTING UTILS?). INVESTIGATE.
// TODO: USE STREAMS WHERE/IF POSSIBLE/NEEDED.
// TODO: IMPORTANT. REDUCE MEMORY USAGE BY DOING FULL PROCESS AT A TIME PER INPUT FILE BATCH (BATCH SIZE CAN BE CONFIGURED).

/*
 * SVG FILES PASSED THROUGH THIS SCRIPT WILL SUFFER THE FOLLOWING TRANSFORMATIONS:
 * - SVGO OPTIMIZATIONS USING NATIVE PLUGINS.
 * - ALL STATIC IDs WILL BE REPLACED WITH A JSC CALL TO 'getUniqueID('staticID')' FUNCTION.
 * - ALL fill/stroke VALUES WILL BE REPLACED WITH A JSX ASSIGNMENT: {color || '#defaultHexColor'}
 * - IF 'defaultHexColor' MATCHES '#ffffff', IT WILL BE INTERPRETED AS A BACKGROUND COLOR: {backgroundColor || '#defaultHexColor'}
 * - ALL SHORTHAND fill/stroke VALUES WILL BE REPLACED WITH THEIR LONG REPRESENTATION.
 * - #111111 WILL BE CONVERTED TO #000000 (USE CASE: ILLUSTRATOR DOES NOT SET fill/stroke IF #000000 IS USED AS COLOR)
 * - #eeeeee WILL BE CONVERTED TO #ffffff (USE CASE: SET WHITE COLORS THAT SHOULD NOT BE INTERPRETED AS BACKGROUNDS)
 *
 * NOTES:
 * - BE CAREFUL WITH SVG FILES NAMING. FILES NAMES WILL BE USED TO NAME ICONS COMPONENTS.
 */

const args = parseCmdArgs(process.argv);

const options = {
    source: args.source || args.s,
    output: args.output || args.o
};

if (!options.source) {
    log.error('build-icons', 'No source path specified')();
    process.abort();
}

if (!options.output) {
    log.error('build-icons', 'No output path specified')();
    process.abort();
}

const paths = {
    source: resolve(options.source),
    output: resolve(options.output),
    root: resolve(__dirname, '../../../'),
    utils: resolve(__dirname, '../../utils'),
    iconTemplate: resolve(__dirname, './templates/icon.mustache'),
    indexTemplate: resolve(__dirname, './templates/index.mustache'),
    storyTemplate: resolve(__dirname, './templates/story.mustache')
};

(async () => {
    // LOAD MUSTACHE TEMPLATES
    log.progress('build-icons', 'Loading templates')();
    const templates = {
        icon: await readFile(paths.iconTemplate),
        index: await readFile(paths.indexTemplate),
        story: await readFile(paths.storyTemplate)
    };

    // GET SOURCE SVG PATHS
    log.progress('build-icons', 'Searching SVG files')();
    const sourceFilenames = (await scan(paths.source)).filter((basename) =>
        basename.endsWith('.svg')
    );

    // PREPARE ICONS DATA OBJECTS
    log.progress('build-icons', 'Optimizing')();
    const iconsDataObjects = (
        await Promise.all(
            sourceFilenames.map(async (filename) => {
                const rawName = basename(filename).replace(/\.svg$/, '');
                const name = stringUtils.toKebabCase(rawName);
                const componentName = stringUtils.toPascalCase(rawName);

                const svgoResult = optimize(await readFile(filename), {
                    ...svgoConfig,
                    path: filename
                });

                return {
                    name,
                    basename: name + '.js',
                    componentName,
                    title: componentName + 'Icon',
                    svgo: svgoResult,
                    /** @todo FOLLOW https://github.com/svg/svgo/issues/1306 */
                    hasDynamicIDs: svgoResult.data.includes('getUniqueID('),
                    hasBackgroundColor:
                        svgoResult.data.includes('backgroundColor ||')
                };
            })
        )
    ).sort((a, b) => {
        const nameA = a.componentName.toLowerCase();
        const nameB = b.componentName.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    // CREATE OUTPUT DIRECTORIES
    log.progress('build-icons', 'Creating output directories')();
    if (await exists(paths.output)) {
        await remove(paths.output);
    }
    await mkdir(join(paths.output, 'src/icons'), {recursive: true});
    await mkdir(join(paths.output, 'stories/icons'), {
        recursive: true
    });

    // COPY utils
    await copy(paths.utils, join(paths.output, 'src'));

    // SETUP MUSTACHE
    Mustache.escape = function escape(a) {
        return a;
    };

    // SETUP ESLINT
    const eslint = new ESLint({
        fix: true,
        overrideConfig: {
            rules: {
                'import/no-unresolved': 'off'
            }
        }
    });

    const createFile = async (template, data, relativePath) => {
        const virtualPath = resolve(paths.root, relativePath); // THIS IS THE PATH THAT THE OUTPUT WOULD HAVE IN root
        const outputPath = join(paths.output, relativePath);

        const mustacheOutput = Mustache.render(template, data);

        const [eslintOutput] = await eslint.lintText(mustacheOutput, {
            // WILL BE USED BY ESLINT TO RESOLVE CONFIGURATION
            filePath: virtualPath
        });

        const prettierOutput = prettier.format(
            eslintOutput.output || eslintOutput.source || mustacheOutput,
            {
                ...((await prettier.resolveConfig(virtualPath)) || {}),
                /** @todo REMOVE WHEN INCLUDED IN NEW @codistica/prettier-config-default RELEASE */
                parser: 'babel'
            }
        );

        await writeFile(outputPath, prettierOutput);
    };

    log.progress('build-icons', 'Creating files')();

    // CREATE ICONS
    await Promise.all(
        iconsDataObjects.map(async (data) => {
            await createFile(
                templates.icon,
                data,
                join('src/icons', data.basename)
            );
        })
    );

    // CREATE INDEX
    await createFile(
        templates.index,
        {
            icons: iconsDataObjects
        },
        'src/index.js'
    );

    // CREATE STORY
    await createFile(
        templates.story,
        {
            icons: iconsDataObjects
        },
        'stories/icons/icons.stories.js'
    );

    log.progress('build-icons', 'Done')();
})();
