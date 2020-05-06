/** @flow */

import {Sophistication} from '../../classes/sophistication.js';

type CustomStyles = {
    borderColor?: string,
    borderWidth?: string | number,
    color?: string,
    backgroundColor?: string,
    opacity?: string | number,
    borderRadius?: string | number
};

// TODO: MOVE/ADJUST NON COLOR PROPERTIES PROPERTIES TO CustomStyles
type CustomColors = {
    focusColor?: string,
    validColor?: string,
    invalidColor?: string,
    warningColor?: string,
    highlightColor?: string,
    placeholderColor?: string,
    borders?: 'bottom' | 'all' | 'none'
};

type Styles = {
    input: Function
};

type Params = {
    customStyles?: CustomStyles,
    customColors?: CustomColors,
    status?: 'valid' | 'invalid' | 'highlight' | 'warning' | null
};

const sophistication = new Sophistication<Styles, Params>({
    /**
     * @description Input JSS styles.
     * @param {*} params - Component props.
     * @returns {Object<string,*>} Style.
     */
    input(params: Params = {}) {
        let {
            borders = 'all',
            validColor = '#94ff36',
            invalidColor = '#e83b35',
            warningColor = '#e8e639',
            highlightColor = '#232323',
            focusColor = '#e88b0e',
            placeholderColor = '#232323'
        } = params.customColors || {};

        let {
            borderWidth = 1,
            color = '#232323',
            borderColor = '#232323',
            borderRadius = 5,
            backgroundColor = 'transparent',
            opacity = 1
        } = params.customStyles || {};

        switch (params.status) {
            case 'valid':
                borderColor = [[validColor], '!important'];
                break;
            case 'invalid':
                borderColor = [[invalidColor], '!important'];
                break;
            case 'warning':
                color = warningColor;
                borderColor = warningColor;
                break;
            case 'highlight':
                color = highlightColor;
                borderColor = highlightColor;
                break;
            default:
                break;
        }

        return {
            opacity,
            color,
            backgroundColor,
            borderColor,
            borderRadius: borders === 'all' ? borderRadius : undefined,
            border: borders === 'all' ? [borderWidth, 'solid'] : undefined,
            borderBottom:
                borders === 'bottom' ? [borderWidth, 'solid'] : undefined,
            '&:focus': {
                borderColor: focusColor
            },
            '&::placeholder': {
                color: placeholderColor
            }
        };
    }
});

export {sophistication};
export type {CustomColors, CustomStyles};
