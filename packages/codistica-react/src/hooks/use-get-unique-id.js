/** @flow */

import {log} from '@codistica/core';
import {useEffect, useRef} from 'react';
import {uniqueID} from '../modules/unique-id.js';
import {useSingleton} from './use-singleton.js';

function useGetUniqueID() {
    const globalId = useRef('');
    const localMap = useRef(new Map());
    const localCounter = useRef(0);

    // CREATE GLOBAL
    useSingleton(() => {
        globalId.current = uniqueID.getID();
    });

    // CLEANUP GLOBAL
    useEffect(() => {
        return () => {
            localMap.current = new Map();
            localCounter.current = 0;
            uniqueID.releaseID(globalId.current);
        };
    }, []);

    return function getUniqueID(key: any): string | null {
        if (!key) {
            log.error('getUniqueID()', 'NO VALID KEY PROVIDED')();
            return null;
        }
        let id = localMap.current.get(key);
        if (!id) {
            localCounter.current++;
            id = `${globalId.current}-${localCounter.current}`;
            localMap.current.set(key, id);
        }
        return id;
    };
}

export {useGetUniqueID};
