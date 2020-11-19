import {readFileSync, readdirSync, writeFileSync, mkdirSync} from 'fs';
import {resolve, join, basename} from 'path';
import {stringUtils} from '@codistica/core';
import {fileUtils} from '@codistica/node';
import {ESLint} from 'eslint';
import {default as Mustache} from 'mustache';
import {default as prettier} from 'prettier';
import {default as SVGO} from 'svgo';
import {svgoConfig} from './svgo-config.js';

// TODO: REGULATE MAXIMUM PARALLEL OPERATIONS (CREATE/USE EXISTING UTILS?). INVESTIGATE.
// TODO: USE STREAMS WHERE/IF POSSIBLE/NEEDED.
// TODO: IMPORTANT. REDUCE MEMORY USAGE BY DOING FULL PROCESS AT A TIME PER INPUT FILE BATCH (BATCH SIZE CAN BE CONFIGURED).

// TODO: CHECK ALL LOWERCASE COMMENTS (IN MONOREPO).

// TODO: CUSTOMIZE SVGO. AND MAKE REMOVE <svg> TAGS.

// TODO: OPTIMIZE NAMES IN ILLUSTRATOR PROJECT.
// TODO: CHANGE NAME OF React ICONS. USE ReactJS.
// TODO: CHANGE NAME OF c++ ICONS. USE CPlusPlus.
// TODO: EXPORT WITH 4 DECIMALS RESOLUTION AND ROUND TO 2 WITH SVGO.

if (!process.argv[2]) {
    throw new Error('No SVG directory path specified.');
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
    const templates = {
        icon: readFileSync(absolutePaths.iconTemplate, 'utf8'),
        index: readFileSync(absolutePaths.indexTemplate, 'utf8'),
        story: readFileSync(absolutePaths.storyTemplate, 'utf8')
    };

    // GET SOURCE SVG PATHS
    // TODO: SORT.
    const sourceFilenames = readdirSync(absolutePaths.svgDir)
        .filter((basename) => /\.svg$/.test(basename))
        .map((basename) => join(absolutePaths.svgDir, basename));

    // PREPARE ICONS DATA OBJECTS
    const svgo = new SVGO(svgoConfig);
    const iconsDataObjects = await Promise.all(
        sourceFilenames.map(async (filename) => {
            const rawName = basename(filename).replace(/\.svg$/, '');
            const componentName = stringUtils.capitalizeFirst(
                stringUtils.toCamelCase(rawName)
            );
            return {
                rawName,
                basename: rawName + '.js',
                componentName,
                title: componentName + 'Icon',
                svgo: await svgo.optimize(readFileSync(filename, 'utf8'))
            };
        })
    );

    // CREATE OUTPUT DIRECTORIES
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
})();
