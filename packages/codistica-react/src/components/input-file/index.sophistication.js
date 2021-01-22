/** @flow */

import type {StatusType} from '../../utils/input-renderer.js';

type CustomStyles = {
    root?: {[string]: any},
    button?: {[string]: any},
    list?: {[string]: any}
};

type CustomClassNames = {
    root?: string,
    button?: string,
    list?: string
};

type CustomColors = {
    validColor?: string,
    invalidColor?: string,
    warningColor?: string,
    highlightColor?: string,
    focusColor?: string
};

type Params = {
    customColors?: CustomColors,
    status?: StatusType
};

const styles = {
    input(params: Params = {}) {
        const {focusColor = '#e88b0e'} = params.customColors || {};
        const color = getStatusColor(params) || focusColor;
        return {
            '&:focus + label': {
                color,
                borderColor: color
            }
        };
    },
    button(params: Params = {}) {
        const statusColor = getStatusColor(params);

        return {
            color: statusColor,
            borderColor: statusColor
        };
    }
};

function getStatusColor(params: Params) {
    const {
        validColor = '#94ff36',
        invalidColor = '#e83b35',
        warningColor = '#e8e639',
        highlightColor = null
    } = params.customColors || {};

    switch (params.status) {
        case 'valid':
            return validColor;
        case 'invalid':
            return invalidColor;
        case 'warning':
            return warningColor;
        case 'highlight':
            return highlightColor;
        default:
            return null;
    }
}

export {styles};
export type {CustomStyles, CustomClassNames, CustomColors};
