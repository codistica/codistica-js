import {log, objectUtils} from '@codistica/core';
import {parseAttribute} from './utils/parse-attribute.js';

const {deepMerge} = objectUtils;

const renameAttributePlugin = {
    name: 'renameAttributePlugin',
    type: 'visitor',
    active: true,
    description: 'Replaces attributes names according to "targets" param.',
    params: {
        targets: []
    },
    fn(root, params) {
        if (!params.targets.length) {
            log.error(
                'dynamic-ids-plugin',
                'MISSING "targets" PARAM. ABORTING'
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

                        const {name, changeName} = parseAttribute(
                            attributes,
                            key
                        );

                        const target = params.targets.find(
                            (elem) => name === elem.old
                        );

                        if (target) {
                            changeName(target.new);
                        }
                    }
                }
            }
        };
    }
};

renameAttributePlugin.withParams = function withParams(params) {
    return Object.assign({}, this, {
        params: deepMerge(params, renameAttributePlugin.params)
    });
};

export {renameAttributePlugin};
