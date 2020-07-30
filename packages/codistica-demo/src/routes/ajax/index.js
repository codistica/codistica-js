/** @flow */

import React from 'react';
import {Body} from '../../components/body/index.js';
import {LoaderDemo} from './sections/loader/index.js';

/**
 * @description AJAX route.
 * @returns {Object<string,*>} Route.
 */
function AJAXRoute() {
    return (
        <Body>
            <LoaderDemo />
        </Body>
    );
}

export {AJAXRoute};
