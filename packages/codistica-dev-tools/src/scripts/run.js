import {babelRegister} from '../modules/babel-register.js';

(async () => {
    await babelRegister(process.argv[3]);
})();
