import {REG_EXPS} from '@codistica/core';
import {parseAttr} from './utils/parse-attr.js';

const dynamicFillStrokePlugin = {
    dynamicFillStrokePlugin: {
        type: 'perItem',
        description:
            'Replaces static fill/stroke colors with a variable assignment using JSX syntax.',
        params: {
            colors: {
                '*': 'color',
                '#ffffff': 'backgroundColor'
            }
        },
        fn(item, params) {
            item.eachAttr((attr) => {
                const {name, value, changeValue} = parseAttr(item, attr);

                if (name === 'fill' || name === 'stroke') {
                    // CONVERT SHORT HEX TO LONG HEX
                    const shorthex = (value.match(REG_EXPS.SHORTHEX) || [])[0];
                    let longHex = (value.match(REG_EXPS.LONGHEX) || [])[0];
                    if (shorthex) {
                        const shortHexValue = shorthex.substring(1);
                        longHex = `#${shortHexValue}${shortHexValue}`;
                    }

                    // CONVERT #111111 TO #000000
                    if (longHex === '#111111') {
                        longHex = '#000000';
                    }

                    // SET DYNAMIC VALUE
                    let colorVarName = params.colors['*'];
                    if (
                        longHex &&
                        Object.hasOwnProperty.call(
                            params.colors,
                            longHex.toLowerCase()
                        )
                    ) {
                        colorVarName = params.colors[longHex];
                    }

                    // CONVERT #eeeeee TO #ffffff
                    if (longHex === '#eeeeee') {
                        longHex = '#ffffff';
                    }

                    let defaultValue = value;
                    if (shorthex && longHex) {
                        defaultValue = defaultValue.replace(shorthex, longHex);
                    }

                    changeValue(`${colorVarName} || ${defaultValue}`);
                }
            });
        }
    }
};

export {dynamicFillStrokePlugin};
