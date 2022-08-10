import {dynamicFillStrokePlugin} from '../plugins/dynamic-fill-stroke-plugin.js';
import {dynamicIDsPlugin} from '../plugins/dynamic-ids-plugin.js';
import {removeSvgTagPlugin} from '../plugins/remove-svg-tag-plugin.js';
import {renameAttributePlugin} from '../plugins/rename-attribute-plugin.js';

// SEE https://github.com/svg/svgo/issues/564 FOR INFO ABOUT ADDING CUSTOM PLUGINS.

const customPlugins = [
    removeSvgTagPlugin,
    renameAttributePlugin.withParams({
        targets: [
            // REPLACE DEPRECATED 'xlink:href' ATTRIBUTE NAME WITH 'href'.
            {old: 'xlink:href', new: 'href'}
        ]
    }),
    dynamicIDsPlugin.withParams({
        fnName: 'getUniqueID'
    }),
    dynamicFillStrokePlugin.withParams({
        colors: {
            '*': 'color',
            '#ffffff': 'backgroundColor'
        }
    })
];

const svgoConfig = {
    floatPrecision: 2,
    plugins: [
        {name: 'cleanupAttrs'},
        {name: 'removeDoctype'},
        {name: 'removeXMLProcInst'},
        {name: 'removeComments'},
        {name: 'removeMetadata'},
        {name: 'removeTitle'},
        {name: 'removeDesc'},
        {name: 'removeUselessDefs'},
        {name: 'removeXMLNS'},
        {name: 'removeEditorsNSData'},
        {name: 'removeEmptyAttrs'},
        {name: 'removeHiddenElems'},
        {name: 'removeEmptyText'},
        {name: 'removeEmptyContainers'},
        {name: 'removeViewBox'},
        {name: 'cleanupEnableBackground'},
        {name: 'minifyStyles'},
        {name: 'convertStyleToAttrs'},
        {
            name: 'convertColors',
            params: {
                shorthex: false,
                shortname: false
            }
        },
        {name: 'convertPathData'},
        {name: 'convertTransform'},
        {name: 'removeUnknownsAndDefaults'},
        {name: 'removeNonInheritableGroupAttrs'},
        {
            name: 'removeUselessStrokeAndFill',
            params: {
                // SEE https://github.com/svg/svgo/issues/727#issuecomment-303115276 FOR BETTER OPTIONS DESCRIPTIONS.
                removeNone: true
            }
        },
        {name: 'removeUnusedNS'},
        {name: 'cleanupIDs'},
        {name: 'cleanupNumericValues'},
        {name: 'cleanupListOfValues'},
        {name: 'moveElemsAttrsToGroup'},
        {name: 'moveGroupAttrsToElems'},
        {name: 'collapseGroups'},
        {name: 'removeRasterImages'},
        {name: 'mergePaths'},
        {name: 'convertShapeToPath'},
        {name: 'sortAttrs'},
        {name: 'removeDimensions'},
        {name: 'removeElementsByAttr'},
        {name: 'removeStyleElement'},
        {name: 'removeScriptElement'},
        ...customPlugins
    ]
};

export {svgoConfig};
