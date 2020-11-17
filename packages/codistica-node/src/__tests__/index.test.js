import {log} from '@codistica/core';
import {LogNodeConsoleBinder} from '../plugins/log-node-console-binder.js';
import {fileUtilsTest} from './modules/file-utils/index.test.js';
import {mockTest} from './modules/mock/index.test.js';

log.setConsoleBinder(new LogNodeConsoleBinder());
log.options.logLvl = 2;

describe('@codistica/node', () => {
    // MODULES
    describe('Modules', () => {
        fileUtilsTest();
        mockTest();
    });
});
