/** @module dev-tools/scripts/run */

import {babelRegister} from '../modules/babel-register.js';

(async () => {
    await babelRegister(process.argv[3]);
})();
