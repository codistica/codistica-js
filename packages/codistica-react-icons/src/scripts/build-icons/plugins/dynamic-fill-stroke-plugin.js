import {objectUtils, REG_EXPS} from '@codistica/core';
import {parseAttribute} from './utils/parse-attribute.js';

const {deepMerge} = objectUtils;

const dynamicFillStrokePlugin = {
    name: 'dynamicFillStrokePlugin',
    type: 'visitor',
    active: true,
    description:
        'Replaces static fill/stroke colors with a variable assignment using JSX syntax.',
    params: {
        colors: {
            '*': 'color'
        }
    },
    fn(root, params) {
        return {
            element: {
                enter: (node) => {
                    const {attributes} = node;

                    for (const key in attributes) {
                        if (!Object.hasOwnProperty.call(attributes, key)) {
                            continue;
                        }

                        const {name, value, type, changeValue} = parseAttribute(
                            attributes,
                            key
                        );

                        if (name !== 'fill' && name !== 'stroke') {
                            continue;
                        }

                        const parseShortHEX = (input) => {
                            const shortHEX = (input.match(REG_EXPS.SHORTHEX) ||
                                [])[0];

                            if (shortHEX) {
                                return shortHEX.toLowerCase();
                            } else {
                                return null;
                            }
                        };

                        const parseLongHEX = (input) => {
                            const longHEX = (input.match(REG_EXPS.LONGHEX) ||
                                [])[0];

                            if (longHEX) {
                                return longHEX.toLowerCase();
                            } else {
                                return null;
                            }
                        };

                        const shortToLongHEX = (input) => {
                            const content = input.substring(1);
                            return `#${content}${content}`;
                        };

                        const shortHEX = parseShortHEX(value);
                        const longHEX = parseLongHEX(value);

                        const originalHEX = shortHEX || longHEX;

                        let currentHEX = shortHEX
                            ? shortToLongHEX(shortHEX)
                            : longHEX;

                        // CONVERT #111111 TO #000000
                        if (currentHEX === '#111111') {
                            currentHEX = '#000000';
                        }

                        // GET CORRESPONDING DYNAMIC VALUE
                        const keys = Object.keys(params.colors);
                        const match = keys.find(
                            (key) => key.toLowerCase() === currentHEX
                        );
                        const dynamicValue = match
                            ? params.colors[match]
                            : params.colors['*'];

                        // CONVERT #eeeeee TO #ffffff
                        if (currentHEX === '#eeeeee') {
                            currentHEX = '#ffffff';
                        }

                        const fallbackValue = (
                            type === 'JSX' ? value : `'${value}'`
                        ).replace(originalHEX || currentHEX, currentHEX);

                        const newValue = `${dynamicValue} || ${fallbackValue}`;

                        changeValue(newValue, ['{', '}']);
                    }
                }
            }
        };
    }
};

dynamicFillStrokePlugin.withParams = function withParams(params) {
    return Object.assign({}, this, {
        params: deepMerge(params, dynamicFillStrokePlugin.params)
    });
};

export {dynamicFillStrokePlugin};
