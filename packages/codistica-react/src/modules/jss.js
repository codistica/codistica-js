/** @flow */

import {create} from 'jss';
import {default as jssPresetDefault} from 'jss-preset-default';

const defaultJss = create(jssPresetDefault());

export {defaultJss};
