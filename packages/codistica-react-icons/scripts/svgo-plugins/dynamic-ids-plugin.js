import {parseAttr} from './utils/parse-attr.js';

const dynamicIDsPlugin = {
    dynamicIDsPlugin: {
        type: 'perItem',
        description:
            'Replaces static IDs with specified function call using JSX syntax.',
        params: {
            fnName: 'getUniqueID'
        },
        fn: function fn(item, params) {
            item.eachAttr((attr) => {
                const {name, value, changeValue} = parseAttr(item, attr);

                if (name === 'id') {
                    changeValue(`${params.fnName}(${value})`);
                } else if (name === 'href' && value.match(/^'?#/)) {
                    const id = value.replace('#', '');
                    changeValue('`#${' + `${params.fnName}(${id})` + '}`');
                } else {
                    const matches = value.match(/url\([^)]+\)/g);
                    const replacements = [];

                    if (matches) {
                        matches.forEach((match) => {
                            const result = match.match(
                                /url\(["']?#(?<id>[a-zA-Z][\w:.-]*)["']?\)/
                            );
                            if (result) {
                                const {id} = result.groups;
                                if (id) {
                                    replacements.push({
                                        search: match,
                                        replace:
                                            'url(#${' +
                                            `${params.fnName}('${id}')` +
                                            '})'
                                    });
                                }
                            }
                        });
                    }

                    if (replacements.length) {
                        let newValue = value.replace(
                            /(?:^['"])|(?:['"]$)/g,
                            '`'
                        );
                        replacements.forEach((replacement) => {
                            newValue = newValue.replace(
                                replacement.search,
                                replacement.replace
                            );
                        });

                        changeValue(newValue);
                    }
                }
            });
        }
    }
};

export {dynamicIDsPlugin};
