import {getMockEventTest} from './internals/get-mock-event.test.js';

function eventUtilsTest() {
    describe('EventUtils', () => {
        getMockEventTest();
    });
}

export {eventUtilsTest};
