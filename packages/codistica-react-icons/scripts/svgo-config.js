import {dynamicFillStrokePlugin} from './svgo-plugins/dynamic-fill-stroke-plugin.js';
import {dynamicIDsPlugin} from './svgo-plugins/dynamic-ids-plugin.js';
import {removeSvgTagPlugin} from './svgo-plugins/remove-svg-tag-plugin.js';
import {xlinkHrefPlugin} from './svgo-plugins/xlink-href-plugin.js';

// SEE https://github.com/svg/svgo/issues/564 FOR INFO ABOUT ADDING CUSTOM PLUGINS.

const svgoConfig = {
    floatPrecision: 2,
    plugins: [
        {cleanupAttrs: true},
        {removeDoctype: true},
        {removeXMLProcInst: true},
        {removeComments: true},
        {removeMetadata: true},
        {removeTitle: true},
        {removeDesc: true},
        {removeUselessDefs: true},
        {removeXMLNS: true},
        {removeEditorsNSData: true},
        {removeEmptyAttrs: true},
        {removeHiddenElems: true},
        {removeEmptyText: true},
        {removeEmptyContainers: true},
        {removeViewBox: true},
        {cleanupEnableBackground: true},
        {minifyStyles: true},
        {convertStyleToAttrs: true},
        {
            convertColors: {
                shorthex: false,
                shortname: false
            }
        },
        {convertPathData: true},
        {convertTransform: true},
        {removeUnknownsAndDefaults: true},
        {removeNonInheritableGroupAttrs: true},
        {
            // SEE https://github.com/svg/svgo/issues/727#issuecomment-303115276 FOR BETTER OPTIONS DESCRIPTIONS.
            removeUselessStrokeAndFill: {
                removeNone: true
            }
        },
        {removeUnusedNS: true},
        {cleanupIDs: true},
        {cleanupNumericValues: true},
        {cleanupListOfValues: true},
        {moveElemsAttrsToGroup: true},
        {moveGroupAttrsToElems: true},
        {collapseGroups: true},
        {removeRasterImages: true},
        {mergePaths: true},
        {convertShapeToPath: true},
        {sortAttrs: true},
        {removeDimensions: true},
        {removeAttrs: true},
        {removeElementsByAttr: true},
        {removeStyleElement: true},
        {removeScriptElement: true},
        removeSvgTagPlugin,
        xlinkHrefPlugin,
        dynamicIDsPlugin,
        dynamicFillStrokePlugin
    ]
};

export {svgoConfig};
