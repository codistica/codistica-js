import {objectUtils, log} from '@codistica/core';
import {parseAttribute} from './utils/parse-attribute.js';

const {deepMerge} = objectUtils;

const dynamicIDsPlugin = {
    name: 'dynamicIDsPlugin',
    type: 'visitor',
    active: true,
    description:
        'Replaces static IDs with specified function call using JSX syntax.',
    params: {
        fnName: null
    },
    fn(root, params) {
        if (!params.fnName) {
            log.error(
                'dynamic-ids-plugin',
                'MISSING "fnName" PARAM. ABORTING'
            )();
            return {};
        }

        return {
            element: {
                enter: (node) => {
                    const {attributes} = node;

                    for (const key in attributes) {
                        if (!Object.hasOwnProperty.call(attributes, key)) {
                            continue;
                        }

                        const {name, value, changeValue} = parseAttribute(
                            attributes,
                            key
                        );

                        if (name === 'id') {
                            const newValue = `${params.fnName}('${value}')`;

                            changeValue(newValue, ['{', '}']);
                        } else if (name === 'href' && value.startsWith('#')) {
                            const id = value.slice(1);
                            const fnCall = `${params.fnName}('${id}')`;
                            const newValue = '`#${' + fnCall + '}`';

                            changeValue(newValue, ['{', '}']);
                        } else {
                            const matches = value.match(/url\([^)]+\)/g);

                            if (matches) {
                                const replacements = [];

                                matches.forEach((match) => {
                                    const {groups} =
                                        match.match(
                                            /url\(["']?#(?<id>[a-zA-Z][\w:.-]*)["']?\)/
                                        ) || {};

                                    if (groups) {
                                        const {id} = groups;

                                        if (id) {
                                            const fnCall = `${params.fnName}('${id}')`;

                                            replacements.push({
                                                search: match,
                                                replace:
                                                    'url(#${' + fnCall + '})'
                                            });
                                        }
                                    }
                                });

                                if (replacements.length) {
                                    const result = replacements.reduce(
                                        (acc, replacement) => {
                                            return acc.replace(
                                                replacement.search,
                                                replacement.replace
                                            );
                                        },
                                        value
                                    );

                                    const newValue = '`' + result + '`';

                                    changeValue(newValue, ['{', '}']);
                                }
                            }
                        }
                    }
                }
            }
        };
    }
};

dynamicIDsPlugin.withParams = function withParams(params) {
    return Object.assign({}, this, {
        params: deepMerge(params, dynamicIDsPlugin.params)
    });
};

export {dynamicIDsPlugin};
