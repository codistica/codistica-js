const yarnRun = require('./internals/yarn-run.js');

yarnRun('prettify', (errA) => {
    if (errA) {
        throw errA;
    }
    yarnRun('test:quick', (errB) => {
        if (errB) {
            throw errB;
        }
    });
});
