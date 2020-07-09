/** @flow */

import {Sophistication} from '../../classes/sophistication.js';
import type {StatusType} from '../../utils/input-renderer.js';

type CustomStyles = {
    root?: {[string]: any},
    input?: {[string]: any},
    label?: {[string]: any}
};

type CustomClassNames = {
    root?: string,
    input?: string,
    label?: string
};

type CustomColors = {
    validColor?: string,
    invalidColor?: string,
    warningColor?: string,
    highlightColor?: string
};

type Styles = {
    input: (...args: Array<any>) => any
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

export {sophistication};
export type {CustomStyles, CustomClassNames, CustomColors};
