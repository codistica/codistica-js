import {objectUtils} from '@codistica/core';

const {deepMerge} = objectUtils;

const removeSvgTagPlugin = {
    name: 'removeSvgTagPlugin',
    type: 'visitor',
    active: true,
    description: 'Removes main svg tag.',
    params: {},
    fn() {
        return {
            root: {
                exit: (node) => {
                    const svgElemIndex = node.children.findIndex((item) => {
                        return item.type === 'element' && item.name === 'svg';
                    });
                    if (svgElemIndex > -1) {
                        const svgElem = node.children[svgElemIndex];
                        node.children.splice(
                            svgElemIndex,
                            1,
                            ...svgElem.children
                        );
                    }
                }
            }
        };
    }
};

removeSvgTagPlugin.withParams = function withParams(params) {
    return Object.assign({}, this, {
        params: deepMerge(params, removeSvgTagPlugin.params)
    });
};

export {removeSvgTagPlugin};
