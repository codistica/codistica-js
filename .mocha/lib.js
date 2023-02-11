const get = (p, m) => require(`../packages/codistica-${p}/lib/${m}`);

const src = {
    core: {
        log: 'modules/log.js'
    },
    node: {
        LogNodeConsoleBinder: 'plugins/log-node-console-binder.js',
        mock: 'modules/mock-utils/index.js'
    }
};

module.exports = Object.keys(src).reduce((acc, pkg) => {
    const mods = src[pkg];
    for (const exp in mods) {
        if (!Object.hasOwnProperty.call(mods, exp)) {
            continue;
        }
        const path = mods[exp];
        acc[exp] = get(pkg, path)[exp];
    }
    return acc;
}, {});
