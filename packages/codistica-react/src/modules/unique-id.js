/** @flow */

import {numberUtils, randomizer} from '@codistica/core';

const sessionID = randomizer.getUniqueId(10) + '-';
const globalCounter = new Set();

function getID(): string {
    const num = numberUtils.firstAvailableInteger(
        Array.from(globalCounter.values())
    );
    globalCounter.add(num);
    return sessionID + num;
}

function releaseID(id: string) {
    globalCounter.delete(parseInt(id.replace(sessionID, '')));
}

const uniqueID = {
    getID,
    releaseID
};

export {uniqueID};
