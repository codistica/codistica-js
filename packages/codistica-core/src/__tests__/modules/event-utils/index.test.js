import {getMockEventTest} from './internals/get-mock-event.test.js';

function eventUtilsTest() {
    describe('eventUtils', () => {
        getMockEventTest();
    });
}

export {eventUtilsTest};
