/** @flow */

import {createSophistication} from '../../hooks/create-sophistication.js';
import type {StatusType} from '../../utils/input-renderer.js';

type CustomColors = {
    validColor?: string,
    invalidColor?: string,
    warningColor?: string,
    highlightColor?: string
};

type GlobalCustomClassNames = {
    root?: string,
    input?: string,
    label?: string
};

type CustomClassNames = {
    ...GlobalCustomClassNames,
    placeholder: string,
    text: string
};

type GlobalCustomStyles = {
    root: $Shape<CSSStyleDeclaration> | null,
    input: $Shape<CSSStyleDeclaration> | null,
    label: $Shape<CSSStyleDeclaration> | null
};

type CustomStyles = {
    ...GlobalCustomStyles,
    placeholder: $Shape<CSSStyleDeclaration> | null,
    text: $Shape<CSSStyleDeclaration> | null
};

type Params = {
    customStyles?: CustomStyles,
    customColors?: CustomColors,
    status?: StatusType
};

const useSophistication = createSophistication({
    /**
     * @description Input JSS styles.
     * @param {*} params - Component props.
     * @returns {Object<string,*>} Style.
     */
    root(params: Params = {}) {
        const {
            validColor = '#94ff36',
            invalidColor = '#e83b35',
            warningColor = '#e8e639',
            highlightColor = null
        } = params.customColors || {};
        let borderColor = null;
        let color = null;

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
            color,
            borderColor
        };
    }
});

export {useSophistication};
export type {
    CustomStyles,
    CustomColors,
    CustomClassNames,
    GlobalCustomClassNames,
    GlobalCustomStyles
};
