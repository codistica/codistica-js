'use strict';

import {configure} from '@storybook/react';

const req = require.context('../stories', true, /\.stories\.js$/); // AUTOMATICALLY IMPORT ALL FILES ENDING IN *.stories.js

/** @private */
function loadStories() {
    req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
