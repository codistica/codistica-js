import {removeSvgTagPlugin} from './remove-svg-tag-plugin.js';

// SEE https://github.com/svg/svgo/issues/564 FOR ADDING CUSTOM PLUGINS.

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
        {convertColors: true},
        {convertPathData: true},
        {convertTransform: true},
        {removeUnknownsAndDefaults: true},
        {removeNonInheritableGroupAttrs: true},
        {
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
        removeSvgTagPlugin
    ]
};

export {svgoConfig};
