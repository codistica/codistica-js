import {readFileSync, writeFileSync, mkdirSync} from 'fs';
import {resolve, join, basename} from 'path';
import {stringUtils, log} from '@codistica/core';
import {fileUtils, LogNodeConsoleBinder} from '@codistica/node';
import {ESLint} from 'eslint';
import {default as Mustache} from 'mustache';
import {default as prettier} from 'prettier';
import {default as SVGO} from 'svgo';
import {svgoConfig} from './svgo-config.js';

log.setConsoleBinder(new LogNodeConsoleBinder());

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

if (!process.argv[2]) {
    log.error('build-icons', 'No SVG directory path specified')();
    process.abort();
}

const relativePaths = {
    svgDir: process.argv[2],
    outputDir: '../build-icons-output',
    rootDir: '../',
    iconTemplate: './templates/icon.mustache',
    indexTemplate: './templates/index.mustache',
    storyTemplate: './templates/story.mustache'
};

const absolutePaths = {};

// GET ABSOLUTE PATHS
for (const key in relativePaths) {
    if (!Object.hasOwnProperty.call(relativePaths, key)) {
        continue;
    }
    absolutePaths[key] = resolve(__dirname, relativePaths[key]);
}

(async () => {
    // LOAD MUSTACHE TEMPLATES
    log.progress('build-icons', 'Loading templates')();
    const templates = {
        icon: readFileSync(absolutePaths.iconTemplate, 'utf8'),
        index: readFileSync(absolutePaths.indexTemplate, 'utf8'),
        story: readFileSync(absolutePaths.storyTemplate, 'utf8')
    };

    // GET SOURCE SVG PATHS
    log.progress('build-icons', 'Searching SVG files')();
    const sourceFilenames = fileUtils
        .scanSync(absolutePaths.svgDir)
        .filter((basename) => /\.svg$/.test(basename));

    // PREPARE ICONS DATA OBJECTS
    log.progress('build-icons', 'Optimizing')();
    const svgo = new SVGO(svgoConfig);
    const iconsDataObjects = (
        await Promise.all(
            sourceFilenames.map(async (filename) => {
                const rawName = basename(filename).replace(/\.svg$/, '');
                const name = stringUtils.toKebabCase(rawName);
                const componentName = stringUtils.toPascalCase(rawName);
                const svgoResult = await svgo.optimize(
                    readFileSync(filename, 'utf8')
                );
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
    if (fileUtils.existsSync(absolutePaths.outputDir)) {
        fileUtils.removeSync(absolutePaths.outputDir);
    }
    mkdirSync(join(absolutePaths.outputDir, 'src/icons'), {recursive: true});
    mkdirSync(join(absolutePaths.outputDir, 'stories/icons'), {
        recursive: true
    });

    // COPY NON PROCESSED SOURCE FILES
    fileUtils.copySync(
        join(absolutePaths.rootDir, 'src/utils'),
        join(absolutePaths.outputDir, 'src')
    );

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

    // SETUP PRETTIER
    const prettierOptions =
        (await prettier.resolveConfig(
            join(absolutePaths.rootDir, 'src/index.js')
        )) || {};

    const createFile = async function createFile(template, data, relativePath) {
        const mustacheOutput = Mustache.render(template, data);

        const [eslintOutput] = await eslint.lintText(mustacheOutput, {
            // WILL BE USED BY ESLINT TO RESOLVE CONFIGURATION
            filePath: resolve(absolutePaths.rootDir, relativePath)
        });

        const prettierOutput = prettier.format(
            eslintOutput.output || eslintOutput.source || mustacheOutput,
            {
                ...prettierOptions,
                /** @todo REMOVE WHEN INCLUDED IN NEW @codistica/prettier-config-default RELEASE */
                parser: 'babel'
            }
        );

        const outputPath = join(absolutePaths.outputDir, relativePath);

        writeFileSync(outputPath, prettierOutput, 'utf8');
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
