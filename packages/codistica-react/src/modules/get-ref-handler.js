/** @flow */

/** @module react/modules/get-ref-handler */

import {objectUtils} from '@codistica/core';

type Ref = {
    current: any
};

type RefReceiver = Ref | ((Ref) => void);

/**
 * @typedef getRefHandlerRefType
 * @property {*} current - Ref value.
 */

/**
 * @typedef {(getRefHandlerRefType|function(getRefHandlerRefType): void)} getRefHandlerRefReceiverType
 */

/**
 * @description Utility function for components ref handling.
 * @param {getRefHandlerRefReceiverType} forwardedRef - Forwarded ref.
 * @param {getRefHandlerRefReceiverType} componentRef - Local ref.
 * @returns {function(getRefHandlerRefType): void} Ref handler.
 */
function getRefHandler(forwardedRef: RefReceiver, componentRef: RefReceiver) {
    /**
     * @description Apply ref to receiver.
     * @param {getRefHandlerRefType} ref - Ref.
     * @param {getRefHandlerRefReceiverType} refReceiver - Ref receiver.
     * @returns {void} Void.
     */
    const applyRef = function applyRef(ref: Ref, refReceiver: RefReceiver) {
        if (typeof refReceiver === 'function') {
            refReceiver(ref);
        } else if (objectUtils.isPureObject(refReceiver)) {
            refReceiver.current = ref;
        }
    };
    return (ref: Ref) => {
        applyRef(ref, forwardedRef);
        applyRef(ref, componentRef);
    };
}

export {getRefHandler};
