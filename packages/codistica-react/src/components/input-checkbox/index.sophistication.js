/** @flow */

import {Sophistication} from '../../classes/sophistication.js';
import styles from './index.module.scss';

type CustomStyles = {
    backgroundColor?: string,
    borderColor?: string,
    opacity?: string | number,
    height?: string | number,
    width?: string | number
};

type CustomColors = {
    focusColor?: string,
    validColor?: string,
    invalidColor?: string,
    warningColor?: string,
    highlightColor?: string,
    fillColor?: string
};

type Styles = {
    root: Function,
    input: Function,
    label: Function
};

type Params = {
    customStyles?: CustomStyles,
    customColors?: CustomColors,
    status?: 'valid' | 'invalid' | 'highlight' | 'warning' | null
};

const sophistication = new Sophistication<Styles, Params>({
    /**
     * @description Root JSS styles.
     * @param {*} params - Component props.
     * @returns {Object<string,*>} Style.
     */
    root(params: Params = {}) {
        const {height = 20, width = 20} = params.customStyles || {};
        return {
            height,
            width
        };
    },
    /**
     * @description Input JSS styles.
     * @param {*} params - Component props.
     * @returns {Object<string,*>} Style.
     */
    input(params: Params = {}) {
        let {focusColor = '#e88b0e'} = params.customColors || {};

        return {
            [`&:focus + .${styles.label}::before`]: {
                borderColor: focusColor
            }
        };
    },
    /**
     * @description Label JSS styles.
     * @param {*} params - Component props.
     * @returns {Object<string,*>} Style.
     */
    label(params: Params = {}) {
        let {
            validColor = '#94ff36',
            invalidColor = '#e83b35',
            warningColor = '#e8e639',
            highlightColor = '#232323',
            fillColor = '#232323'
        } = params.customColors || {};

        let {
            backgroundColor = 'rgba(0,0,0,0.1)',
            borderColor = 'rgba(0,0,0,0.7)',
            opacity = 1
        } = params.customStyles || {};

        switch (params.status) {
            case 'valid':
                borderColor = validColor;
                break;
            case 'invalid':
                borderColor = invalidColor;
                break;
            case 'warning':
                borderColor = warningColor;
                break;
            case 'highlight':
                borderColor = highlightColor;
                break;
            default:
                break;
        }

        return {
            opacity,
            '&::before': {
                backgroundColor,
                borderColor
            },
            '&::after': {
                backgroundColor:
                    params.status === 'warning' ? warningColor : fillColor
            }
        };
    }
});

export {sophistication};
export type {CustomColors, CustomStyles};
