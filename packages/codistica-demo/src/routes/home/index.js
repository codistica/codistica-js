/** @flow */

import React from 'react';
import {Body} from '../../components/body/index.js';
import componentClassNames from './index.module.scss';

/**
 * @description Home route.
 * @returns {Object<string,*>} Home route.
 */
function HomeRoute() {
    return (
        <Body appLayout={true}>
            <div>
                <h1 className={componentClassNames.title}>
                    Welcome to Codistica&apos;s Demo Package!
                </h1>
            </div>
        </Body>
    );
}

export {HomeRoute};
