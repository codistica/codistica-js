/** @module dev-tools/scripts/move-by-ext */

import {log} from '@codistica/core';
import {fileUtils, getCmdOption} from '@codistica/node';

const {moveByExt, pruneDir} = fileUtils;

(async () => {
    const options = {
        from: getCmdOption(process.argv, '--from'),
        to: getCmdOption(process.argv, '--to'),
        ext: getCmdOption(process.argv, '--ext'),
        prune: getCmdOption(process.argv, '--prune', false)
    };

    if (!options.from || !options.to || !options.ext) {
        log.error('move-by-ext', 'INVALID ARGUMENTS. ABORTING')();
        process.abort();
    }

    log.progress('move-by-ext', 'MOVING')();

    await moveByExt(options.from, options.to, options.ext);

    if (options.prune) {
        log.progress('move-by-ext', 'PRUNING')();
        await pruneDir(options.from);
    }

    log.progress('move-by-ext', 'DONE')();
})();
