/** @flow */

import {useContext} from 'react';
import type {JssOptionsType} from '../contexts/jss-options-context.js';
import {JssOptionsContext} from '../contexts/jss-options-context.js';

/**
 * @description Custom hook for JSS options usage.
 * @returns {Object<string,*>} - Current theme.
 */
function useJssOptions(): [JssOptionsType, (value: JssOptionsType) => void] {
    return useContext(JssOptionsContext);
}

export {useJssOptions};
