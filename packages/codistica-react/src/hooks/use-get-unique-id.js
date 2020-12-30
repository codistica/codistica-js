/** @flow */

import {log} from '@codistica/core';
import {useEffect, useRef} from 'react';
import {uniqueID} from '../modules/unique-id.js';
import {useSingleton} from './use-singleton.js';

function useGetUniqueID() {
    const globalIdRef = useRef('');
    const localMapRef = useRef(new Map());
    const localCounterRef = useRef(0);

    // CREATE GLOBAL
    useSingleton(() => {
        globalIdRef.current = uniqueID.getID();
    });

    // CLEANUP GLOBAL
    useEffect(() => {
        return () => {
            localMapRef.current = new Map();
            localCounterRef.current = 0;
            uniqueID.releaseID(globalIdRef.current);
        };
    }, []);

    return function getUniqueID(key: any): string {
        if (!key) {
            log.error('getUniqueID()', 'NO VALID KEY PROVIDED')();
            return '';
        }
        let id = localMapRef.current.get(key);
        if (!id) {
            localCounterRef.current++;
            id = `${globalIdRef.current}-${localCounterRef.current}`;
            localMapRef.current.set(key, id);
        }
        return id;
    };
}

export {useGetUniqueID};
