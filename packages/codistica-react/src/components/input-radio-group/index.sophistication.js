/** @flow */

import {Sophistication} from '../../classes/sophistication.js';
import type {StatusType} from '../../utils/input-renderer.js';
import componentClassNames from './index.module.scss';

type CustomStyles = {
    root?: {[string]: any},
    inputRow?: {[string]: any},
    title?: {[string]: any},
    inputWrapper?: {[string]: any}
};

type CustomClassNames = {
    root?: string,
    inputRow?: string,
    title?: string,
    inputWrapper?: string
};

type CustomColors = {
    validColor?: string,
    invalidColor?: string,
    warningColor?: string,
    highlightColor?: string,
    borderColor?: string,
    backgroundColor?: string,
    fillColor?: string,
    focusColor?: string
};

type Styles = {
    input: (...args: Array<any>) => any,
    label: (...args: Array<any>) => any
};

type Params = {
    customStyles?: CustomStyles,
    customColors?: CustomColors,
    status?: StatusType
};

const sophistication = new Sophistication<Styles, Params>({
    /**
     * @description Input JSS styles.
     * @param {*} params - Component props.
     * @returns {Object<string,*>} Style.
     */
    input(params: Params = {}) {
        const {focusColor = '#e88b0e'} = params.customColors || {};
        return {
            [`&:focus + .${componentClassNames.label}::before`]: {
                borderColor: getStatusColor(params) || focusColor
            }
        };
    },
    /**
     * @description Label JSS styles.
     * @param {*} params - Component props.
     * @returns {Object<string,*>} Style.
     */
    label(params: Params = {}) {
        const {
            borderColor = 'rgba(0,0,0,0.7)',
            backgroundColor = 'rgba(0,0,0,0.1)',
            fillColor = '#666666'
        } = params.customColors || {};

        const statusColor = getStatusColor(params);

        return {
            '&::before': {
                backgroundColor,
                borderColor: statusColor || borderColor
            },
            '&::after': {
                backgroundColor:
                    params.status === 'warning' ? statusColor : fillColor
            }
        };
    }
});

/**
 * @description Returns status corresponding color.
 * @param {*} params - Component props.
 * @returns {(string|null)} Color or null.
 */
function getStatusColor(params: Params) {
    const {
        validColor = '#94ff36',
        invalidColor = '#e83b35',
        warningColor = '#e8e639',
        highlightColor = '#666666'
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

export {sophistication};
export type {CustomStyles, CustomClassNames, CustomColors};
