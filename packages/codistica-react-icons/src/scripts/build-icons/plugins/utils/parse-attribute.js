import {log} from '@codistica/core';

/*
 * SEE https://github.com/svg/svgo/blob/main/plugins/addAttributesToSVGElement.js FOR AN EXAMPLE OF HOW TO ADD VALUELESS ATTRIBUTES.
 * THIS CAN BE LEVERAGED TO INJECT JSX PROPERTIES.
 */

function parseAttribute(source, key) {
    const {groups} =
        key.match(
            /^(?<name>[^=]+)=(?<open>['"{])(?<value>.+)(?<close>['"}])$/
        ) || {};

    const store = {
        key,
        name: key,
        open: "'",
        value: source[key],
        close: "'",
        ...(groups || {})
    };

    const remove = () => {
        if (store.key in source) {
            delete source[store.key];
        } else {
            log.error(
                'parse-attributes',
                `Failed to delete "${store.key}". Attribute does not exist anymore.`
            )();
        }
    };

    const wrapperType = new Map([
        ['{', 'JSX'],
        ['}', 'JSX'],
        ["'", 'SQ'],
        ['"', 'DQ']
    ]);

    const checkWrappers = (open, close) => {
        return wrapperType.get(open) === wrapperType.get(close);
    };

    const changeWrappers = (open, close) => {
        if (checkWrappers(open, close)) {
            store.open = open;
            store.close = close;
        } else {
            log.error(
                'parse-attributes',
                `Invalid wrappers: "${open}" and "${close}".`
            )();
        }
    };

    if (!checkWrappers(store.open, store.close)) {
        log.error('parse-attributes', `Error parsing "${store.key}".`)();
    }

    return {
        get name() {
            return store.name;
        },
        get value() {
            return store.value;
        },
        get type() {
            return wrapperType.get(store.open);
        },
        changeName(newName) {
            remove();

            const newKey = `${newName}=${store.open}${store.value}${store.close}`;

            source[newKey] = undefined;

            store.name = newName;
            store.key = newKey;
        },
        changeValue(newValue, newWrappers) {
            if (Array.isArray(newWrappers)) {
                changeWrappers(...newWrappers);
            }

            remove();

            const newKey = `${store.name}=${store.open}${newValue}${store.close}`;

            source[newKey] = undefined;

            store.value = newValue;
            store.key = newKey;
        },
        changeWrappers,
        remove
    };
}

export {parseAttribute};
