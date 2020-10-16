/** @flow */

import React from 'react';
import {Body} from '../../components/body/index.js';
import {LoaderDemo} from './sections/loader/index.js';

/**
 * @description Loader route.
 * @returns {Object<string,*>} Route.
 */
function LoaderRoute() {
    return (
        <Body>
            <LoaderDemo />
        </Body>
    );
}

export {LoaderRoute};
