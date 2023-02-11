import {
    setConfig,
    checkEnv,
    enable,
    disable,
    registerMock,
    unregisterMock,
    unregisterAll,
    clearCache
} from './internals/other.js';
import {require} from './internals/require.js';

const mock = {
    setConfig,
    checkEnv,
    enable,
    disable,
    registerMock,
    unregisterMock,
    unregisterAll,
    clearCache,
    require
};

export {mock};
