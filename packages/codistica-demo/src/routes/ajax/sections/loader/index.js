/** @flow */

import {Loader} from '@codistica/browser';
import {Button} from '@codistica/react';
import React, {useState, useEffect} from 'react';
import {Section} from '../../../../components/section/index.js';
import componentClassNames from './index.module.scss';
import links from './internals/links.json';

// TODO: RENAME ROUTE TO loader
// TODO: ADD LOADING BARS AND GRAPHS
// TODO: PRINT RAW (COLLAPSED LIST) AND PROCESSED STATS

const loader = new Loader({
    maxThreads: 4
});

links.forEach((elem) => {
    loader.add({
        url: elem.url,
        total: elem.total,
        noCache: true
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
    const [rawEta, setRawEta] = useState(null);

    useEffect(() => {
        loader.on('refresh', ({progress}) => {
            setRawEta(progress.eta);
        });
    }, []);

    return (
        <Section category={category} title={title} description={description}>
            <Button title={'START'} onClick={() => loader.start()} />
            <h3>
                {typeof rawEta === 'number'
                    ? Math.round(rawEta) / 1000
                    : 'null'}
            </h3>
        </Section>
    );
}

export {LoaderDemo};
