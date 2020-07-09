/** @flow */

import React from 'react';
import {Body} from '../../components/body/index.js';
import {DefaultForm} from './sections/default-form/index.js';

/**
 * @description Forms route.
 * @returns {Object<string,*>} Route.
 */
function FormsRoute() {
    return (
        <Body>
            <DefaultForm />
        </Body>
    );
}

export {FormsRoute};
