import {checkAll} from './internals/check-all.js';
import {checkNone} from './internals/check-none.js';
import {checkOne} from './internals/check-one.js';
import {escape} from './internals/ecape.js';
import {normalize} from './internals/normalize.js';
import {replace} from './internals/replace.js';

// TODO: RENAME. USE ARRAY METHODS LIKE NAMES: some, every
// TODO: REMOVE checkOne AND FIX USAGES.

export {checkAll, checkNone, checkOne, escape, normalize, replace};
