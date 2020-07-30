/** @flow */

import {Loader} from '@codistica/browser';
import {Button} from '@codistica/react';
import React from 'react';
import {Section} from '../../../../components/section/index.js';
import componentClassNames from './index.module.scss';
import links from './internals/links.json';

const loader = new Loader();

links.forEach((elem) => {
    loader.add({
        url: elem.url,
        total: elem.total
    });
});

const category = 'DEMO';
const title = 'Loader Demo';
const description = 'TODO.';

/**
 * @description Loader demo section.
 * @returns {Object<string,*>} Section.
 */
function LoaderDemo() {
    return (
        <Section category={category} title={title} description={description}>
            <Button title={'START'} onClick={() => loader.start()} />
        </Section>
    );
}

export {LoaderDemo};
