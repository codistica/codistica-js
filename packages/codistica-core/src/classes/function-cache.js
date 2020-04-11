/** @module core/classes/function-cache */

/**
 * @classdesc Class for creating cache instances with multiple-arguments entry association support for functions memoization.
 */
class FunctionCache {
    constructor() {
        this.store = {
            map: new Map()
        };
    }

    /**
     * @description Checks if there is a cache entry matching specified arguments.
     * @param {...*} args - Arguments.
     * @returns {boolean|boolean} Check result.
     */
    has(...args) {
        let store = this.store;
        let res = undefined;
        for (let i = 0; i < args.length; i++) {
            if (!args.hasOwnProperty(i)) {
                continue;
            }
            if (i === args.length - 1) {
                return store.hasOwnProperty('value') && store.value === args[i];
            }
            res = store.map.get(args[i]);
            if (!res) {
                return false;
            }
            store = res;
        }
        return false;
    }

    /**
     * @description Sets a new cache entry for specified arguments.
     * @param {...*} args - Arguments.
     * @returns {void} Void.
     */
    set(...args) {
        let store = this.store;
        let res = undefined;
        let newStore = null;
        for (let i = 0; i < args.length; i++) {
            if (!args.hasOwnProperty(i)) {
                continue;
            }
            res = store.map.get(args[i]);
            if (i === args.length - 2) {
                if (res) {
                    res.value = args[i + 1];
                } else {
                    store.map.set(args[i], {
                        map: new Map(),
                        value: args[i + 1]
                    });
                }
                return;
            }
            if (res) {
                store = res;
            } else {
                newStore = {
                    map: new Map()
                };
                store.map.set(args[i], newStore);
                store = newStore;
            }
        }
    }

    /**
     * @description Returns the value associated to the cache entry matching specified arguments.
     * @param {...*} args - Arguments.
     * @returns {*} Found value.
     */
    get(...args) {
        let store = this.store;
        let res = undefined;
        for (let i = 0; i < args.length; i++) {
            if (!args.hasOwnProperty(i)) {
                continue;
            }
            res = store.map.get(args[i]);
            if (!res) {
                return res;
            }
            if (i === args.length - 1) {
                return res.value;
            }
            store = res;
        }
        return res;
    }

    /**
     * @description Deletes cache entry matching specified arguments.
     * @param {...*} args - Arguments.
     * @returns {void} Void.
     */
    delete(...args) {
        let store = this.store;
        let res = undefined;
        for (let i = 0; i < args.length; i++) {
            if (!args.hasOwnProperty(i)) {
                continue;
            }
            res = store.map.get(args[i]);
            if (i === args.length - 1) {
                res.value = undefined;
                return;
            }
            if (!res) {
                return;
            }
            store = res;
        }
    }

    clear() {
        this.store = {
            map: new Map()
        };
    }
}

export {FunctionCache};
