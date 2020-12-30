const removeSvgTagPlugin = {
    removeSvgTagPlugin: {
        type: 'full',
        description: 'Removes main svg tag.',
        params: {},
        fn(ast) {
            const svgElemIndex = ast.content.findIndex((item) =>
                item.isElem('svg')
            );
            if (typeof svgElemIndex === 'number') {
                const svgElemContent = ast.content[svgElemIndex].content;
                ast.content.splice(svgElemIndex, 1, ...svgElemContent);
            }
            return ast;
        }
    }
};

export {removeSvgTagPlugin};
